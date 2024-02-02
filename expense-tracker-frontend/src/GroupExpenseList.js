import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function GroupExpenseList() {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        // Fetch group data from the backend API
        axios.get('http://localhost:8080/api/groups')
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.error('Error fetching groups:', error);
            });
    }, []); // Empty dependency array ensures useEffect runs only once

    return (

        // // Old
        // <div className="group-expense-list">
        //     <h2>Group Expense List</h2>
        //     <table>
        //         <thead>
        //             <tr>
        //                 <th>Group Name</th>
        //                 <th>Shared Expense</th>
        //                 <th>Members</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {groups.map(group => (
        //                 <tr key={group.id}>
        //                     <td>{group.name}</td>
        //                     <td>{group.sharedExpense}</td>
        //                     <td>{group.members.join(', ')}</td>
        //                 </tr>
        //             ))}
        //         </tbody>
        //     </table>
        // </div>
        // // old

        <div className="expense-list-container">
            <h1>Group Expense List</h1>
            {groups.length > 0 ? (
                <ul className="expense-list">
                    {groups.map(group => (
                        <li key={group.id} className="expense-item">
                            <div className="expense-details">
                                <span className="expense-description">{group.name}</span>
                                <div className="expense-actions">
                                    <span>${group.sharedExpense}</span>
                                    <span>{group.members.join(', ')}</span>
                                    <button className="delete-button">Remove</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No expenses to display.</p>
            )}
        </div>
    );
}

export default GroupExpenseList;
