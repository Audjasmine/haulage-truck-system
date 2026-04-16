# Haulage Truck Management System

A backend API system for managing trucks, drivers, and haulage jobs using **Django REST Framework**, **PostgreSQL**, and **Docker**.

## Project Overview

This project was developed to manage haulage operations by handling:

- truck records
- driver records
- delivery/job records
- business rules for assigning trucks and drivers

The system exposes REST API endpoints and supports authentication, pagination, logging, and unit testing.

---

## Features

### Core Features
- Truck Management CRUD
- Driver Management CRUD
- Job Management CRUD
- Django Admin Panel
- PostgreSQL database
- Docker containerization

### Business Rules Implemented
- A truck cannot be assigned if it is in transit or under maintenance
- A driver cannot be assigned to multiple active jobs
- Truck availability is automatically updated based on job status

### Additional Features
- Authentication
- Pagination
- Logging
- Unit Tests

## Frontend Integration

The system was developed with a REST API architecture, making it easy to integrate with frontend technologies such as React, Angular or internal admin dashboards. This allows the backend to serve as a scalable foundation for future full-stack expansion.

## Technologies Used

- Python 3.12
- Django
- Django REST Framework
- PostgreSQL
- Docker
- Docker Compose
- Git & GitHub

---

## Project Structure

```text
haulage-truck-system/
│
├── backend/
│   ├── core/
│   ├── trucks/
│   ├── drivers/
│   ├── jobs/
│   └── manage.py
│
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .gitignore
└── README.md

API Endpoints
Trucks
GET /api/trucks/
POST /api/trucks/
GET /api/trucks/{id}/
PUT /api/trucks/{id}/
DELETE /api/trucks/{id}/
Drivers
GET /api/drivers/
POST /api/drivers/
GET /api/drivers/{id}/
PUT /api/drivers/{id}/
DELETE /api/drivers/{id}/
Jobs
GET /api/jobs/
POST /api/jobs/
GET /api/jobs/{id}/
PUT /api/jobs/{id}/
DELETE /api/jobs/{id}/
Admin
/admin/
Authentication

The API uses Django REST Framework authentication.

Session Authentication
Basic Authentication

Write operations are protected using authenticated access.

Pagination

Pagination is enabled for list endpoints.

Example:

/api/trucks/?page=2
Logging

Application logging is configured using Django logging settings.

Log file:

backend/app.log
Unit Testing

Unit tests were added for the core modules:

trucks
drivers
jobs

Run tests with:

docker compose exec web python manage.py test
How to Run the Project
1. Clone the repository
git clone https://github.com/Audjasmine/haulage-truck-system.git
cd haulage-truck-system
2. Start containers
docker compose up --build
3. Run migrations

Open a new terminal and run:

docker compose exec web python manage.py migrate
4. Create superuser
docker compose exec web python manage.py createsuperuser
5. Access the application
API Root: http://127.0.0.1:8000/api/
Trucks: http://127.0.0.1:8000/api/trucks/
Drivers: http://127.0.0.1:8000/api/drivers/
Jobs: http://127.0.0.1:8000/api/jobs/
Admin: http://127.0.0.1:8000/admin/
Example Truck Record
{
  "truck_id": "TRUCK001",
  "registration_number": "ABC12345",
  "capacity": "20.00",
  "status": "available"
}
Example Driver Record
{
  "driver_id": "DRV001",
  "name": "John Doe",
  "license_number": "LIC12345",
  "phone_number": "0771234567"
}
Example Job Record
{
  "job_id": "JOB001",
  "pickup_location": "Harare",
  "delivery_location": "Bulawayo",
  "cargo_description": "Cement",
  "status": "pending"
}
Author

Audrey Katandika

 GitHub: https://github.com/Audjasmine


