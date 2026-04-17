# Haulage Truck Management System

A full-stack logistics management system for managing trucks, drivers and jobs.

## Tech Stack
- Angular
- Django REST Framework
- PostgreSQL
- Docker

## Features
- User login authentication
- Dashboard statistics
- Truck CRUD
- Driver CRUD
- Job CRUD
- Truck and driver assignment
- Status tracking
- Logout functionality

## Project Structure
- `backend/` - Django REST API
- `frontend/` - Angular frontend
- `docker-compose.yml` - Docker setup for backend and database

## How to Run

### Backend

```bash
docker compose up

 Backend runs on
 http://127.0.0.1:8000

 ###Frontend 
 cd frontend
 ng serve

 Frontend runs on :
 http://localhost:4200

 API Endpoints
	•	/api/login/
	•	/api/trucks/
	•	/api/drivers/
	•	/api/jobs/

Login Access

Create an admin account:
docker compose exec django_app python manage.py createsuperuser

Then use those credentials to log in 

Author
Audrey Katandika

GitHub: Audjasmine