from django.test import TestCase
from .models import Truck

class TruckModelTest(TestCase):
    def test_create_truck(self):
        truck = Truck.objects.create(
            truck_id="TRK100",
            registration_number="ABC100",
            capacity=20,
            status="available"
        )
        self.assertEqual(truck.truck_id, "TRK100")

