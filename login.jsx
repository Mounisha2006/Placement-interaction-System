import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Mock authentication - replace with real API call
        const userData = {
            email,
            role,
            name: email.split('@')[0]
        };

        onLogin(userData);

        // Navigate based on role
        switch (role) {
            case 'admin':
                navigate('/admin');
                break;
            case 'student':
                navigate('/student');
                break;
            case 'employer':
                navigate('/employer');
                break;
            case 'placement-officer':
                navigate('/placement-officer');
                break;
            default:
                navigate('/');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Placement Management System</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="form-group">
                        <label>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="student">Student</option>
                            <option value="employer">Employer</option>
                            <option value="placement-officer">Placement Officer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
