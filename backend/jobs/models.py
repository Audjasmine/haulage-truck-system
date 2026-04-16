from django.db import models
from trucks.models import Truck
from drivers.models import Driver

class Job(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('assigned', 'Assigned'),
        ('in_transit', 'In Transit'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    job_id = models.CharField(max_length=20, unique=True)
    pickup_location = models.CharField(max_length=255)
    delivery_location = models.CharField(max_length=255)
    cargo_description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    assigned_truck = models.ForeignKey(Truck, on_delete=models.SET_NULL, null=True, blank=True)
    assigned_driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.job_id