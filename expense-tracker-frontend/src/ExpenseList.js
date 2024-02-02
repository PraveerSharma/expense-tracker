import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

 
function ExpenseList({ expenses, onDelete, refreshAnalysis }) {

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/api/expenses/${id}`)
            .then(response => {
                // If the delete request is successful, trigger the onDelete callback to update the expenses list
                onDelete(id);
                refreshAnalysis(); // Call the function to refresh the analysis data
            })
            .catch(error => {
                console.error('Error deleting expense:', error);
            });
    };
    return (
        <div className="expense-list-container">
            <h1>Expense List</h1>
            {expenses.length > 0 ? (
                <ul className="expense-list">
                    {expenses.map(expense => (
                        <li key={expense.id} className="expense-item">
                            <div className="expense-details">
                                <span className="expense-description">{expense.description}</span>
                                <div className="expense-actions">
                                    <span>${expense.amount}</span>
                                    <button className="delete-button" onClick={() => handleDelete(expense.id)}>Remove</button>
                                </div>
                            </div>
                            <span className="expense-category">{expense.category}</span>
                            <span className="expense-date">{new Date(expense.date).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expenses to display.</p>
            )}
        </div>
    );
}

export default ExpenseList;

