import { useState } from 'react';
import { Ruler, Maximize, Rotate3d, Info } from 'lucide-react';

export function ReferenceSimulator() {
    const [activeTab, setActiveTab] = useState('plane');
    const [rotation, setRotation] = useState({ x: 15, y: -25 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMouse, setLastMouse] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setLastMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - lastMouse.x;
        const deltaY = e.clientY - lastMouse.y;

        setRotation(prev => ({
            x: Math.max(-80, Math.min(80, prev.x - deltaY * 0.5)),
            y: prev.y + deltaX * 0.5
        }));

        setLastMouse({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', margin: '3rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem' }}>Reference Plane vs Reference Line</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#000', fontWeight: '500' }}>
                    Interactive 3D visualization of the family skeleton. Click and drag to rotate.
                </p>
            </div>

            {/* Toggle Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <button
                    onClick={() => setActiveTab('plane')}
                    className="type-btn"
                    style={{
                        background: activeTab === 'plane' ? 'var(--accent)' : 'transparent',
                        color: activeTab === 'plane' ? '#000' : 'var(--text-secondary)',
                        border: activeTab === 'plane' ? '1px solid var(--accent)' : '1px solid var(--border-card)',
                        padding: '0.75rem 2rem',
                        fontWeight: 'bold',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <Maximize size={18} /> Reference Plane
                </button>
                <button
                    onClick={() => setActiveTab('line')}
                    className="type-btn"
                    style={{
                        background: activeTab === 'line' ? 'var(--success)' : 'transparent',
                        color: activeTab === 'line' ? '#000' : 'var(--text-secondary)',
                        border: activeTab === 'line' ? '1px solid var(--success)' : '1px solid var(--border-card)',
                        padding: '0.75rem 2rem',
                        fontWeight: 'bold',
                        display: 'flex', alignItems: 'center', gap: '0.5rem'
                    }}
                >
                    <Ruler size={18} /> Reference Line
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '2rem', minHeight: '400px' }}>

                {/* Info Panel */}
                <div style={{
                    background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px',
                    border: '1px solid var(--border-card)', display: 'flex', flexDirection: 'column', gap: '1rem'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: activeTab === 'plane' ? 'var(--accent)' : 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem' }}>
                        <Info size={24} />
                        {activeTab === 'plane' ? 'Reference Plane' : 'Reference Line'}
                    </div>

                    {activeTab === 'plane' ? (
                        <>
                            <p style={{ color: '#000', lineHeight: 1.6 }}>A 2-dimensional conceptual surface used to sketch 2D geometry or generate 3D forms.</p>
                            <ul style={{ color: '#000', margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li><strong>Infinite extent:</strong> Although appearing to have physical edges, it extends infinitely in both directions.</li>
                                <li><strong>1 Workplane:</strong> Provides a single 2D face you can set as the active drawing area.</li>
                                <li><strong>Primary purpose:</strong> Aligning edges, defining limits for Extrusions, and capturing the family's Origin Point.</li>
                            </ul>
                        </>
                    ) : (
                        <>
                            <p style={{ color: '#000', lineHeight: 1.6 }}>A 3-dimensional guideline containing its own embedded planes.</p>
                            <ul style={{ color: '#000', margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <li><strong>Fixed length:</strong> Has physical start and end points that can be dimensioned.</li>
                                <li><strong>4 Workplanes:</strong> Automatically hosts two parallel intersecting planes AND two planes at each physical end point perpendicular to the line.</li>
                                <li><strong>Primary purpose:</strong> Creating angular parameter constraints (rotations like door swings).</li>
                            </ul>
                        </>
                    )}
                </div>

                {/* 3D Viewport */}
                <div
                    style={{
                        background: 'var(--bg-dark)', borderRadius: '12px', border: '1px solid var(--border-card)',
                        position: 'relative', overflow: 'hidden', cursor: isDragging ? 'grabbing' : 'grab',
                        perspective: '1000px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                >
                    <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
                        <Rotate3d size={16} /> Drag to Rotate
                    </div>

                    <div style={{
                        width: '300px', height: '300px', position: 'relative', transformStyle: 'preserve-3d',
                        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}>

                        {/* 3D World Axes for context */}
                        <div style={{ position: 'absolute', top: '50%', left: '0', width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', transform: 'translateY(-50%)' }} />
                        <div style={{ position: 'absolute', left: '50%', top: '0', height: '100%', width: '1px', background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%)' }} />
                        <div style={{ position: 'absolute', left: '50%', top: '0', height: '100%', width: '1px', background: 'rgba(255,255,255,0.1)', transform: 'translateX(-50%) rotateY(90deg)' }} />

                        {activeTab === 'plane' && (
                            <div style={{
                                position: 'absolute',
                                top: '10%', left: '10%', width: '80%', height: '80%',
                                background: 'rgba(56, 189, 248, 0.2)',
                                border: '2px dashed var(--accent)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 40px rgba(56, 189, 248, 0.1)'
                            }}>
                                <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>1 Surface</span>
                            </div>
                        )}

                        {activeTab === 'line' && (
                            <div style={{
                                position: 'absolute', top: '50%', left: '10%', width: '80%', height: '4px',
                                background: 'var(--success)', transform: 'translateY(-50%)', transformStyle: 'preserve-3d'
                            }}>
                                {/* The line itself */}
                                <div style={{ position: 'absolute', top: '-20px', left: '50%', transform: 'translateX(-50%)', color: 'var(--success)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>Reference Line</div>

                                {/* Plane 1: Horizontal */}
                                <div style={{
                                    position: 'absolute', top: '50%', left: '0', width: '100%', height: '100px',
                                    background: 'rgba(16, 185, 129, 0.15)', border: '1px dashed var(--success)',
                                    transform: 'translateY(-50%) rotateX(90deg)'
                                }} />

                                {/* Plane 2: Vertical */}
                                <div style={{
                                    position: 'absolute', top: '50%', left: '0', width: '100%', height: '100px',
                                    background: 'rgba(16, 185, 129, 0.15)', border: '1px dashed var(--success)',
                                    transform: 'translateY(-50%) rotateX(0deg)'
                                }} />

                                {/* Plane 3: End 1 perpendicular */}
                                <div style={{
                                    position: 'absolute', top: '50%', left: '0', width: '60px', height: '60px',
                                    background: 'rgba(16, 185, 129, 0.3)', border: '1px solid var(--success)',
                                    transform: 'translateY(-50%) translateX(-30px) rotateY(90deg)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff'
                                }}>End</div>

                                {/* Plane 4: End 2 perpendicular */}
                                <div style={{
                                    position: 'absolute', top: '50%', right: '0', width: '60px', height: '60px',
                                    background: 'rgba(16, 185, 129, 0.3)', border: '1px solid var(--success)',
                                    transform: 'translateY(-50%) translateX(30px) rotateY(90deg)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#fff'
                                }}>End</div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div >
    );
}
