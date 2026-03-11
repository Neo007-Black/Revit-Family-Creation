import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Users, Lock, X, Trash2, Edit2, Clock } from 'lucide-react';

export function Settings() {
    const { user, users, loginLog, isUserActive, addStudent, updateStudent, deleteStudent, updatePassword } = useAuth();

    // Modal states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [error, setError] = useState('');

    // Admin Password Modal state
    const [isAdminPasswordModalOpen, setAdminPasswordModalOpen] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        password: '',
        status: 'Active'
    });

    const handleAdminPasswordSubmit = (e) => {
        e.preventDefault();
        if (adminPassword.trim().length < 4) {
            setError('Password must be at least 4 characters long.');
            return;
        }
        updatePassword(user.username, adminPassword);
        setAdminPassword('');
        setAdminPasswordModalOpen(false);
    };

    const students = users?.filter(u => u.role === 'student') || [];

    const handleOpenModal = (student = null) => {
        setError('');
        if (student) {
            setIsEditing(true);
            setCurrentId(student.id);
            setFormData({ name: student.name || '', username: student.username, password: student.password, status: student.status });
        } else {
            setIsEditing(false);
            setCurrentId(null);
            setFormData({ name: '', username: '', password: '', status: 'Active' });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (isEditing) {
            updateStudent(currentId, formData);
            setIsModalOpen(false);
        } else {
            const result = addStudent(formData);
            if (result.success) {
                setIsModalOpen(false);
            } else {
                setError(result.message);
            }
        }
    };

    return (
        <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ background: 'rgba(225, 29, 72, 0.1)', padding: '1rem', borderRadius: '16px', color: 'var(--accent)' }}>
                    <SettingsIcon size={32} />
                </div>
                <div>
                    <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-primary)' }}>Admin Settings</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>Manage course curriculum and user access.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

                {/* Student Management */}
                <div className="glass-panel" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Users size={20} color="var(--accent)" />
                            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Student Management</h2>
                        </div>
                        <button onClick={() => handleOpenModal()} style={{ padding: '0.5rem 1rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}>
                            + Add Student
                        </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.05)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Name</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Username</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Password</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Progress</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                        <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{student.name}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{student.username}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>
                                            <span style={{ fontSize: '0.8rem', background: 'rgba(0,0,0,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px', fontFamily: 'monospace' }}>{student.password}</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: student.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: student.status === 'Active' ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                                                padding: '0.25rem 0.6rem',
                                                borderRadius: '12px',
                                                fontSize: '0.75rem',
                                                fontWeight: '600'
                                            }}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem', width: '200px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ flex: 1, background: 'rgba(0,0,0,0.05)', height: '6px', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                                                    <div style={{ width: student.progress || '0%', background: 'var(--accent)', height: '100%', borderRadius: '3px', position: 'absolute', top: 0, left: 0 }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', width: '35px', textAlign: 'right' }}>{student.progress || '0%'}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                            <button
                                                onClick={() => handleOpenModal(student)}
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = 'var(--text-primary)' }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)' }}
                                                title="Edit Student"
                                            >
                                                <Edit2 size={16} />
                                            </button>
                                            <button
                                                onClick={() => { if (window.confirm('Are you sure you want to delete this student?')) deleteStudent(student.id); }}
                                                style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'rgb(239, 68, 68)', padding: '0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                                                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)' }}
                                                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                                                title="Delete Student"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {students.length === 0 && (
                                    <tr>
                                        <td colSpan="6" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No students found. Add one to get started.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Login Log */}
                <div className="glass-panel" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Clock size={20} color="var(--accent)" />
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Login Log</h2>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        Recent student logins and activity status. Active = activity within the last 5 minutes.
                    </p>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.05)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Name</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Username</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Role</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Login Time</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(loginLog || []).map((entry) => {
                                    const active = isUserActive(entry.username);
                                    const loginDate = new Date(entry.loginTime);
                                    const formattedTime = loginDate.toLocaleString(undefined, {
                                        dateStyle: 'medium',
                                        timeStyle: 'short'
                                    });
                                    return (
                                        <tr key={entry.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                            <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{entry.name}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{entry.username}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)', textTransform: 'capitalize' }}>{entry.role}</td>
                                            <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{formattedTime}</td>
                                            <td style={{ padding: '1rem' }}>
                                                <span style={{
                                                    background: active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(156, 163, 175, 0.2)',
                                                    color: active ? 'rgb(34, 197, 94)' : 'rgb(107, 114, 128)',
                                                    padding: '0.25rem 0.6rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: '600',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.35rem'
                                                }}>
                                                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: active ? 'currentColor' : 'currentColor', opacity: active ? 1 : 0.6 }} />
                                                    {active ? 'Active' : 'Offline'}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {(!loginLog || loginLog.length === 0) && (
                                    <tr>
                                        <td colSpan="5" style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No login records yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Security Settings */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Lock size={20} color="var(--accent)" />
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Security</h2>
                    </div>
                    <button style={btnStyle} onClick={() => setAdminPasswordModalOpen(true)}>Change Admin Password</button>
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}>Require 2FA for Admins</span>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)', transform: 'scale(1.2)' }} />
                    </div>
                </div>
            </div>

            {/* Student Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                        <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                            <X size={20} />
                        </button>

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', marginTop: 0 }}>
                            {isEditing ? 'Edit Student' : 'Add New Student'}
                        </h2>

                        {error && (
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Real Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} style={inputStyle} placeholder="John Doe" required />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Username</label>
                                <input type="text" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} style={{ ...inputStyle, opacity: isEditing ? 0.6 : 1 }} disabled={isEditing} placeholder="johndoe123" required />
                                {isEditing && <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', display: 'block', marginTop: '0.25rem' }}>Usernames cannot be changed.</small>}
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
                                <input type="text" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} style={inputStyle} placeholder="Enter password" required />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Account Status</label>
                                <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={inputStyle}>
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                            <button type="submit" style={{ marginTop: '1rem', padding: '0.85rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.2)' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {isEditing ? 'Save Changes' : 'Create Student'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Admin Password Modal */}
            {isAdminPasswordModalOpen && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '2rem', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                        <button onClick={() => { setAdminPasswordModalOpen(false); setError(''); }} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                            <X size={20} />
                        </button>

                        <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', marginTop: 0 }}>
                            Change Admin Password
                        </h2>

                        {error && (
                            <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'rgb(239, 68, 68)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleAdminPasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>New Password</label>
                                <input type="text" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} style={inputStyle} placeholder="Enter new password" required />
                            </div>
                            <button type="submit" style={{ marginTop: '1rem', padding: '0.85rem', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.2)' }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                Save New Password
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

const btnStyle = {
    display: 'block',
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.1)',
    borderRadius: '8px',
    fontSize: '0.9rem',
    fontWeight: '500',
    color: 'var(--text-primary)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'left'
};

const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.1)',
    background: 'rgba(255,255,255,0.8)',
    fontSize: '0.95rem',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box'
};
