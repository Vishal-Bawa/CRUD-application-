import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [users, setUsers] = useState([]); // To store users fetched from the backend
  const [newUser, setNewUser] = useState({ name: '', email: '', age: '' }); // Include age
  const [loading, setLoading] = useState(false); // To display loading state while fetching data
  const [error, setError] = useState(null); // To handle errors (e.g., when fetching or adding users)

  // Fetch users from the backend API
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to fetch all users from the backend
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null); // Reset any previous error message
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data); // Store fetched users in the state
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to fetch users. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the submission of a new user
  const handleAddUser = async () => {
    if (newUser.name.trim() === '' || newUser.email.trim() === '' || newUser.age.trim() === '') {
      alert('Please provide name, email, and age');
      return;
    }

    try {
      setError(null); // Reset any previous error message
      const response = await axios.post('http://localhost:5000/api/users', newUser); // Send POST request to add user
      setUsers([...users, response.data]); // Add new user to the state
      setNewUser({ name: '', email: '', age: '' }); // Reset input fields
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user. Please try again later.');
    }
  };

  // Function to handle user deletion
  const handleDeleteUser = async (id) => {
    try {
      setError(null); // Reset any previous error message
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id)); // Update state to remove the deleted user
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user. Please try again later.');
    }
  };

  return (
    <div>
      <h1>User Management</h1>

      {/* Display error if there is one */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Loading state */}
      {loading && <p>Loading users...</p>}

      {/* Display list of users */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.age} 
            <button onClick={() => handleDeleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Add new user form */}
      <div>
        <h2>Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
        />
        <input
          type="number"
          placeholder="Age"
          value={newUser.age}
          onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
    </div>
  );
}

export default App;
