import { useState } from 'react';
import './Dashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Employer', status: 'Active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Placement Officer', status: 'Active' }
    ]);

    const [placements, setPlacementsData] = useState([
        { id: 1, student: 'John Doe', company: 'Tech Corp', position: 'Software Engineer', date: '2025-10-15' },
        { id: 2, student: 'Alice Brown', company: 'Digital Solutions', position: 'Data Analyst', date: '2025-10-20' }
    ]);

    const [showUserForm, setShowUserForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: '',
        email: '',
        role: 'Student'
    });

    const handleAddUser = (e) => {
        e.preventDefault();
        const userToAdd = {
            id: users.length + 1,
            ...newUser,
            status: 'Active'
        };
        setUsers([...users, userToAdd]);
        setNewUser({ name: '', email: '', role: 'Student' });
        setShowUserForm(false);
        alert('User added successfully!');
    };

    const deleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(u => u.id !== userId));
        }
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Admin Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {user.name}</span>
                    <button onClick={onLogout} className="btn-logout">Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                <div className="stats-grid">
                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p className="stat-number">{users.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Placements</h3>
                        <p className="stat-number">{placements.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Active Jobs</h3>
                        <p className="stat-number">12</p>
                    </div>
                    <div className="stat-card">
                        <h3>Applications</h3>
                        <p className="stat-number">45</p>
                    </div>
                </div>

                <section className="card">
                    <div className="section-header">
                        <h2>User Management</h2>
                        <button onClick={() => setShowUserForm(!showUserForm)} className="btn-primary">
                            {showUserForm ? 'Cancel' : 'Add User'}
                        </button>
                    </div>

                    {showUserForm && (
                        <form onSubmit={handleAddUser} className="user-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        value={newUser.name}
                                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        value={newUser.email}
                                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Role</label>
                                    <select
                                        value={newUser.role}
                                        onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                    >
                                        <option value="Student">Student</option>
                                        <option value="Employer">Employer</option>
                                        <option value="Placement Officer">Placement Officer</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn-primary">Add User</button>
                        </form>
                    )}

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td>{u.name}</td>
                                    <td>{u.email}</td>
                                    <td>{u.role}</td>
                                    <td><span className="status status-active">{u.status}</span></td>
                                    <td>
                                        <button onClick={() => deleteUser(u.id)} className="btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="card">
                    <h2>Placement Records</h2>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Company</th>
                                <th>Position</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placements.map(p => (
                                <tr key={p.id}>
                                    <td>{p.student}</td>
                                    <td>{p.company}</td>
                                    <td>{p.position}</td>
                                    <td>{p.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default AdminDashboard;
