from django.test import TestCase
from .models import Job

class JobModelTest(TestCase):
    def test_create_job(self):
        job = Job.objects.create(
            job_id="JOB100",
            pickup_location="Harare",
            delivery_location="Bulawayo",
            cargo_description="Cement",
            status="pending"
        )
        self.assertEqual(job.job_id, "JOB100")