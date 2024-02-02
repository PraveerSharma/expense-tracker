package com.example.expensetracker.repository;

import com.example.expensetracker.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
}

