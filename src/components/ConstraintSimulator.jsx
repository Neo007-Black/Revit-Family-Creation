import { useState, useEffect } from 'react';
import { Lock, Unlock, MousePointer2 } from 'lucide-react';

export function ConstraintSimulator() {
    const [activeTab, setActiveTab] = useState('eq');

    // EQ States
    const [eqStep, setEqStep] = useState(0);
    const [eqWidth, setEqWidth] = useState(240); // Total width center-to-center

    // Lock States 
    const [lockStep, setLockStep] = useState(0);
    const [lockOffset, setLockOffset] = useState(0); // Offset for the moving group

    // EQ Sequence State Machine
    useEffect(() => {
        if (eqStep === 0) { setEqWidth(240); return; }
        let timer;
        if (eqStep === 1) timer = setTimeout(() => setEqStep(2), 800);
        else if (eqStep === 2) timer = setTimeout(() => setEqStep(3), 800);
        else if (eqStep === 3) timer = setTimeout(() => setEqStep(4), 1500);
        else if (eqStep === 4) timer = setTimeout(() => setEqStep(5), 1500);
        else if (eqStep === 5) timer = setTimeout(() => setEqStep(6), 1000);
        else if (eqStep === 6) {
            let width = 240, dir = 1;
            const interval = setInterval(() => {
                width += dir * 2;
                if (width >= 320) dir = -1;
                if (width <= 160) dir = 1;
                setEqWidth(width);
            }, 30);
            return () => clearInterval(interval);
        }
        return () => clearTimeout(timer);
    }, [eqStep]);

    // Lock Sequence State Machine
    useEffect(() => {
        if (lockStep === 0) { setLockOffset(0); return; }
        let timer;
        if (lockStep === 1) timer = setTimeout(() => setLockStep(2), 1000);
        else if (lockStep === 2) timer = setTimeout(() => setLockStep(3), 1500);
        else if (lockStep === 3) timer = setTimeout(() => setLockStep(4), 1500);
        else if (lockStep === 4) timer = setTimeout(() => setLockStep(5), 1000);
        else if (lockStep === 5) {
            let offset = 0, dir = 1;
            const interval = setInterval(() => {
                offset += dir * 2;
                if (offset >= 60) dir = -1;
                if (offset <= -60) dir = 1;
                setLockOffset(offset);
            }, 30);
            return () => clearInterval(interval);
        }
        return () => clearTimeout(timer);
    }, [lockStep]);

    return (
        <div className="glass-panel" style={{ padding: '2rem', margin: '3rem 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem' }}>Constraints Animation Simulator</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', color: 'var(--text-secondary)' }}>Visualize the step-by-step process of adding constraints.</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <button
                    onClick={() => { setActiveTab('eq'); setLockStep(0); }}
                    className="type-btn"
                    style={{
                        background: activeTab === 'eq' ? 'var(--accent)' : 'transparent', color: activeTab === 'eq' ? '#000' : 'var(--text-secondary)',
                        border: activeTab === 'eq' ? '1px solid var(--accent)' : '1px solid var(--border-card)', padding: '0.75rem 2rem', fontWeight: 'bold', transition: 'all 0.3s'
                    }}
                > Equality Constraints (EQ) </button>
                <button
                    onClick={() => { setActiveTab('lock'); setEqStep(0); }}
                    className="type-btn"
                    style={{
                        background: activeTab === 'lock' ? 'var(--warning)' : 'transparent', color: activeTab === 'lock' ? '#000' : 'var(--text-secondary)',
                        border: activeTab === 'lock' ? '1px solid var(--warning)' : '1px solid var(--border-card)', padding: '0.75rem 2rem', fontWeight: 'bold', transition: 'all 0.3s'
                    }}
                > Locking Dimensions </button>
            </div>

            {/* Viewport */}
            <div style={{ height: '250px', background: 'var(--bg-dark)', borderRadius: '12px', position: 'relative', overflow: 'hidden', border: '1px solid var(--border-card)' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '15px 15px', backgroundPosition: 'center' }} />

                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '0' }}>
                    {/* --- EQ VISUALS --- */}
                    {activeTab === 'eq' && (
                        <>
                            {/* Left Wall */}
                            <div style={{ position: 'absolute', left: `${-eqWidth / 2 - 10}px`, top: '25px', bottom: '25px', width: '20px', background: 'rgba(225, 29, 72, 0.2)', border: '2px solid var(--accent)', transition: 'left 0.05s linear' }} />
                            {/* Middle Wall */}
                            <div style={{ position: 'absolute', left: '-10px', top: '25px', bottom: '25px', width: '20px', background: 'rgba(16, 185, 129, 0.2)', border: '2px solid var(--success)' }} />
                            {/* Right Wall */}
                            <div style={{ position: 'absolute', left: `${eqWidth / 2 - 10}px`, top: '25px', bottom: '25px', width: '20px', background: 'rgba(225, 29, 72, 0.2)', border: '2px solid var(--accent)', transition: 'left 0.05s linear' }} />

                            {eqStep >= 1 && (
                                <div className="animate-fade-in">
                                    {/* Line Left to Mid */}
                                    <div style={{ position: 'absolute', top: '125px', left: `${-eqWidth / 2}px`, width: `${eqWidth / 2}px`, height: '1.5px', background: '#000', transition: 'all 0.05s linear' }} />
                                    {/* Left tick */}
                                    <div style={{ position: 'absolute', top: '115px', left: `${-eqWidth / 2}px`, width: '1.5px', height: '20px', background: '#000', transition: 'left 0.05s linear' }} />
                                    {/* Mid tick */}
                                    <div style={{ position: 'absolute', top: '115px', left: '0px', width: '1.5px', height: '20px', background: '#000' }} />
                                </div>
                            )}

                            {eqStep >= 2 && (
                                <div className="animate-fade-in">
                                    {/* Line Mid to Right */}
                                    <div style={{ position: 'absolute', top: '125px', left: '0px', width: `${eqWidth / 2}px`, height: '1.5px', background: '#000', transition: 'width 0.05s linear' }} />
                                    {/* Right tick */}
                                    <div style={{ position: 'absolute', top: '115px', left: `${eqWidth / 2}px`, width: '1.5px', height: '20px', background: '#000', transition: 'left 0.05s linear' }} />
                                </div>
                            )}

                            {eqStep >= 3 && (
                                <>
                                    <div className="animate-fade-in" style={{ position: 'absolute', top: '95px', left: `${-eqWidth / 4}px`, transform: 'translateX(-50%)', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '2px 6px', color: eqStep >= 5 ? 'var(--success)' : '#000', fontWeight: 'bold', fontSize: '0.85rem', transition: 'left 0.05s linear', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                                        {eqStep >= 5 ? 'EQ' : '200'} <Lock size={12} style={{ color: eqStep >= 5 ? 'var(--success)' : 'transparent' }} />
                                    </div>
                                    <div className="animate-fade-in" style={{ position: 'absolute', top: '95px', left: `${eqWidth / 4}px`, transform: 'translateX(-50%)', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '2px 6px', color: eqStep >= 5 ? 'var(--success)' : '#000', fontWeight: 'bold', fontSize: '0.85rem', transition: 'left 0.05s linear', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)', whiteSpace: 'nowrap' }}>
                                        {eqStep >= 5 ? 'EQ' : '200'} <Lock size={12} style={{ color: eqStep >= 5 ? 'var(--success)' : 'transparent' }} />
                                    </div>

                                    {eqStep === 4 && (
                                        <div style={{ position: 'absolute', top: '120px', left: `${-eqWidth / 4}px`, animation: 'moveAndClick 1.5s forwards', zIndex: 10, color: '#000', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                                            <MousePointer2 size={24} fill="#fff" />
                                            <span style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', background: 'rgba(56, 189, 248, 0.4)', borderRadius: '50%', animation: 'clickPulse 1.5s forwards' }} />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}

                    {/* --- LOCK VISUALS --- */}
                    {activeTab === 'lock' && (
                        <>
                            {/* Left Gray Wall - Starts centered left (-100px) */}
                            <div style={{ position: 'absolute', left: `${-100 + lockOffset - 10}px`, top: '25px', bottom: '25px', width: '20px', background: 'rgba(200, 200, 200, 0.4)', border: '2px solid #888', transition: 'left 0.05s linear' }} />

                            {/* Ref Plane (Orange Dashed) - Exactly 100px from center of Left Wall */}
                            <div style={{ position: 'absolute', left: `${lockOffset}px`, top: '0', bottom: '0', borderLeft: '2px dashed #f97316', transition: 'left 0.05s linear', display: 'flex', alignItems: 'center' }}>
                                <span style={{ position: 'absolute', left: '-20px', top: '15px', color: '#f97316', fontWeight: 'bold', background: 'var(--glass-bg)', padding: '2px 4px', borderRadius: '4px', fontSize: '10px', whiteSpace: 'nowrap' }}>Ref Plane</span>
                            </div>

                            {/* Right Blue Wall (Not locked, Stationary at right) */}
                            <div style={{ position: 'absolute', left: '100px', top: '25px', bottom: '25px', width: '20px', background: 'rgba(225, 29, 72, 0.2)', border: '2px solid var(--accent)' }} />

                            {lockStep >= 1 && (
                                <div className="animate-fade-in">
                                    {/* Line from center of Left Wall (-100 + offset) to Ref Plane (offset) */}
                                    <div style={{ position: 'absolute', top: '125px', left: `${-100 + lockOffset}px`, width: '100px', height: '1.5px', background: '#000', transition: 'left 0.05s linear' }} />
                                    {/* Left tick */}
                                    <div style={{ position: 'absolute', top: '115px', left: `${-100 + lockOffset}px`, width: '1.5px', height: '20px', background: '#000', transition: 'left 0.05s linear' }} />
                                    {/* Right tick exactly on Ref Plane */}
                                    <div style={{ position: 'absolute', top: '115px', left: `${lockOffset}px`, width: '1.5px', height: '20px', background: '#000', transition: 'left 0.05s linear' }} />
                                </div>
                            )}

                            {lockStep >= 2 && (
                                <>
                                    {/* 50mm tag centered between Left Wall and Ref Plane (-50 + offset) */}
                                    <div className="animate-fade-in" style={{ position: 'absolute', top: '95px', left: `${-50 + lockOffset}px`, transform: 'translateX(-50%)', background: 'var(--bg-main)', border: '1px solid var(--glass-border)', borderRadius: '4px', padding: '2px 4px', color: lockStep >= 4 ? '#f97316' : '#000', fontWeight: 'bold', fontSize: '0.85rem', transition: 'left 0.05s linear', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                                        50mm
                                        {lockStep >= 4 ? <Lock size={12} color="#f97316" /> : <Unlock size={12} color="#888" />}
                                    </div>

                                    {lockStep === 3 && (
                                        <div style={{ position: 'absolute', top: '120px', left: `${-50 + lockOffset}px`, animation: 'moveAndClick 1.5s forwards', zIndex: 10, color: '#000', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }}>
                                            <MousePointer2 size={24} fill="#fff" />
                                            <span style={{ position: 'absolute', top: 0, left: 0, width: '10px', height: '10px', background: 'rgba(56, 189, 248, 0.4)', borderRadius: '50%', animation: 'clickPulse 1.5s forwards' }} />
                                        </div>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {activeTab === 'eq' ? (
                    <button
                        onClick={() => setEqStep(eqStep === 0 ? 1 : 0)}
                        className="type-btn"
                        style={{ background: eqStep > 0 ? 'var(--error)' : 'var(--success)', color: '#fff', border: 'none', padding: '0.75rem 2rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        {eqStep > 0 ? 'Reset Simulation' : 'Run Sequence: EQ Constraint'}
                    </button>
                ) : (
                    <button
                        onClick={() => setLockStep(lockStep === 0 ? 1 : 0)}
                        className="type-btn"
                        style={{ background: lockStep > 0 ? 'var(--error)' : 'var(--warning)', color: '#fff', border: 'none', padding: '0.75rem 2rem', fontWeight: 'bold', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        {lockStep > 0 ? 'Reset Simulation' : 'Run Sequence: Locking'}
                    </button>
                )}
            </div>

            <div style={{ textAlign: 'center', color: '#000', background: 'var(--glass-bg)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-card)', minHeight: '60px' }}>
                {activeTab === 'eq' && (
                    <div style={{ fontWeight: '500' }}>
                        {eqStep === 0 && "Click 'Run Sequence' to see how EQ constraints are applied."}
                        {eqStep === 1 && "Step 1: Drawing the first dimension segment from the left..."}
                        {eqStep === 2 && "Step 2: Completing the multi-segmented dimension to the right..."}
                        {eqStep === 3 && "Step 3: Values shown. Notice the text says '200' instead of EQ."}
                        {eqStep === 4 && "Step 4: Clicking the 'EQ' symbol to apply the constraint..."}
                        {eqStep === 5 && "Step 5: Constraint Applied! The values change to 'EQ' with a lock."}
                        {eqStep === 6 && "Step 6: Animating! The middle plane is now forced to stay dead center."}
                    </div>
                )}
                {activeTab === 'lock' && (
                    <div style={{ fontWeight: '500' }}>
                        {lockStep === 0 && "Click 'Run Sequence' to see how Locking Dimensions work."}
                        {lockStep === 1 && "Step 1: Drawing a dimension between the Gray Wall and the Ref Plane..."}
                        {lockStep === 2 && "Step 2: Dimension shows 50mm, but the lock icon is open."}
                        {lockStep === 3 && "Step 3: Clicking the lock icon..."}
                        {lockStep === 4 && "Step 4: Constraint Applied! The dimension is now locked permanently."}
                        {lockStep === 5 && "Step 5: Animating! The Gray Wall and Ref Plane move as a single rigid body, maintaining exactly 50mm distance."}
                    </div>
                )}
            </div>

            <style>{`
                @keyframes moveAndClick {
                    0% { transform: translate(30px, 30px); opacity: 0; }
                    20% { transform: translate(0, 0); opacity: 1; }
                    70% { transform: translate(0, 0); opacity: 1; }
                    90% { transform: translate(0, 0); opacity: 0; }
                    100% { transform: translate(0, 0); opacity: 0; }
                }
                @keyframes clickPulse {
                    0% { transform: scale(1); opacity: 0; }
                    65% { transform: scale(1); opacity: 0; }
                    70% { transform: scale(1); opacity: 1; }
                    80% { transform: scale(3); opacity: 0; }
                    100% { transform: scale(1); opacity: 0; }
                }
            `}</style>
        </div>
    );
}
