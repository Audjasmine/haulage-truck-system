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

## API Endpoints
- `/api/login/`
- `/api/trucks/`
- `/api/drivers/`
- `/api/jobs/`

## Login Access

Create an admin account:

```bash
docker compose exec django_app python manage.py createsuperuser
Then use those credentials to log in 

## Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Audjasmine/haulage-truck-system.git
cd haulage-truck-system

### Start Backend 
docker compose up --build

Backend runs on
 http://127.0.0.1:8000

Create Admin User
docker compose exec django_app python manage.py createsuperuser

###Start Frontend 
cd frontend
npm install
ng serve

 
Frontend runs on :
 http://localhost:4200



Author
Audrey Katandika

GitHub: Audjasmine