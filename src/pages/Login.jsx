import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Navigate to the referring page if one exists, otherwise home.
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const result = login(username, password);

        if (result.success) {
            navigate(from, { replace: true });
        } else {
            setError(result.message);
        }
    };

    return (
        <div style={{
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div className="glass-panel" style={{
                maxWidth: '400px',
                width: '100%',
                padding: '3rem 2rem',
                textAlign: 'center',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                border: '1px solid rgba(255,255,255,0.7)'
            }}>
                <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Welcome Back</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    Sign in to access your course materials.
                </p>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: 'rgb(239, 68, 68)',
                        padding: '0.75rem',
                        borderRadius: '8px',
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        border: '1px solid rgba(239, 68, 68, 0.2)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <label htmlFor="username" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                background: 'rgba(255,255,255,0.8)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit'
                            }}
                            autoFocus
                            required
                        />
                    </div>

                    <div style={{ textAlign: 'left' }}>
                        <label htmlFor="password" style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(0,0,0,0.1)',
                                background: 'rgba(255,255,255,0.8)',
                                fontSize: '1rem',
                                outline: 'none',
                                transition: 'all 0.2s',
                                fontFamily: 'inherit'
                            }}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            marginTop: '1rem',
                            padding: '0.85rem',
                            background: 'var(--accent)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 12px rgba(225, 29, 72, 0.2)'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(225, 29, 72, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(225, 29, 72, 0.2)';
                        }}
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
