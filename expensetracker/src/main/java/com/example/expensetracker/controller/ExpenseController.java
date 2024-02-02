

package com.example.expensetracker.controller;

import com.example.expensetracker.entity.Expense;
import com.example.expensetracker.repository.ExpenseRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.*;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseRepository expenseRepository;

    @GetMapping
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseRepository.save(expense);
    }


    @GetMapping("/category-analysis")
    public ResponseEntity<Map<String, Double>> getCategoryWiseAnalysis() {
        Map<String, Double> categoryWiseAnalysis = expenseRepository.getCategoryWiseAnalysis();
        return ResponseEntity.ok(categoryWiseAnalysis);
    }


    // Delete all data //
    @DeleteMapping
    public ResponseEntity<?> deleteAllExpenses() {
        expenseRepository.deleteAll();
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExpense(@PathVariable Long id) {
        expenseRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
