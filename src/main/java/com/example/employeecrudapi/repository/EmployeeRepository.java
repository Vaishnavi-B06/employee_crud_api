package com.example.employeecrudapi.repository;

import com.example.employeecrudapi.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {}
