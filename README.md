# Simple Learn – Trainee Management System

A web-based trainee and training-administration project built with **Angular**, **Django REST Framework**, and **MySQL**. It brings common training workflows—courses, subjects, batches, trainers, and trainees—into one interface.

## Features

- Account sign-in and registration
- Administration dashboard
- Location and branch management
- Course creation, update, and viewing
- Subject and topic management
- Batch listing and management
- Trainer listing and details/edit forms
- Trainee listing and details/edit forms
- Profile and logout navigation
- REST API backend for frontend-to-database communication

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | Angular |
| Backend/API | Python, Django, Django REST Framework |
| Database | MySQL |
| API testing | Postman |
| Data access | Django ORM |

## Architecture

```text
Browser
  |
Angular Frontend
  | HTTP / REST API
Django REST Framework
  | Django views, serializers (where used), ORM/models
MySQL Database
```

## Screenshots

The images below are extracted from the supplied project documentation and included in this package.


<p align="center"><img src="screenshots/screenshot-01.png" alt="Sign-in Page" width="700"></p>
<p align="center"><strong>Sign-in Page</strong><br>User sign-in screen.</p>


<p align="center"><img src="screenshots/screenshot-02.png" alt="Registration Page" width="700"></p>
<p align="center"><strong>Registration Page</strong><br>Account registration screen.</p>


<p align="center"><img src="screenshots/screenshot-03.png" alt="Administration Dashboard" width="700"></p>
<p align="center"><strong>Administration Dashboard</strong><br>Main administration dashboard and module navigation.</p>


<p align="center"><img src="screenshots/screenshot-04.png" alt="Add Location" width="700"></p>
<p align="center"><strong>Add Location</strong><br>Location management form.</p>


<p align="center"><img src="screenshots/screenshot-05.png" alt="Add Branch" width="700"></p>
<p align="center"><strong>Add Branch</strong><br>Branch management form.</p>


<p align="center"><img src="screenshots/screenshot-06.png" alt="View Branches" width="700"></p>
<p align="center"><strong>View Branches</strong><br>Branch listing and available record actions.</p>


<p align="center"><img src="screenshots/screenshot-07.png" alt="Courses List" width="700"></p>
<p align="center"><strong>Courses List</strong><br>Course listing and management actions.</p>


<p align="center"><img src="screenshots/screenshot-08.png" alt="Add Course" width="700"></p>
<p align="center"><strong>Add Course</strong><br>Form for entering a course.</p>


<p align="center"><img src="screenshots/screenshot-09.png" alt="Update Course" width="700"></p>
<p align="center"><strong>Update Course</strong><br>Form for updating course information.</p>


<p align="center"><img src="screenshots/screenshot-10.png" alt="View Course" width="700"></p>
<p align="center"><strong>View Course</strong><br>Course view with subject-management access.</p>


<p align="center"><img src="screenshots/screenshot-11.png" alt="Manage Subjects" width="700"></p>
<p align="center"><strong>Manage Subjects</strong><br>Dialog for managing subjects associated with a course.</p>


<p align="center"><img src="screenshots/screenshot-12.png" alt="Subjects List" width="700"></p>
<p align="center"><strong>Subjects List</strong><br>Subject listing and available actions.</p>


<p align="center"><img src="screenshots/screenshot-13.png" alt="Add Topic" width="700"></p>
<p align="center"><strong>Add Topic</strong><br>Dialog for adding a topic.</p>


<p align="center"><img src="screenshots/screenshot-14.png" alt="Add Subject" width="700"></p>
<p align="center"><strong>Add Subject</strong><br>Dialog for adding a subject.</p>


<p align="center"><img src="screenshots/screenshot-15.png" alt="View Batches" width="700"></p>
<p align="center"><strong>View Batches</strong><br>Batch listing and available record actions.</p>


<p align="center"><img src="screenshots/screenshot-16.png" alt="Update Batch" width="700"></p>
<p align="center"><strong>Update Batch</strong><br>Form for updating batch information.</p>


<p align="center"><img src="screenshots/screenshot-17.png" alt="Add Batch" width="700"></p>
<p align="center"><strong>Add Batch</strong><br>Form for creating a batch.</p>


<p align="center"><img src="screenshots/screenshot-18.png" alt="Trainers List" width="700"></p>
<p align="center"><strong>Trainers List</strong><br>Trainer listing and record controls.</p>


<p align="center"><img src="screenshots/screenshot-19.png" alt="Trainer Details / Edit" width="700"></p>
<p align="center"><strong>Trainer Details / Edit</strong><br>Trainer information form.</p>


<p align="center"><img src="screenshots/screenshot-20.png" alt="Trainer Details / Edit — Alternate State" width="700"></p>
<p align="center"><strong>Trainer Details / Edit — Alternate State</strong><br>Additional supplied view of the trainer form.</p>


<p align="center"><img src="screenshots/screenshot-21.png" alt="Trainees List" width="700"></p>
<p align="center"><strong>Trainees List</strong><br>Trainee listing and record controls.</p>


<p align="center"><img src="screenshots/screenshot-22.png" alt="Trainee Details / Edit" width="700"></p>
<p align="center"><strong>Trainee Details / Edit</strong><br>Trainee information form.</p>


<p align="center"><img src="screenshots/screenshot-23.png" alt="Profile Page" width="700"></p>
<p align="center"><strong>Profile Page</strong><br>Profile details and account navigation.</p>


<p align="center"><img src="screenshots/screenshot-24.png" alt="Profile Page — Second Capture" width="700"></p>
<p align="center"><strong>Profile Page — Second Capture</strong><br>Second supplied profile capture.</p>


<p align="center"><img src="screenshots/screenshot-25.png" alt="Project Screenshot 25" width="700"></p>
<p align="center"><strong>Project Screenshot 25</strong><br>Screenshot extracted from the supplied documentation.</p>

## Project Structure

The repository contains separate frontend and backend areas. Run Django commands from the folder containing `manage.py`, and Angular commands from the folder containing `package.json`. This is a simplified outline; use the actual folder names in your checkout.

```text
Simple-Learn-Trainee-Management/
├── frontend/       # Angular application
├── backend/        # Django project; contains manage.py
├── database/       # SQL/database scripts, if included
├── screenshots/    # Images included with this README package
└── README.md
```

## Setup and Run

> Check your repository's actual dependency files and configuration before running commands.

### 1. Configure MySQL

1. Start MySQL.
2. Create/configure the database used by Django. The development database was named `trainee_management`.
3. Verify the host, port, username, password, and database name in the Django settings. The development setup used port `3305`; use the port configured on your machine.
4. Keep credentials and secret keys out of source control.

### 2. Start Django backend

From the directory containing `manage.py`, activate your Python virtual environment. If `requirements.txt` exists, install dependencies and run:

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 3. Start Angular frontend

From the Angular directory containing `package.json`, run:

```bash
npm install
npm start
```

If no `start` script is defined, use the project's configured Angular CLI command, commonly:

```bash
npx ng serve
```

Open the local URL printed by the Angular development server.

## Troubleshooting

- **Database connection fails:** Verify MySQL is running and check database name, port, credentials, and permissions.
- **API calls fail:** Confirm Django is running and check the Angular API base URL.
- **CORS errors:** Check that the backend permits the local Angular origin.
- **Missing packages:** Install dependencies from the repository's requirements/package files.
- **Login or protected routes fail:** Check backend authentication, authorization, and user records.
- **Migration errors:** Verify database connectivity and run migrations from the directory containing `manage.py`.

## Security Notes

- Do not commit `.env` files, database passwords, API secrets, or production credentials.
- Validate input and referenced record IDs on the backend.
- Enforce authentication and authorization in backend endpoints.
- Test API flows with Postman and verify the same workflows through the UI.

---

**Simple Learn | Trainee Management System**
