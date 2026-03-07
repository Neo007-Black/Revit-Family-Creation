import { useState } from 'react';
import { Database, Box as BoxIcon, FileJson } from 'lucide-react';

export function FamilyConceptSimulator() {
    const [width, setWidth] = useState(150);
    const [height, setHeight] = useState(100);
    const [depth, setDepth] = useState(150);

    const [activeTab, setActiveTab] = useState('geometry');

    // Used to freeze geometry when on 'geometry' tab
    const displayW = activeTab === 'geometry' ? 150 : width;
    const displayH = activeTab === 'geometry' ? 100 : height;
    const displayD = activeTab === 'geometry' ? 150 : depth;

    return (
        <div className="glass-panel" style={{ padding: '0', margin: '3rem 0', overflow: 'hidden' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid var(--border-card)', background: 'rgba(0,0,0,0.2)' }}>
                <button
                    onClick={() => setActiveTab('geometry')}
                    style={{ flex: 1, padding: '1rem', background: activeTab === 'geometry' ? 'rgba(244, 63, 94, 0.1)' : 'transparent', border: 'none', borderBottom: activeTab === 'geometry' ? '3px solid #f43f5e' : '3px solid transparent', color: '#000', cursor: 'pointer', fontWeight: activeTab === 'geometry' ? '600' : '400', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                >
                    <BoxIcon size={18} /> 1. Geometry
                </button>
                <button
                    onClick={() => setActiveTab('parameters')}
                    style={{ flex: 1, padding: '1rem', background: activeTab === 'parameters' ? 'rgba(16, 185, 129, 0.1)' : 'transparent', border: 'none', borderBottom: activeTab === 'parameters' ? '3px solid #10b981' : '3px solid transparent', color: '#000', cursor: 'pointer', fontWeight: activeTab === 'parameters' ? '600' : '400', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                >
                    <Database size={18} /> 2. Parameters
                </button>
                <button
                    onClick={() => setActiveTab('family')}
                    style={{ flex: 1, padding: '1rem', background: activeTab === 'family' ? 'rgba(139, 92, 246, 0.1)' : 'transparent', border: 'none', borderBottom: activeTab === 'family' ? '3px solid #8b5cf6' : '3px solid transparent', color: '#000', cursor: 'pointer', fontWeight: activeTab === 'family' ? '600' : '400', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                >
                    <FileJson size={18} /> 3. The Family
                </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', padding: '2.5rem' }}>

                <div style={{ textAlign: 'center' }}>
                    <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                        {activeTab === 'geometry' && "Step 1: The 3D Shape"}
                        {activeTab === 'parameters' && "Step 2: The Data"}
                        {activeTab === 'family' && "Step 3: Geometry + Data = Family!"}
                    </h3>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        {activeTab === 'geometry' && "By itself, geometry is just a dumb, static box holding no information."}
                        {activeTab === 'parameters' && "By themselves, parameters are just an empty database table waiting for values."}
                        {activeTab === 'family' && "When you link parameters directly to 3D geometry constraints, you create an intelligent, flexible, and parametric Revit Family."}
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: '2rem', background: 'var(--bg-dark)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--border-card)' }}>

                    {/* Controls / Information */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>

                        {activeTab === 'geometry' && (
                            <div className="animate-fade-in" style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid #f43f5e', borderRadius: '8px', padding: '1.5rem', opacity: 0.7, pointerEvents: 'none' }}>
                                <div style={{ color: '#000', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Properties Locked</div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}><span style={{ color: 'var(--text-secondary)' }}>Width (x):</span> <span style={{ color: '#000' }}>150 mm</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem' }}><span style={{ color: 'var(--text-secondary)' }}>Height (y):</span> <span style={{ color: '#000' }}>100 mm</span></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}><span style={{ color: 'var(--text-secondary)' }}>Depth (z):</span> <span style={{ color: '#000' }}>150 mm</span></div>
                            </div>
                        )}

                        {activeTab === 'parameters' && (
                            <div className="animate-fade-in" style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid #10b981', borderRadius: '8px', padding: '1.5rem' }}>
                                <div style={{ color: '#000', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Family Parameters</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <label style={{ display: 'flex', justifyContent: 'space-between', color: '#000', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Width (mm)</span>
                                        <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} style={{ width: '100px', background: 'var(--bg-dark)', color: '#000', border: '1px solid var(--border-card)', padding: '0.5rem', borderRadius: '4px', fontSize: '1.1rem' }} />
                                    </label>
                                    <label style={{ display: 'flex', justifyContent: 'space-between', color: '#000', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Height (mm)</span>
                                        <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} style={{ width: '100px', background: 'var(--bg-dark)', color: '#000', border: '1px solid var(--border-card)', padding: '0.5rem', borderRadius: '4px', fontSize: '1.1rem' }} />
                                    </label>
                                    <label style={{ display: 'flex', justifyContent: 'space-between', color: '#000', alignItems: 'center' }}>
                                        <span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>Depth (mm)</span>
                                        <input type="number" value={depth} onChange={e => setDepth(Number(e.target.value))} style={{ width: '100px', background: 'var(--bg-dark)', color: '#000', border: '1px solid var(--border-card)', padding: '0.5rem', borderRadius: '4px', fontSize: '1.1rem' }} />
                                    </label>
                                </div>
                            </div>
                        )}

                        {activeTab === 'family' && (
                            <div className="animate-fade-in" style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid #8b5cf6', borderRadius: '8px', padding: '1.5rem' }}>
                                <div style={{ color: '#000', fontWeight: 'bold', marginBottom: '1.5rem', fontSize: '1.2rem' }}>Predefined Family Types</div>

                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                                    <button onClick={() => { setWidth(150); setHeight(100); setDepth(150); }} style={{ flex: 1, padding: '0.75rem', background: width === 150 ? '#8b5cf6' : 'var(--bg-dark)', color: '#000', border: width === 150 ? 'none' : '1px solid var(--border-card)', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s' }}>Type 1</button>
                                    <button onClick={() => { setWidth(250); setHeight(150); setDepth(100); }} style={{ flex: 1, padding: '0.75rem', background: width === 250 ? '#8b5cf6' : 'var(--bg-dark)', color: '#000', border: width === 250 ? 'none' : '1px solid var(--border-card)', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s' }}>Type 2</button>
                                    <button onClick={() => { setWidth(80); setHeight(300); setDepth(80); }} style={{ flex: 1, padding: '0.75rem', background: width === 80 ? '#8b5cf6' : 'var(--bg-dark)', color: '#000', border: width === 80 ? 'none' : '1px solid var(--border-card)', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', transition: 'all 0.2s' }}>Type 3</button>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', fontSize: '1.1rem' }}><span style={{ color: 'var(--text-secondary)' }}>Width =</span> <span style={{ color: '#000', fontWeight: 'bold' }}>{width} mm</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.5rem', fontSize: '1.1rem' }}><span style={{ color: 'var(--text-secondary)' }}>Height =</span> <span style={{ color: '#000', fontWeight: 'bold' }}>{height} mm</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem' }}><span style={{ color: 'var(--text-secondary)' }}>Depth =</span> <span style={{ color: '#000', fontWeight: 'bold' }}>{depth} mm</span></div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* CSS 3D Viewport */}
                    <div style={{ height: '350px', background: '#0a0c10', borderRadius: '8px', border: '1px solid var(--border-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1200px', overflow: 'hidden', position: 'relative' }}>

                        {activeTab === 'parameters' && (
                            <div className="animate-fade-in" style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--warning)', padding: '2rem', textAlign: 'center', border: '2px dashed var(--warning)', borderRadius: '8px', flexDirection: 'column', gap: '1rem', fontSize: '1.1rem' }}>
                                <Database size={32} />
                                Parameters control nothing until they are directly assigned to 3D geometry!
                            </div>
                        )}

                        <div style={{
                            position: 'relative',
                            width: '0', height: '0',
                            transformStyle: 'preserve-3d',
                            transform: 'rotateX(-20deg) rotateY(45deg)',
                            transition: 'transform 0.5s ease'
                        }}>
                            <style>{`
                            .cube-face {
                                position: absolute;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-size: 0.9rem;
                                color: rgba(255,255,255,0.9);
                                font-weight: bold;
                                transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
                                border: 2px solid ${activeTab === 'family' ? '#8b5cf6' : '#f43f5e'};
                                background: ${activeTab === 'family' ? 'rgba(139, 92, 246, 0.2)' : 'rgba(244, 63, 94, 0.2)'};
                                box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
                            }
                            
                            /* Front (XY plane, translated +Z) */
                            .face-front { width: ${displayW}px; height: ${displayH}px; transform: translate3d(-${displayW / 2}px, -${displayH / 2}px, ${displayD / 2}px); }
                            /* Back (XY plane, translated -Z) */
                            .face-back { width: ${displayW}px; height: ${displayH}px; transform: translate3d(-${displayW / 2}px, -${displayH / 2}px, -${displayD / 2}px) rotateY(180deg); }
                            
                            /* Right (YZ plane, translated +X) */
                            .face-right { width: ${displayD}px; height: ${displayH}px; transform: translate3d(calc(${displayW / 2}px - ${displayD / 2}px), -${displayH / 2}px, 0) rotateY(90deg); }
                            /* Left (YZ plane, translated -X) */
                            .face-left { width: ${displayD}px; height: ${displayH}px; transform: translate3d(calc(-${displayW / 2}px - ${displayD / 2}px), -${displayH / 2}px, 0) rotateY(-90deg); }
                            
                            /* Top (XZ plane, translated -Y) */
                            .face-top { width: ${displayW}px; height: ${displayD}px; transform: translate3d(-${displayW / 2}px, calc(-${displayH / 2}px - ${displayD / 2}px), 0) rotateX(90deg); }
                            /* Bottom (XZ plane, translated +Y) */
                            .face-bottom { width: ${displayW}px; height: ${displayD}px; transform: translate3d(-${displayW / 2}px, calc(${displayH / 2}px - ${displayD / 2}px), 0) rotateX(-90deg); }
                        `}</style>

                            {/* Cube Faces */}
                            <div className="cube-face face-front">{displayW} x {displayH}</div>
                            <div className="cube-face face-back"></div>
                            <div className="cube-face face-right"></div>
                            <div className="cube-face face-left"></div>
                            <div className="cube-face face-top"></div>
                            <div className="cube-face face-bottom"></div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
