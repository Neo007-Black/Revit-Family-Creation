import { useAuth } from '../context/AuthContext';
import { Settings as SettingsIcon, Users, Lock, Database, Bell } from 'lucide-react';

export function Settings() {
    const { user } = useAuth();

    return (
        <div style={{ padding: '2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{
                    background: 'rgba(225, 29, 72, 0.1)',
                    padding: '1rem',
                    borderRadius: '16px',
                    color: 'var(--accent)'
                }}>
                    <SettingsIcon size={32} />
                </div>
                <div>
                    <h1 style={{ fontSize: '2rem', margin: 0, color: 'var(--text-primary)' }}>Admin Settings</h1>
                    <p style={{ color: 'var(--text-secondary)', margin: '0.25rem 0 0 0' }}>Manage course curriculum and user access.</p>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-panel" style={{ padding: '2rem', gridColumn: '1 / -1' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Users size={20} color="var(--accent)" />
                            <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Student Management</h2>
                        </div>
                        <button style={{
                            padding: '0.5rem 1rem',
                            background: 'var(--accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.85rem',
                            fontWeight: '600'
                        }}>+ Add Student</button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.05)', textAlign: 'left', color: 'var(--text-secondary)' }}>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Name</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Username</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Status</th>
                                    <th style={{ padding: '1rem', fontWeight: '600' }}>Progress</th>
                                    <th style={{ padding: '1rem', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { name: 'John Doe', username: 'student', status: 'Active', progress: '45%' },
                                    { name: 'Jane Smith', username: 'jsmith12', status: 'Active', progress: '12%' },
                                    { name: 'Mike Johnson', username: 'mjohnson', status: 'Inactive', progress: '0%' }
                                ].map((student, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                                        <td style={{ padding: '1rem', color: 'var(--text-primary)', fontWeight: '500' }}>{student.name}</td>
                                        <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{student.username}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{
                                                background: student.status === 'Active' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                                                color: student.status === 'Active' ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)',
                                                padding: '0.25rem 0.5rem',
                                                borderRadius: '12px',
                                                fontSize: '0.8rem',
                                                fontWeight: '600'
                                            }}>
                                                {student.status}
                                            </span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <div style={{ width: '100%', background: 'rgba(0,0,0,0.05)', height: '6px', borderRadius: '3px' }}>
                                                    <div style={{ width: student.progress, background: 'var(--accent)', height: '100%', borderRadius: '3px' }}></div>
                                                </div>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{student.progress}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', fontSize: '0.85rem', fontWeight: '600' }}>Edit</button>
                                        </td>
                                    </tr>
                                ))}
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
                    <button style={btnStyle}>Change Password</button>
                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: '500' }}>Require 2FA for Admins</span>
                        <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)', transform: 'scale(1.2)' }} />
                    </div>
                </div>

                {/* Course Content */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Database size={20} color="var(--accent)" />
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Course Data</h2>
                    </div>
                    <button style={btnStyle}>Edit Curriculum JSON</button>
                    <button style={{ ...btnStyle, marginTop: '0.75rem' }}>Sync with Database</button>
                </div>

                {/* Notifications */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <Bell size={20} color="var(--accent)" />
                        <h2 style={{ fontSize: '1.25rem', margin: 0 }}>Notifications</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email alerts on new enrollments</span>
                            <input type="checkbox" defaultChecked style={{ accentColor: 'var(--accent)', transform: 'scale(1.2)' }} />
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Weekly progress reports</span>
                            <input type="checkbox" style={{ accentColor: 'var(--accent)', transform: 'scale(1.2)' }} />
                        </div>
                    </div>
                </div>
            </div>
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
