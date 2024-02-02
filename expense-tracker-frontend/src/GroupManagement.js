import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import './GroupManagement.css';

function GroupManagement() {
    const [groupName, setGroupName] = useState('');
    const [sharedExpense, setSharedExpense] = useState('');
    const [member, setMember] = useState('');
    const [members, setMembers] = useState([]);
    const [groupData, setGroupData] = useState([]);

    const handleAddMember = () => {
        setMembers([...members, member]);
        setMember('');
    };

    const handleCreateGroup = () => {
        // Make a POST request to create a new group
        axios.post('http://localhost:8080/api/groups', { name: groupName, sharedExpense: sharedExpense, members: members })
            .then(response => {
                console.log('Group created:', response.data);
                // Optionally, update the state to reflect the new group
                setGroupData([...groupData, response.data]);
            })
            .catch(error => {
                console.error('Error creating group:', error);
            });
    };

    const handleMemberChange = (index, value) => {
        const updatedMembers = [...members];
        updatedMembers[index] = value;
        setMembers(updatedMembers);
    };

    return (
        <div className="group-management-container">
            <h1 className='group-management-heading'>Group Management</h1>
            <div className="input-group">
                <label htmlFor="group-name" className='group-management-labels'>Group Name</label>
                <input className='group-management-input' type="text" id="group-name" value={groupName} onChange={e => setGroupName(e.target.value)} />
            </div>
            <div className="input-group">
                <label htmlFor="shared-expense" className='group-management-labels'>Shared Expense</label>
                <input className='group-management-input' type="number" id="shared-expense" value={sharedExpense} onChange={e => setSharedExpense(e.target.value)} />
            </div>
            <div className="input-group">
                <label className='group-management-labels'>Members</label>
                <br></br>
                {members.map((member, index) => (
                    <input
                        key={index}
                        type="text"
                        value={member}
                        onChange={e => handleMemberChange(index, e.target.value)}
                    />
                ))}
                <button onClick={handleAddMember} className='add-member-button'>Add</button>
            </div>
            <button onClick={handleCreateGroup} className='create-group-button'>Create Group</button>
        </div>


        // 11 - Work on it. 
        // <div className="group-management-container">
        //     <h1>Create a New Group</h1>
        //     <div className="form-group">
        //         <label>Group Name:</label>
        //         <input
        //             type="text"
        //             value={groupName}
        //             onChange={(e) => setGroupName(e.target.value)}
        //             placeholder="Enter group name"
        //         />
        //     </div>
        //     <div className="form-group">
        //         <label>Shared Expense:</label>
        //         <input
        //             type="number"
        //             value={sharedExpense}
        //             onChange={(e) => setSharedExpense(e.target.value)}
        //             placeholder="Enter shared expense"
        //         />
        //     </div>
        //     <div className="form-group">
        //         <label>Members:</label>
        //         <div className="member-list">
        //             {members.map((member, index) => (
        //                 <div key={index} className="member-item">{member}</div>
        //             ))}
        //         </div>
        //         <div className="add-member">
        //             <input
        //                 type="text"
        //                 value={member}
        //                 onChange={(e) => setMember(e.target.value)}
        //                 placeholder="Enter member name"
        //             />
        //             <button onClick={handleAddMember}>Add Member</button>
        //         </div>
        //     </div>
        //     <button onClick={handleCreateGroup}>Create Group</button>
        // </div>
        // 11


    );
}

export default GroupManagement;





