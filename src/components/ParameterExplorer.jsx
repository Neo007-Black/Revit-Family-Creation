import { useState } from 'react';

const PARAM_TYPES = [
    { id: 'system', name: 'System', desc: 'Built-in by default in Revit. Cannot be removed, renamed or modified. Example: "Volume" or "Area".', color: 'var(--accent)' },
    { id: 'project', name: 'Project', desc: 'Used to assign new parameters to any category of elements in a specific project. Example: "Phasing Status".', color: '#8b5cf6' },
    { id: 'family', name: 'Family', desc: 'Created inside families to control their specific geometry or data. Example: "Desk Width".', color: 'var(--success)' },
    { id: 'shared', name: 'Shared', desc: 'Saved in a separate text file so they can be shared among multiple families, projects, and tags (crucial for standardized scheduling).', color: 'var(--warning)' },
    { id: 'global', name: 'Global', desc: 'Specific to a project environment to control multiple element parameters at once. Example: "Standard Ceiling Height".', color: '#ec4899' }
];

export function ParameterExplorer() {
    const [activeTab, setActiveTab] = useState('system');
    const [isType, setIsType] = useState(true);

    return (
        <div className="glass-panel" style={{ padding: '0', margin: '3rem 0', overflow: 'hidden' }}>

            {/* Type vs Instance Simulator */}
            <div style={{ padding: '2rem', borderBottom: '1px solid var(--border-card)', background: 'rgba(0,0,0,0.2)' }}>
                <h3 style={{ margin: '0 0 1rem 0', color: '#000', textAlign: 'center' }}>Type vs Instance Simulator</h3>
                <p style={{ textAlign: 'center', color: '#000', marginBottom: '2rem', fontSize: '0.9rem', fontWeight: '500' }}>
                    Toggle the parameter mode to see how changing a value affects multiple elements.
                </p>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
                    <button onClick={() => setIsType(true)} style={{ padding: '0.5rem 1.5rem', background: isType ? 'var(--accent)' : 'rgba(255,255,255,0.8)', color: '#000', border: isType ? 'none' : '1px solid var(--border-card)', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: isType ? '600' : '500' }}>Type Parameter</button>
                    <button onClick={() => setIsType(false)} style={{ padding: '0.5rem 1.5rem', background: !isType ? 'var(--success)' : 'rgba(255,255,255,0.8)', color: '#000', border: !isType ? 'none' : '1px solid var(--border-card)', borderRadius: '20px', cursor: 'pointer', transition: 'all 0.2s', fontWeight: !isType ? '600' : '500' }}>Instance Parameter</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                    <div style={{ width: '80px', height: isType ? '120px' : '120px', background: isType ? 'var(--accent)' : 'var(--success)', borderRadius: '4px', transition: 'all 0.5s', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0.5rem' }}><span style={{ color: '#000', fontWeight: 'bold' }}>AHU 1</span></div>
                    <div style={{ width: '80px', height: isType ? '120px' : '80px', background: isType ? 'var(--accent)' : '#334155', borderRadius: '4px', transition: 'all 0.5s', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0.5rem' }}><span style={{ color: '#000', fontWeight: 'bold' }}>AHU 2</span></div>
                    <div style={{ width: '80px', height: isType ? '120px' : '80px', background: isType ? 'var(--accent)' : '#334155', borderRadius: '4px', transition: 'all 0.5s', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0.5rem' }}><span style={{ color: '#000', fontWeight: 'bold' }}>AHU 3</span></div>
                </div>

                <p style={{ textAlign: 'center', color: '#000', marginTop: '1.5rem', fontSize: '0.95rem', fontWeight: '600' }}>
                    {isType ? "Changing a TYPE parameter applies to ALL elements of that type instantly." : "Changing an INSTANCE parameter only affects the selected individual elements."}
                </p>
            </div>

            {/* The 5 Parameter Categories */}
            <div style={{ padding: '2rem' }}>
                <h3 style={{ margin: '0 0 1.5rem 0', color: '#000', textAlign: 'center' }}>The 5 Parameter Categories</h3>
                <div style={{ display: 'flex', borderBottom: '1px solid var(--border-card)', overflowX: 'auto' }}>
                    {PARAM_TYPES.map(p => (
                        <button
                            key={p.id} onClick={() => setActiveTab(p.id)}
                            style={{ flex: 1, padding: '1rem', background: 'transparent', border: 'none', borderBottom: activeTab === p.id ? `2px solid ${p.color}` : '2px solid transparent', color: activeTab === p.id ? '#000' : '#444', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s', minWidth: '100px' }}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>

                <div style={{ padding: '2rem 1rem', minHeight: '120px' }}>
                    <h4 style={{ color: PARAM_TYPES.find(p => p.id === activeTab).color, marginBottom: '0.5rem', fontSize: '1.25rem' }}>{PARAM_TYPES.find(p => p.id === activeTab).name} Parameters</h4>
                    <p style={{ color: '#000', fontSize: '1.05rem', lineHeight: '1.6', fontWeight: '500' }}>{PARAM_TYPES.find(p => p.id === activeTab).desc}</p>
                </div>
            </div>

        </div>
    );
}
