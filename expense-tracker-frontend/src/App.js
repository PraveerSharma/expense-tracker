import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseForm from './ExpenseForm';
import ExpenseAnalysis from './ExpenseAnalysis';
import GroupManagement from './GroupManagement';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GroupExpenseList from './GroupExpenseList';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categoryAnalysis, setCategoryAnalysis] = useState([]);
  const [analysisKey, setAnalysisKey] = useState(0); // State variable to trigger re-render of ExpenseAnalysis

  useEffect(() => {
      // Fetch expenses from the backend API
      axios.get('http://localhost:8080/api/expenses')
          .then(response => {
              setExpenses(response.data);
          })
          .catch(error => {
              console.error('Error fetching expenses:', error);
          });
      refreshAnalysis();
  }, []); // Empty dependency array ensures useEffect runs only once

  
  const handleExpenseAdded = (newExpense) => {
    setExpenses([...expenses, newExpense]);
    // Trigger refresh of ExpenseAnalysis component
    refreshAnalysis();
  };
  const handleExpenseDeleted = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));

    // Trigger refresh of ExpenseAnalysis component
    refreshAnalysis();
  };

  const refreshAnalysis = () => {
    // Fetch category-wise analysis data from the backend API
    axios.get('http://localhost:8080/api/expenses/category-analysis')
      .then(response => {
        const categoryArray = Object.entries(response.data).map(([category, total]) => ({ category, total }));
        setCategoryAnalysis(categoryArray);
      })
      .catch(error => {
        console.error('Error fetching category analysis:', error);
      });
  };
  return (
      <div>
        <div className="app-container">
          <div className="expense-list-container">
            <ExpenseList expenses={expenses} onDelete={handleExpenseDeleted} refreshAnalysis={refreshAnalysis}/>
          </div>
          <div className="side-panel">
            <div className="expense-form-container">
              <ExpenseForm onExpenseAdded={handleExpenseAdded} />
            </div>
            <div className="expense-analysis-container">
              <ExpenseAnalysis />
            </div>
          </div>
        </div>
        <div className="group-management-container">
              <GroupManagement />
        </div>
        <div className="group-expense-list">
              <GroupExpenseList />
        </div>   
      </div>
      
  );
}


export default App;

