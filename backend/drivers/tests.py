from django.test import TestCase
from .models import Driver

class DriverModelTest(TestCase):
    def test_create_driver(self):
        driver = Driver.objects.create(
            driver_id="DRV100",
            name="John",
            license_number="LIC123",
            phone_number="0771234567"
        )
        self.assertEqual(driver.name, "John")