import { Link, useNavigate } from 'react-router-dom';
import { Home, Settings, LogOut, LogIn, FileText } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-panel" style={{ padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, borderBottom: '1px solid rgba(255,255,255,0.7)', background: 'rgba(255, 255, 255, 0.75)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/" style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Home size={24} color="var(--accent)" />
                    <span>Revit MEP Family Creation Course</span>
                </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {user ? (
                    <>
                        <Link to="/quiz" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', padding: '0.5rem 0.75rem', borderRadius: '8px', transition: 'all 0.2s', ...hoverStyle }}>
                            <FileText size={18} />
                            <span>Quiz</span>
                        </Link>
                        {isAdmin && (
                            <Link to="/settings" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', padding: '0.5rem 0.75rem', borderRadius: '8px', transition: 'all 0.2s', ...hoverStyle }}>
                                <Settings size={18} />
                                <span>Settings</span>
                            </Link>
                        )}
                        <span style={{
                            fontSize: '0.85rem',
                            color: 'var(--accent)',
                            background: 'rgba(244, 63, 94, 0.1)',
                            padding: '0.4rem 0.75rem',
                            borderRadius: '20px',
                            fontWeight: '600',
                            marginRight: '0.5rem'
                        }}>
                            {user.role}
                        </span>
                        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: '1px solid rgba(0,0,0,0.1)', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', padding: '0.5rem 0.75rem', borderRadius: '8px', transition: 'all 0.2s', ...hoverStyle }}>
                            <LogOut size={18} />
                            <span>Logout</span>
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--accent)', color: 'white', textDecoration: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(225, 29, 72, 0.2)' }}>
                        <LogIn size={18} />
                        <span>Login</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}

const hoverStyle = {
    ':hover': {
        background: 'rgba(0,0,0,0.05)'
    }
};
