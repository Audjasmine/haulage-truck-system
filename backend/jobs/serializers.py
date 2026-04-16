from rest_framework import serializers
from .models import Job


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

    def validate(self, data):
        truck = data.get('assigned_truck')
        driver = data.get('assigned_driver')
        status = data.get('status')

        # If updating, keep existing values when not provided
        if self.instance:
            if truck is None:
                truck = self.instance.assigned_truck
            if driver is None:
                driver = self.instance.assigned_driver
            if status is None:
                status = self.instance.status

        # Rule 1: Truck cannot be assigned if unavailable
        if truck and status in ['assigned', 'in_transit']:
            if truck.status in ['in_transit', 'maintenance']:
                # Allow update if this job is already using the same truck
                if not self.instance or self.instance.assigned_truck != truck:
                    raise serializers.ValidationError("Truck is not available")

        # Rule 2: Driver cannot have multiple active jobs
        if driver and status in ['assigned', 'in_transit']:
            active_jobs = Job.objects.filter(
                assigned_driver=driver,
                status__in=['assigned', 'in_transit']
            )

            if self.instance:
                active_jobs = active_jobs.exclude(id=self.instance.id)

            if active_jobs.exists():
                raise serializers.ValidationError("Driver already has an active job")

        # Optional good logic:
        # If job is assigned/in_transit, truck and driver must be provided
        if status in ['assigned', 'in_transit']:
            if not truck:
                raise serializers.ValidationError("Assigned or in-transit jobs must have a truck")
            if not driver:
                raise serializers.ValidationError("Assigned or in-transit jobs must have a driver")

        return data

    def create(self, validated_data):
        job = Job.objects.create(**validated_data)
        self.update_truck_status(job)
        return job

    def update(self, instance, validated_data):
        old_truck = instance.assigned_truck

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        # If truck changed, free old truck if no active jobs remain
        if old_truck and old_truck != instance.assigned_truck:
            old_active_jobs = Job.objects.filter(
                assigned_truck=old_truck,
                status__in=['assigned', 'in_transit']
            ).exclude(id=instance.id)

            if not old_active_jobs.exists() and old_truck.status != 'maintenance':
                old_truck.status = 'available'
                old_truck.save()

        self.update_truck_status(instance)
        return instance

    def update_truck_status(self, job):
        truck = job.assigned_truck

        if not truck:
            return

        if job.status in ['assigned', 'in_transit']:
            truck.status = 'in_transit'
        elif job.status in ['completed', 'cancelled']:
            if truck.status != 'maintenance':
                truck.status = 'available'

        truck.save()