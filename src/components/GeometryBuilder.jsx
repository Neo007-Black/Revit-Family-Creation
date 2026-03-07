import { useState } from 'react';
import { Box, Circle, Columns, Scaling, PlusSquare } from 'lucide-react';

const FORMS = [
  { id: 'extrusion', name: 'Extrusion', icon: <Box size={22} />, color: '#f43f5e', desc: 'Pushes a 2D profile in one direction (straight up/down/sideways) to create a solid.' },
  { id: 'blend', name: 'Blend', icon: <Columns size={22} />, color: '#ec4899', desc: 'Links two different profiles together (e.g. a square base blending into a circular top).' },
  { id: 'revolve', name: 'Revolve', icon: <Circle size={22} />, color: '#f59e0b', desc: 'Rotates a 2D profile around a central axis to create cylindrical or spherical shapes.' },
  { id: 'sweep', name: 'Sweep', icon: <Scaling size={22} />, color: '#10b981', desc: 'Extends a single 2D profile along a drawn path (straight or curved).' },
  { id: 'swept_blend', name: 'Swept Blend', icon: <PlusSquare size={22} />, color: '#8b5cf6', desc: 'Connects two different profiles drawn at the ends of a single path.' }
];

const LAYERS = 50;

// Persist rotation across mount/unmount so it doesn't reset on tab switch
let savedRotation = { x: -20, y: -30 };

export function GeometryBuilder() {
  const [activeForm, setActiveForm] = useState('extrusion');
  const [animating, setAnimating] = useState(false);
  const [rotation, setRotation] = useState(savedRotation);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const activeData = FORMS.find(f => f.id === activeForm);

  const simulate = () => { setAnimating(false); setTimeout(() => setAnimating(true), 50); };

  const handleMouseDown = (e) => { setIsDragging(true); setStartPos({ x: e.clientX, y: e.clientY }); };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const newRot = { x: rotation.x - (e.clientY - startPos.y) * 0.5, y: rotation.y + (e.clientX - startPos.x) * 0.5 };
    setRotation(newRot);
    savedRotation = newRot;
    setStartPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => setIsDragging(false);

  return (
    <div className="glass-panel" style={{ padding: '2rem', margin: '3rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem' }}>Geometry Forms Builder</h3>
        <p style={{ margin: '0.5rem 0 0', fontSize: '1rem', color: '#000', fontWeight: 500 }}>Select a tool to see how Revit generates 3D geometry</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: 'rgba(0,0,0,0.06)', borderRadius: '12px 12px 0 0', borderBottom: `2px solid ${activeData.color}`, overflow: 'hidden' }}>
        {FORMS.map(f => (
          <button key={f.id} onClick={() => { setActiveForm(f.id); setAnimating(false); }}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
              padding: '1rem 0.5rem', border: 'none', cursor: 'pointer', transition: 'all 0.2s',
              background: activeForm === f.id ? `${f.color}18` : 'transparent',
              borderBottom: activeForm === f.id ? `3px solid ${f.color}` : '3px solid transparent',
              color: '#000', fontWeight: activeForm === f.id ? 700 : 400, fontSize: '0.88rem',
            }}>
            <span style={{ color: activeForm === f.id ? f.color : 'inherit' }}>{f.icon}</span>
            {f.name}
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '0 0 12px 12px', padding: '2rem', border: `1px solid rgba(0,0,0,0.08)`, borderTop: 'none' }}>

        {/* Description + button */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 1.5rem' }}>
          <h4 style={{ color: activeData.color, margin: '0 0 0.5rem', fontSize: '1.2rem' }}>{activeData.name}</h4>
          <p style={{ color: '#000', margin: '0 0 1rem', fontSize: '0.95rem', lineHeight: 1.6, fontWeight: 500 }}>{activeData.desc}</p>
          <button onClick={simulate} style={{
            background: activeData.color, color: '#fff', border: 'none',
            padding: '0.85rem 2rem', borderRadius: '10px', fontWeight: 700,
            cursor: 'pointer', fontSize: '0.95rem', width: '100%', letterSpacing: '0.02em',
            boxShadow: `0 4px 14px ${activeData.color}44`,
            transition: 'transform 0.2s, box-shadow 0.2s',
          }}
            onMouseEnter={e => { e.target.style.transform = 'translateY(-1px)'; e.target.style.boxShadow = `0 6px 20px ${activeData.color}66`; }}
            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = `0 4px 14px ${activeData.color}44`; }}
          >
            ▶  Simulate Geometry Creation
          </button>
        </div>

        {/* 3D viewport — much bigger */}
        <div
          style={{
            height: '520px', background: 'linear-gradient(180deg, #0c0e14 0%, #141822 100%)',
            borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)',
            position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
            perspective: '1400px', overflow: 'hidden',
            cursor: isDragging ? 'grabbing' : 'grab',
          }}
          onMouseDown={handleMouseDown} onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
        >
          {/* Corner label */}
          <div style={{ position: 'absolute', top: 14, left: 16, color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', pointerEvents: 'none', fontWeight: 500 }}>
            🖱️ Drag to rotate
          </div>

          {/* Grid floor hint */}
          <div style={{
            position: 'absolute', width: '400px', height: '400px',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateX(90deg) translateZ(-100px)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.5s ease',
            pointerEvents: 'none',
          }} />

          <style>{`
            .sim-profile {
              position: absolute;
              border: 2.5px dashed ${activeData.color};
              opacity: 0.7;
              transition: ${animating ? 'all 1.8s cubic-bezier(0.22, 1, 0.36, 1)' : 'none'};
            }
            .sim-layer {
              position: absolute;
              background: ${activeData.color};
              filter: brightness(calc(1 - (var(--lf) * 0.35)));
              border: 1px solid rgba(0,0,0,0.12);
              transition: ${animating ? 'all 1.8s cubic-bezier(0.22, 1, 0.36, 1)' : 'none'};
              opacity: 0;
            }

            /* ── EXTRUSION ── */
            .anim-extrusion .profile-1 { width: 150px; height: 150px; transform: rotateX(60deg) rotateZ(45deg) translateZ(0); }
            .anim-extrusion .sim-layer { width: 150px; height: 150px; transform: rotateX(60deg) rotateZ(45deg) translateZ(0); }
            .anim-extrusion.active .sim-layer { opacity: 1; transform: rotateX(60deg) rotateZ(45deg) translateZ(calc(var(--lf) * 160px)); }

            /* ── BLEND ── */
            .anim-blend .profile-1 { width: 170px; height: 170px; transform: rotateX(60deg) rotateZ(45deg) translateZ(-70px); }
            .anim-blend .profile-2 { width: 80px; height: 80px; border-radius: 50%; transform: rotateX(60deg) rotateZ(45deg) translateZ(70px); }
            .anim-blend .sim-layer {
              width: calc(170px - (var(--lf) * 90px)); height: calc(170px - (var(--lf) * 90px));
              border-radius: calc(var(--lf) * 50%);
              transform: rotateX(60deg) rotateZ(45deg) translateZ(-70px);
            }
            .anim-blend.active .sim-layer {
              opacity: 1;
              transform: rotateX(60deg) rotateZ(45deg) translateZ(calc(-70px + (var(--lf) * 140px)));
            }

            /* ── REVOLVE ── */
            .anim-revolve .profile-1 { width: 55px; height: 120px; left: 50%; transform: translateX(25px); transform-origin: -25px center; }
            .anim-revolve .axis { position: absolute; height: 220px; width: 2px; background: rgba(255,255,255,0.4); border-style: dashed; left: 50%; }
            .anim-revolve .sim-layer {
              width: 55px; height: 120px; left: 50%; transform: translateX(25px); transform-origin: -25px center;
            }
            .anim-revolve.active .sim-layer {
              opacity: 1; transform: translateX(25px) rotateY(calc(var(--lf) * 360deg));
            }

            /* ── SWEEP ── */
            .anim-sweep .path { position: absolute; width: 220px; height: 2px; background: rgba(255,255,255,0.4); border-style: dashed; }
            .anim-sweep .profile-1 { width: 60px; height: 60px; border-radius: 50%; transform: translateX(-110px) rotateY(90deg); }
            .anim-sweep .sim-layer { width: 60px; height: 60px; border-radius: 50%; transform: translateX(-110px) rotateY(90deg); }
            .anim-sweep.active .sim-layer {
              opacity: 1; transform: translateX(calc(-110px + var(--lf) * 220px)) rotateY(90deg);
            }

            /* ── SWEPT BLEND ── */
            .anim-swept_blend .path { position: absolute; width: 220px; height: 2px; background: rgba(255,255,255,0.4); border-style: dashed; }
            .anim-swept_blend .profile-1 { width: 90px; height: 90px; transform: translateX(-110px) rotateY(90deg); }
            .anim-swept_blend .profile-2 { width: 40px; height: 40px; border-radius: 50%; transform: translateX(110px) rotateY(90deg); }
            .anim-swept_blend .sim-layer {
              width: calc(90px - var(--lf) * 50px); height: calc(90px - var(--lf) * 50px);
              border-radius: calc(var(--lf) * 50%);
              transform: translateX(-110px) rotateY(90deg);
            }
            .anim-swept_blend.active .sim-layer {
              opacity: 1; transform: translateX(calc(-110px + var(--lf) * 220px)) rotateY(90deg);
            }
          `}</style>

          <div className={`anim-${activeForm} ${animating ? 'active' : ''}`} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100%', transformStyle: 'preserve-3d',
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? 'none' : 'transform 0.5s ease',
          }}>
            {activeForm === 'revolve' && <div className="axis" />}
            {(activeForm === 'sweep' || activeForm === 'swept_blend') && <div className="path" />}

            <div className="sim-profile profile-1" />
            {['blend', 'swept_blend'].includes(activeForm) && <div className="sim-profile profile-2" />}

            {Array.from({ length: LAYERS }).map((_, i) => (
              <div key={i} className="sim-layer" style={{ '--lf': i / (LAYERS - 1), zIndex: i }} />
            ))}
          </div>
        </div>

        {/* Note */}
        <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: 'rgba(0,0,0,0.03)', borderRadius: '10px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#444', lineHeight: 1.6 }}>
            <strong style={{ color: '#000' }}>Note on Voids:</strong> Void forms use exactly the same 5 methods shown here, but they must intersect solid forms to create a subtracted area.
          </p>
        </div>
      </div>
    </div>
  );
}
