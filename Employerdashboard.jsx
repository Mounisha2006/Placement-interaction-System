import { useState } from 'react';
import './Dashboard.css';

const EmployerDashboard = ({ user, onLogout }) => {
    const [jobs, setJobs] = useState([
        { id: 1, position: 'Software Engineer', applicants: 15, status: 'Active' },
        { id: 2, position: 'Data Analyst', applicants: 8, status: 'Active' }
    ]);

    const [showJobForm, setShowJobForm] = useState(false);
    const [newJob, setNewJob] = useState({
        position: '',
        description: '',
        salary: '',
        location: ''
    });

    const [applications, setApplications] = useState([
        { id: 1, student: 'John Doe', position: 'Software Engineer', status: 'Under Review', date: '2025-11-03' },
        { id: 2, student: 'Jane Smith', position: 'Software Engineer', status: 'Interview Scheduled', date: '2025-11-02' },
        { id: 3, student: 'Mike Johnson', position: 'Data Analyst', status: 'Under Review', date: '2025-11-01' }
    ]);

    const handlePostJob = (e) => {
        e.preventDefault();
        const jobToAdd = {
            id: jobs.length + 1,
            position: newJob.position,
            applicants: 0,
            status: 'Active'
        };
        setJobs([...jobs, jobToAdd]);
        setNewJob({ position: '', description: '', salary: '', location: '' });
        setShowJobForm(false);
        alert('Job posted successfully!');
    };

    const updateApplicationStatus = (appId, newStatus) => {
        setApplications(applications.map(app =>
            app.id === appId ? { ...app, status: newStatus } : app
        ));
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Employer Dashboard</h1>
                <div className="user-info">
                    <span>Welcome, {user.name}</span>
                    <button onClick={onLogout} className="btn-logout">Logout</button>
                </div>
            </header>

            <div className="dashboard-content">
                <section className="card">
                    <div className="section-header">
                        <h2>Job Listings</h2>
                        <button onClick={() => setShowJobForm(!showJobForm)} className="btn-primary">
                            {showJobForm ? 'Cancel' : 'Post New Job'}
                        </button>
                    </div>

                    {showJobForm && (
                        <form onSubmit={handlePostJob} className="job-form">
                            <div className="form-group">
                                <label>Position</label>
                                <input
                                    type="text"
                                    value={newJob.position}
                                    onChange={(e) => setNewJob({ ...newJob, position: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    value={newJob.description}
                                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Salary</label>
                                    <input
                                        type="text"
                                        value={newJob.salary}
                                        onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        value={newJob.location}
                                        onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary">Post Job</button>
                        </form>
                    )}

                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Applicants</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map(job => (
                                <tr key={job.id}>
                                    <td>{job.position}</td>
                                    <td>{job.applicants}</td>
                                    <td><span className="status status-active">{job.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className="card">
                    <h2>Applications Received</h2>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Position</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(app => (
                                <tr key={app.id}>
                                    <td>{app.student}</td>
                                    <td>{app.position}</td>
                                    <td>{app.date}</td>
                                    <td><span className="status">{app.status}</span></td>
                                    <td>
                                        <select
                                            value={app.status}
                                            onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                                            className="status-select"
                                        >
                                            <option value="Under Review">Under Review</option>
                                            <option value="Interview Scheduled">Interview Scheduled</option>
                                            <option value="Accepted">Accepted</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default EmployerDashboard;
