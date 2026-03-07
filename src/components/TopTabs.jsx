import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { courseData } from '../data/courseData';
import { ChevronDown } from 'lucide-react';

const TESTING_ZONE_ID = 'testing-zone';

const SUB_TABS = [
    { key: 'geometry', label: '1. Geo' },
    { key: 'parameters', label: '2. Params' },
    { key: 'reference', label: '3. Ref Line' },
    { key: 'paramtypes', label: '5. Types' },
    { key: 'famprops', label: '6. Props' },
];

export function TopTabs() {
    const location = useLocation();
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const isTestingZone = location.pathname.includes(TESTING_ZONE_ID);
    const regularTabs = courseData.filter(l => l.id !== TESTING_ZONE_ID);

    const handleSubTabClick = (subTabKey) => {
        setDropdownOpen(false);
        if (!isTestingZone) {
            navigate(`/lesson/${TESTING_ZONE_ID}`);
        }
        setTimeout(() => {
            const iframe = document.querySelector('iframe[title="Testing Zone Simulator"]');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage({ type: 'switchTab', tab: subTabKey }, '*');
            }
        }, isTestingZone ? 100 : 600);
    };

    const tabLinkStyle = (active) => ({
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem 1.5rem',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        color: active ? 'var(--accent)' : 'var(--text-secondary)',
        borderBottom: active ? '3px solid var(--accent)' : '3px solid transparent',
        background: active ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
        transition: 'all 0.2s',
        fontWeight: active ? '600' : '500',
        opacity: active ? 1 : 0.7,
        flexShrink: 0,
    });

    return (
        <div style={{
            background: 'rgba(255, 255, 255, 0.7)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.9)',
            position: 'sticky',
            top: '70px',
            zIndex: 90,
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
            display: 'flex',
            alignItems: 'stretch',
        }}>
            {/* Scrollable lesson tabs */}
            <div className="top-tabs-scroll" style={{
                display: 'flex',
                overflowX: 'auto',
                flex: 1,
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(0,0,0,0.15) transparent',
            }}>
                <style>{`
                    .top-tabs-scroll::-webkit-scrollbar { height: 4px; }
                    .top-tabs-scroll::-webkit-scrollbar-track { background: transparent; }
                    .top-tabs-scroll::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.15); border-radius: 99px; }
                `}</style>

                {regularTabs.map((lesson, index) => {
                    const isActive = location.pathname.includes(lesson.id);
                    return (
                        <Link
                            key={lesson.id}
                            to={`/lesson/${lesson.id}`}
                            style={tabLinkStyle(isActive)}
                            onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; } }}
                            onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; } }}
                        >
                            <span style={{ fontSize: '0.85rem', opacity: 0.6, marginRight: '0.25rem', fontWeight: 'bold' }}>{index + 1}.</span>
                            {lesson.title.replace(/^\d+\.\s/, '')}
                        </Link>
                    );
                })}
            </div>

            {/* Testing Zone — outside the scroll so dropdown isn't clipped */}
            <div ref={dropdownRef} style={{ position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'stretch', borderLeft: '1px solid rgba(0,0,0,0.06)' }}>
                <Link
                    to={`/lesson/${TESTING_ZONE_ID}`}
                    style={{
                        ...tabLinkStyle(isTestingZone),
                        paddingRight: '0.25rem',
                    }}
                    onMouseEnter={e => { if (!isTestingZone) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; } }}
                    onMouseLeave={e => { if (!isTestingZone) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; } }}
                >
                    <span style={{ fontSize: '0.85rem', opacity: 0.6, marginRight: '0.25rem', fontWeight: 'bold' }}>{courseData.length}.</span>
                    Testing Zone
                </Link>
                <button
                    onClick={() => setDropdownOpen(prev => !prev)}
                    style={{
                        display: 'flex', alignItems: 'center', padding: '0 0.75rem',
                        background: 'transparent', border: 'none', cursor: 'pointer',
                        color: isTestingZone ? 'var(--accent)' : 'var(--text-secondary)',
                        borderBottom: isTestingZone ? '3px solid var(--accent)' : '3px solid transparent',
                        transition: 'all 0.2s',
                    }}
                >
                    <ChevronDown size={15} style={{ transition: 'transform 0.2s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                </button>

                {dropdownOpen && (
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        minWidth: '200px',
                        background: 'rgba(255,255,255,0.97)',
                        backdropFilter: 'blur(20px)',
                        WebkitBackdropFilter: 'blur(20px)',
                        borderRadius: '0 0 12px 12px',
                        boxShadow: '0 12px 40px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
                        border: '1px solid rgba(0,0,0,0.1)',
                        borderTop: '2px solid var(--accent)',
                        overflow: 'hidden',
                        zIndex: 200,
                        animation: 'dropIn 0.2s ease',
                    }}>
                        <style>{`@keyframes dropIn { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }`}</style>
                        {SUB_TABS.map((sub) => (
                            <button
                                key={sub.key}
                                onClick={() => handleSubTabClick(sub.key)}
                                style={{
                                    display: 'block', width: '100%', padding: '0.75rem 1.25rem',
                                    border: 'none', background: 'transparent', color: '#333',
                                    fontWeight: 500, fontSize: '0.88rem', cursor: 'pointer',
                                    textAlign: 'left', transition: 'all 0.15s ease', fontFamily: 'inherit',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(225, 29, 72, 0.08)'; e.currentTarget.style.color = 'var(--accent)'; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#333'; }}
                            >
                                {sub.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
