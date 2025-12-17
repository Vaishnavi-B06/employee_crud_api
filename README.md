Employee Management System

This is a full-stack Employee Management System with a Spring Boot backend and a simple HTML frontend.
It allows you to manage employees using a web interface and a REST API.

Technologies Used

Backend:

Java 17

Spring Boot 3.2.3

Spring Data JPA

PostgreSQL

Maven

HikariCP

Frontend:

HTML, CSS, JavaScript (simple index.html)

Features

CRUD Operations for Employees:

Create a new employee

View all employees

View employee by ID

Update employee information

Delete employee

Basic web interface with forms and tables

Connects directly to backend REST API

API Endpoints (Backend)

POST /employees - Create a new employee

GET /employees - Get all employees

GET /employees/{id} - Get employee by ID

PUT /employees/{id} - Update employee by ID

DELETE /employees/{id} - Delete employee by ID

Base URL: http://localhost:9090

Database Configuration

PostgreSQL Database: employee_db

Username: postgres

Password: V@ishnavi123

URL: jdbc:postgresql://localhost:5432/employee_db

How to Run
Backend

Make sure PostgreSQL is running and database employee_db exists.

Open the backend project in your IDE.

Run EmployeeCrudApiApplication.

Backend will be accessible at http://localhost:9090.

Frontend

Open index.html in your browser.

The frontend directly interacts with the backend APIs at http://localhost:9090.

Use the web interface to perform CRUD operations on employees.

Authors

This project was developed by:

Suhani Kaldate

Vaishnavi Kade

Vaishnavi Bagale