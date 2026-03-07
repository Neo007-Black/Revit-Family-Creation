import { useState } from 'react';
import { Box, Home, ArrowDownToLine, MonitorUp, MousePointerClick } from 'lucide-react';

const TEMPLATES = [
    {
        id: 'standalone',
        name: 'Standalone',
        icon: <Box size={24} />,
        file: 'Metric Generic Model.rft',
        desc: 'Can be placed anywhere in the 3D space. It does not require a host element (like a wall or ceiling) to exist.',
        color: '#f43f5e'
    },
    {
        id: 'wall',
        name: 'Wall Based',
        icon: <MonitorUp size={24} style={{ transform: 'rotate(-90deg)' }} />,
        file: 'Metric Generic Model wall based.rft',
        desc: 'Must be placed on a vertical wall. If the wall is deleted, the family is automatically deleted with it.',
        color: '#f59e0b'
    },
    {
        id: 'ceiling',
        name: 'Ceiling Based',
        icon: <ArrowDownToLine size={24} />,
        file: 'Metric Generic Model ceiling based.rft',
        desc: 'Must be placed on a ceiling. Ideal for items like Lighting Fixtures and Air Terminals.',
        color: '#8b5cf6'
    },
    {
        id: 'face',
        name: 'Face Based',
        icon: <MousePointerClick size={24} />,
        file: 'Metric Generic Model face based.rft',
        desc: 'Extremely versatile. Can snap to ANY face (Floor, Wall, Ceiling, or even other families). Highly recommended for MEP.',
        color: '#10b981'
    }
];

export function TemplateSelector() {
    const [activeHost, setActiveHost] = useState('standalone');
    const activeData = TEMPLATES.find(t => t.id === activeHost);

    return (
        <div className="glass-panel" style={{ padding: '0', margin: '3rem 0', overflow: 'hidden' }}>

            <div style={{ textAlign: 'center', padding: '2rem 2rem 1rem 2rem' }}>
                <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Home size={28} color="var(--accent)" /> Template Hosting Physics</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#000', fontWeight: '500' }}>Select a template type to see how it "Hosts" to building elements.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0', background: 'var(--bg-dark)', borderTop: '1px solid var(--border-card)' }}>

                {/* Left Pane: Selection Menu */}
                <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid var(--border-card)' }}>
                    {TEMPLATES.map((template) => (
                        <button
                            key={template.id}
                            onClick={() => setActiveHost(template.id)}
                            style={{
                                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem',
                                padding: '1.5rem',
                                color: activeHost === template.id ? '#000' : '#444',
                                border: activeHost === template.id ? `2px solid ${template.color}` : '2px solid transparent',
                                background: activeHost === template.id ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.5)',
                                cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: activeHost === template.id ? '700' : '500', fontSize: '1.1rem', color: activeHost === template.id ? template.color : 'inherit' }}>
                                {template.icon}
                                {template.name}
                            </div>
                            <div style={{ fontSize: '0.85rem', fontFamily: 'monospace', opacity: activeHost === template.id ? 1 : 0.6, marginTop: '0.25rem' }}>
                                {template.file}
                            </div>
                        </button>
                    ))}

                    <div style={{ padding: '1.5rem', fontSize: '0.9rem', color: activeData.color, background: 'rgba(255,255,255,0.7)', flex: 1, display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
                        {activeData.desc}
                    </div>
                </div>

                {/* Right Pane: CSS 3D Room Physics Simulator */}
                <div style={{ height: '500px', background: '#0a0c10', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: '1000px', overflow: 'hidden' }}>

                    <style>{`
                        .room-env {
                            position: relative;
                            width: 300px; height: 300px;
                            transform-style: preserve-3d;
                            transform: rotateX(-15deg) rotateY(-40deg);
                            transition: transform 0.5s ease;
                        }

                        /* Architectural Elements */
                        .room-floor {
                            position: absolute; width: 300px; height: 300px;
                            background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.2);
                            transform: rotateX(90deg) translateZ(-150px);
                            box-shadow: inset 0 0 50px rgba(0,0,0,0.8);
                        }
                        .room-ceiling {
                            position: absolute; width: 300px; height: 300px;
                            background: rgba(255,255,255,0.02); border: 2px dashed rgba(255,255,255,0.1);
                            transform: rotateX(90deg) translateZ(150px);
                        }
                        .room-wall-left {
                            position: absolute; width: 300px; height: 300px;
                            background: rgba(255,255,255,0.08); border: 2px solid rgba(255,255,255,0.2);
                            transform: rotateY(90deg) translateZ(-150px);
                        }

                        /* The Simulated MEP Element */
                        .mep-element {
                            position: absolute; width: 60px; height: 60px;
                            background: ${activeData.color}88; border: 2px solid ${activeData.color};
                            box-shadow: 0 0 20px ${activeData.color}44;
                            transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
                            display: flex; align-items: center; justify-content: center;
                            color: #000; font-weight: bold; font-size: 0.8rem; text-align: center;
                        }

                        /* Hosting Physics States */
                        .host-state-standalone .mep-element {
                            /* Floats in the middle of the room */
                            transform: translate3d(120px, 120px, 120px) rotateX(0deg) rotateY(0deg);
                        }
                        
                        .host-state-wall .mep-element {
                            /* Snaps to left wall */
                            transform: translate3d(-30px, 120px, -70px) rotateY(90deg);
                        }

                        .host-state-ceiling .mep-element {
                            /* Snaps to ceiling */
                            transform: translate3d(120px, -30px, -70px) rotateX(90deg);
                        }
                        
                        .host-state-face .mep-element {
                            /* Animated scanning of all faces */
                            animation: face-scan 6s infinite ease-in-out;
                        }

                        @keyframes face-scan {
                            0% { transform: translate3d(120px, 270px, -70px) rotateX(90deg); } /* Floor */
                            25% { transform: translate3d(120px, 270px, -70px) rotateX(90deg); } 
                            
                            30% { transform: translate3d(-30px, 120px, -70px) rotateY(90deg); } /* Wall */
                            55% { transform: translate3d(-30px, 120px, -70px) rotateY(90deg); } 
                            
                            60% { transform: translate3d(120px, -30px, -70px) rotateX(-90deg); } /* Ceiling */
                            85% { transform: translate3d(120px, -30px, -70px) rotateX(-90deg); } 
                            
                            100% { transform: translate3d(120px, 270px, -70px) rotateX(90deg); } /* Back to Floor */
                        }

                    `}</style>

                    <div className={`room-env host-state-${activeHost}`}>

                        <div className="room-floor" />
                        <div className="room-ceiling" />
                        <div className="room-wall-left" />

                        <div className="mep-element">
                            {activeHost === 'standalone' && 'Free'}
                            {activeHost === 'wall' && 'Wall'}
                            {activeHost === 'ceiling' && 'Ceiling'}
                            {activeHost === 'face' && 'Face'}
                        </div>

                    </div>

                    <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(255,255,255,0.8)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.85rem', color: '#000', border: '1px solid var(--border-card)', fontWeight: '600' }}>
                        3D Room Perspective
                    </div>
                </div>

            </div>
        </div>
    );
}
