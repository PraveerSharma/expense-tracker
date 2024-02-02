import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


function ExpenseAnalysis() {
    const [categoryAnalysis, setCategoryAnalysis] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/expenses/category-analysis')
            .then(response => {
                console.log(response.data); 
                
                const categoryArray = Object.entries(response.data).map(([category, total]) => ({ category, total }));
                setCategoryAnalysis(categoryArray);
            })
            .catch(error => {
                console.error('Error fetching category analysis:', error);
            });
    }, []);

    return (
        <div className="expense-analysis-container">
            <h1>Expense Analysis</h1>
            <ul>
                {/* Check if categoryAnalysis is an array before mapping */}
                {Array.isArray(categoryAnalysis) && categoryAnalysis.map(({ category, total }) => (
                    
                    <li key={category}>
                        <div className='expense-analysis-div'>
                            <span className='expense-analysis-category'>{category}</span>
                            <span className='expense-analysis-total'>${total}</span>
                        </div>
                    </li>
                ))}
            </ul>
            
            
        </div>
    );
}

export default ExpenseAnalysis;

