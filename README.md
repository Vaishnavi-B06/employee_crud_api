# Employee CRUD API

This is a Spring Boot project for managing employees with a REST API.  
It supports basic CRUD operations: Create, Read, Update, Delete.

## Technologies Used
- Java 17
- Spring Boot 3.2.3
- Spring Data JPA
- PostgreSQL
- Maven
- HikariCP

## API Endpoints
- `POST /employees` - Create a new employee
- `GET /employees` - Get all employees
- `GET /employees/{id}` - Get employee by ID
- `PUT /employees/{id}` - Update employee by ID
- `DELETE /employees/{id}` - Delete employee by ID

## Database Configuration
- PostgreSQL Database: `employee_db`
- Username: `postgres`
- Password: `V@ishnavi123`
- URL: `jdbc:postgresql://localhost:5432/employee_db`

## How to Run
1. Make sure PostgreSQL is running and database `employee_db` exists.
2. Open project in your IDE.
3. Run `EmployeeCrudApiApplication`.
4. Access APIs using Postman or any REST client.

## Author
This project was developed by:
1.Suhani Kaldate
2.Vaishnavi Kade
3.Vaishnavi Bagale
