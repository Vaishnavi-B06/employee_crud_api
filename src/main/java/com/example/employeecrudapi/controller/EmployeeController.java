package com.example.employeecrudapi.controller;

import com.example.employeecrudapi.model.Employee;
import com.example.employeecrudapi.service.EmployeeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private final EmployeeService service;

    public EmployeeController(EmployeeService service) { this.service = service; }

    @PostMapping
    public Employee create(@RequestBody Employee e) { return service.create(e); }

    @GetMapping
    public List<Employee> getAll() { return service.getAll(); }

    @GetMapping("/{id}")
    public Employee getOne(@PathVariable Long id) { return service.getById(id); }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee e) { return service.update(id, e); }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        return service.delete(id) ? "Deleted" : "Not Found";
    }
}
