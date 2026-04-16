from django.db import models

class Truck(models.Model):
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('in_transit', 'In Transit'),
        ('maintenance', 'Maintenance'),
    ]

    truck_id = models.CharField(max_length=20, unique=True)
    registration_number = models.CharField(max_length=20, unique=True)
    capacity = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')

    def __str__(self):
        return f"{self.truck_id} - {self.registration_number}"

