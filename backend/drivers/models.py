from django.db import models

class Driver(models.Model):
    driver_id = models.CharField(max_length=20, unique=True)
    name = models.CharField(max_length=100)
    license_number = models.CharField(max_length=50, unique=True)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.driver_id} - {self.name}"


