import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function ExpenseForm({ onExpenseAdded, refreshAnalysis }) {
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        date: '' 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make a POST request to add a new expense
        axios.post('http://localhost:8080/api/expenses', formData) 
            .then(response => {
                console.log('Expense added:', response.data);
                onExpenseAdded(response.data);
                
                setFormData({ amount: '', category: '', description: '', date: '' }); 
                refreshAnalysis();
            })
            .catch(error => {
                console.error('Error adding expense:', error);
            });
    };

    return (
        <div className="expense-form-container">
            <h1>Expense Form</h1>
            <form onSubmit={handleSubmit}>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" required />
                <select name="category" className='category-input-expense-form' value={formData.category} onChange={handleChange} required>
                    <option value="Miscellaneous">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Bills">Bills</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Utilities">Utilities</option>
                </select>
                <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" required /> 
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
}

export default ExpenseForm;
