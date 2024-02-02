
package com.example.expensetracker.repository;

import java.util.*;
import com.example.expensetracker.entity.Expense;
import org.springframework.data.jpa.repository.*;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("SELECT e.category, SUM(e.amount) FROM Expense e GROUP BY e.category")
    List<Object[]> getCategoryWiseAnalysisList();

    default Map<String, Double> getCategoryWiseAnalysis() {
        List<Object[]> results = getCategoryWiseAnalysisList();
        Map<String, Double> analysisMap = new HashMap<>();

        for (Object[] result : results) {
            String category = (String) result[0];
            Double sum = (Double) result[1];
            analysisMap.put(category, sum);
        }

        return analysisMap;
    }
}

