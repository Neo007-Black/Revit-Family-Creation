import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export function Navbar() {

    return (
        <nav className="glass-panel" style={{ padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: 'none', borderLeft: 'none', borderRight: 'none', borderRadius: 0, borderBottom: '1px solid rgba(255,255,255,0.7)', background: 'rgba(255, 255, 255, 0.75)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link to="/" style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Home size={24} color="var(--accent)" />
                    <span>Revit Masterclass</span>
                </Link>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--accent)', background: 'rgba(244, 63, 94, 0.1)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: '600' }}>
                MEP Custom Curriculum
            </div>
        </nav>
    );
}
