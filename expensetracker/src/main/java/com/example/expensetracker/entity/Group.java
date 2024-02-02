package com.example.expensetracker.entity;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "`groups`")
public class Group {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private double sharedExpense;

    @ElementCollection
    private List<String> members;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getSharedExpense() {
        return sharedExpense;
    }

    public void setSharedExpense(double sharedExpense) {
        this.sharedExpense = sharedExpense;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }
}

