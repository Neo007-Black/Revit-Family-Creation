import { useState } from 'react';

const TABS = [
    {
        id: 'system',
        label: 'System Families',
        color: '#3ac5d8',
        activeColor: '#00ffe5',
        icon: '🏗️',
        content: {
            intro: 'System families create basic elements that you would assemble on a construction site.',
            examples: ['Walls, roofs, floors', 'Ducts, pipes'],
            examplesLabel: 'Examples',
            notes: [
                'System settings, which affect the project environment and include types for levels, grids, drawing sheets, and viewports, are also system families.',
                'System families are predefined in Revit. You do not load them into your projects from external files, nor do you save them in locations external to the project.',
            ],
        },
    },
    {
        id: 'loadable',
        label: 'Loadable Families',
        color: '#3aaed6',
        activeColor: '#00ffe5',
        icon: '📦',
        content: {
            intro: 'Loadable families are families used to create the following:',
            examples: [
                'Building components that would usually be purchased, delivered, and installed in and around a building, such as windows, doors, casework, fixtures, furniture, and planting',
                'System components that would usually be purchased, delivered, and installed in and around a building, such as boilers, water heaters, air handlers, and plumbing fixtures',
                'Some annotation elements that are routinely customized, such as symbols and title blocks',
            ],
            examplesLabel: 'Includes',
            notes: [
                'Because of their highly customizable nature, loadable families are the families that you most commonly create and modify in Revit.',
                'Unlike system families, loadable families are created in external RFA files and imported, or loaded, in your projects. For loadable families that contain many types, you can create and use type catalogs, which allow you to load only the types that you need for a project.',
            ],
        },
    },
    {
        id: 'inplace',
        label: 'In-Place Families',
        color: '#2d86ca',
        activeColor: '#00ffe5',
        icon: '🔧',
        content: {
            intro: 'In-place elements are unique elements that you create when you need to create a unique component that is specific to the current project.',
            examples: [
                'You can create in-place geometry so that it references other project geometry, resizing or adjusting accordingly if the referenced geometry changes.',
                'When you create an in-place element, Revit creates a family for the in-place element, which contains a single family type.',
            ],
            examplesLabel: 'Key Points',
            notes: [
                'Creating an in-place element involves many of the same Family Editor tools as creating a loadable family.',
            ],
        },
    },
];

export function FamilyTypeTabs() {
    const [active, setActive] = useState('system');
    const tab = TABS.find(t => t.id === active);

    return (
        <div style={{ margin: '2rem 0', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
            {/* Tab buttons */}
            <div style={{ display: 'flex', gap: '0', borderRadius: '16px 16px 0 0', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
                {TABS.map((t, i) => {
                    const isActive = t.id === active;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setActive(t.id)}
                            style={{
                                flex: 1,
                                padding: '0.9rem 1rem',
                                border: 'none',
                                borderRight: i < TABS.length - 1 ? '1px solid rgba(255,255,255,0.2)' : 'none',
                                cursor: 'pointer',
                                fontWeight: isActive ? '800' : '600',
                                fontSize: '0.88rem',
                                transition: 'all 0.25s ease',
                                background: isActive
                                    ? `linear-gradient(135deg, ${t.color}, #1e3a5f)`
                                    : 'rgba(20, 40, 70, 0.85)',
                                color: isActive ? '#00ffe5' : 'rgba(180,210,240,0.7)',
                                boxShadow: isActive ? 'inset 0 -3px 0 #00ffe5' : 'none',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem',
                            }}
                        >
                            <span style={{ fontSize: '1.1rem' }}>{t.icon}</span>
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab content */}
            <div
                key={active}
                style={{
                    background: 'linear-gradient(140deg, #172840 0%, #0d1c2e 100%)',
                    borderRadius: '0 0 16px 16px',
                    padding: '2rem 2.5rem',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderTop: `3px solid ${tab.color}`,
                    animation: 'fadeIn 0.25s ease',
                }}
            >
                {/* Intro */}
                <p style={{ color: 'rgba(200,230,255,0.9)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
                    {tab.content.intro}
                </p>

                {/* Examples/Key Points */}
                <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{
                        display: 'inline-block',
                        background: tab.color,
                        color: '#000',
                        fontWeight: '800',
                        fontSize: '0.75rem',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '99px',
                        marginBottom: '0.75rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                    }}>
                        {tab.content.examplesLabel}
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                        {tab.content.examples.map((ex, i) => (
                            <li key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                <span style={{ color: tab.color, fontWeight: '900', fontSize: '1.1rem', marginTop: '1px', flexShrink: 0 }}>•</span>
                                <span style={{ color: 'rgba(200,230,255,0.85)', fontSize: '0.95rem', lineHeight: '1.6' }}>{ex}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Notes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.25rem' }}>
                    {tab.content.notes.map((note, i) => (
                        <p key={i} style={{ color: 'rgba(160,200,240,0.75)', fontSize: '0.92rem', lineHeight: '1.65', margin: 0 }}>
                            {note}
                        </p>
                    ))}
                </div>
            </div>

            <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        </div>
    );
}
