import { useState, useRef, useEffect } from 'react';

const CSV_DATA = [
    { ND: 50, Flg_Dia: 165, Pipe_OD: 60, Neck_Len: 50 },
    { ND: 100, Flg_Dia: 220, Pipe_OD: 114, Neck_Len: 70 },
    { ND: 150, Flg_Dia: 285, Pipe_OD: 168, Neck_Len: 85 },
    { ND: 200, Flg_Dia: 340, Pipe_OD: 219, Neck_Len: 100 },
];

const COL_LABELS = { Flg_Dia: 'Flange Diameter', Pipe_OD: 'Pipe Outer Diameter', Neck_Len: 'Neck Length' };
const sleep = ms => new Promise(r => setTimeout(r, ms));

export function LookupSimulator() {
    const [open, setOpen] = useState(false);
    const [nd, setNd] = useState('100');
    const [col, setCol] = useState('Flg_Dia');
    const [step, setStep] = useState(0);
    const [scanRow, setScanRow] = useState(-1);
    const [foundRow, setFoundRow] = useState(-1);
    const [foundCol, setFoundCol] = useState('');
    const [resultVal, setResultVal] = useState(null);
    const [running, setRunning] = useState(false);
    const cancelRef = useRef(false);

    const colIdx = { Flg_Dia: 1, Pipe_OD: 2, Neck_Len: 3 };

    const reset = () => { setStep(0); setScanRow(-1); setFoundRow(-1); setFoundCol(''); setResultVal(null); };
    const openPopup = () => { reset(); setOpen(true); };
    const closePopup = () => { cancelRef.current = true; setOpen(false); reset(); setRunning(false); };

    const runSimulation = async () => {
        if (running) return;
        cancelRef.current = false;
        setRunning(true);
        reset();
        const targetND = parseInt(nd);

        setStep(1);
        await sleep(800);
        if (cancelRef.current) { setRunning(false); return; }

        setStep(2);
        await sleep(1000);
        if (cancelRef.current) { setRunning(false); return; }

        setStep(3);
        let matchIdx = -1;
        for (let i = 0; i < CSV_DATA.length; i++) {
            setScanRow(i);
            await sleep(600);
            if (cancelRef.current) { setRunning(false); return; }
            if (CSV_DATA[i].ND === targetND) {
                matchIdx = i;
                setFoundRow(i); setFoundCol(col); setScanRow(-1);
                await sleep(500);
                break;
            }
        }
        if (cancelRef.current) { setRunning(false); return; }

        setStep(4);
        setResultVal(matchIdx >= 0 ? CSV_DATA[matchIdx][col] : 0);
        setRunning(false);
    };

    useEffect(() => {
        const h = e => { if (e.key === 'Escape') closePopup(); };
        window.addEventListener('keydown', h);
        return () => window.removeEventListener('keydown', h);
    }, []);

    const flowBoxStyle = (s) => ({
        padding: '10px 18px', borderRadius: '10px', fontWeight: 700, fontSize: '0.8rem',
        textAlign: 'center', transition: 'all 0.4s', minWidth: '90px',
        background: step >= s ? (step === s ? '#5856d6' : '#34c759') : 'rgba(0,0,0,0.06)',
        color: step >= s ? '#fff' : '#86868b',
        boxShadow: step === s ? '0 0 20px rgba(88,86,214,0.4)' : 'none',
    });

    const arrowStyle = (s) => ({
        color: step >= s ? '#5856d6' : '#ccc', fontSize: '1.2rem', fontWeight: 900, transition: 'all 0.4s',
    });

    return (
        <>
            {/* Inline trigger */}
            <div style={{ padding: '2rem', margin: '2rem 0', borderRadius: '16px', background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.08)', textAlign: 'center' }}>
                <h3 style={{ margin: '0 0 0.5rem', color: '#1d1d1f', fontSize: '1.3rem' }}>Lookup Table Simulator</h3>
                <p style={{ margin: '0 0 1.25rem', color: '#86868b', fontSize: '0.9rem' }}>
                    Test the <code style={{ background: 'rgba(88,86,214,0.1)', padding: '2px 6px', borderRadius: '4px', color: '#5856d6' }}>size_lookup</code> function with interactive step-by-step data flow.
                </p>
                <button onClick={openPopup} style={{
                    background: 'linear-gradient(135deg, #5856d6, #007aff)', color: '#fff', border: 'none',
                    padding: '14px 36px', borderRadius: '14px', fontWeight: 700, fontSize: '1rem',
                    cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 20px rgba(88,86,214,0.3)',
                }}>
                    ⚡ Open Lookup Simulator
                </button>
            </div>

            {/* Full-screen popup */}
            {open && (
                <div style={{
                    position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)',
                    zIndex: 10000, animation: 'lkpFadeIn .2s ease', overflowY: 'auto',
                }}>
                    <style>{`
                        @keyframes lkpFadeIn { from{opacity:0} to{opacity:1} }
                        @keyframes lkpPulse { 0%,100%{box-shadow:0 0 0 0 rgba(88,86,214,0.25)} 50%{box-shadow:0 0 0 8px rgba(88,86,214,0)} }
                    `}</style>

                    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '24px 32px 40px' }}>
                        {/* Header */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#1d1d1f' }}>⚡ CSV Lookup — Step-by-Step Flow</h2>
                            <button onClick={closePopup} style={{ background: 'rgba(0,0,0,0.06)', border: 'none', width: '34px', height: '34px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.1rem', color: '#86868b' }}>✕</button>
                        </div>
                        <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: '#86868b' }}>Select inputs and run to see each step of the data flow.</p>

                        {/* Flow progress bar */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
                            {['Input', 'Formula', 'CSV Scan', 'Result'].map((label, i) => (
                                <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                                    <div style={{ height: '5px', borderRadius: '3px', background: step > i ? '#34c759' : step === i + 1 ? '#5856d6' : '#e5e7eb', transition: 'all 0.4s', marginBottom: '4px' }} />
                                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: step > i ? '#34c759' : step === i + 1 ? '#5856d6' : '#aaa' }}>{label}</span>
                                </div>
                            ))}
                        </div>

                        {/* === TWO COLUMN LAYOUT === */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>

                            {/* LEFT COLUMN — Steps */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                                {/* STEP 1: Input */}
                                <div style={{ padding: '18px', borderRadius: '14px', border: step === 1 ? '2px solid #5856d6' : step > 1 ? '2px solid #34c759' : '2px solid #e5e7eb', background: step === 1 ? 'rgba(88,86,214,0.04)' : step > 1 ? 'rgba(52,199,89,0.03)' : '#fff', opacity: step >= 1 || step === 0 ? 1 : 0.4, transition: 'all 0.4s', animation: step === 1 ? 'lkpPulse 1.5s infinite' : 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ background: '#5856d6', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>1</span>
                                        <strong style={{ fontSize: '0.92rem' }}>User Input</strong>
                                        {step > 1 && <span style={{ marginLeft: 'auto', color: '#34c759', fontWeight: 700, fontSize: '0.78rem' }}>✓</span>}
                                    </div>
                                    <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Nominal Diameter (ND)</label>
                                    <select value={nd} onChange={e => { setNd(e.target.value); reset(); }} disabled={running}
                                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem', marginBottom: '10px', fontFamily: 'inherit' }}>
                                        {CSV_DATA.map(r => <option key={r.ND} value={r.ND}>DN {r.ND}</option>)}
                                    </select>
                                    <label style={{ fontSize: '0.82rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Lookup Column</label>
                                    <select value={col} onChange={e => { setCol(e.target.value); reset(); }} disabled={running}
                                        style={{ width: '100%', padding: '9px 12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.9rem', fontFamily: 'inherit' }}>
                                        {Object.entries(COL_LABELS).map(([k, v]) => <option key={k} value={k}>{k} ({v})</option>)}
                                    </select>
                                </div>

                                {/* STEP 2: Formula */}
                                <div style={{ padding: '18px', borderRadius: '14px', border: step === 2 ? '2px solid #007aff' : step > 2 ? '2px solid #34c759' : '2px solid #e5e7eb', background: step === 2 ? 'rgba(0,122,255,0.04)' : step > 2 ? 'rgba(52,199,89,0.03)' : '#fff', opacity: step >= 2 ? 1 : 0.35, transition: 'all 0.4s', animation: step === 2 ? 'lkpPulse 1.5s infinite' : 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ background: '#007aff', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>2</span>
                                        <strong style={{ fontSize: '0.92rem' }}>Revit Formula Engine</strong>
                                        {step > 2 && <span style={{ marginLeft: 'auto', color: '#34c759', fontWeight: 700, fontSize: '0.78rem' }}>✓</span>}
                                    </div>
                                    <div style={{ background: '#1e1b2e', color: '#e2e8f0', padding: '14px 16px', borderRadius: '10px', fontFamily: 'monospace', fontSize: '0.82rem', lineHeight: 1.9 }}>
                                        <span style={{ color: '#a5b4fc' }}>Result</span> = size_lookup(<br />
                                        &nbsp;&nbsp;<span style={{ color: '#94a3b8' }}>"Flange_Data.csv"</span>,<br />
                                        &nbsp;&nbsp;<span style={{ color: '#fbbf24' }}>"{col}"</span>,<br />
                                        &nbsp;&nbsp;<span style={{ color: '#94a3b8' }}>0</span>,<br />
                                        &nbsp;&nbsp;<span style={{ color: '#34d399' }}>ND_{nd}</span><br />
                                        )
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN — Flow Diagram + CSV + Result */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

                                {/* Flow diagram */}
                                <div style={{ padding: '18px', borderRadius: '14px', background: '#f8f9fa', border: '1px solid #e5e7eb' }}>
                                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#86868b', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Data Flow</div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                                        <div style={flowBoxStyle(1)}>1. Input</div>
                                        <span style={arrowStyle(2)}>→</span>
                                        <div style={flowBoxStyle(2)}>2. Formula</div>
                                        <span style={arrowStyle(3)}>→</span>
                                        <div style={flowBoxStyle(3)}>3. CSV Query</div>
                                        <span style={arrowStyle(4)}>→</span>
                                        <div style={flowBoxStyle(4)}>4. Result</div>
                                    </div>
                                </div>

                                {/* STEP 3: CSV Table */}
                                <div style={{ padding: '18px', borderRadius: '14px', border: step === 3 ? '2px solid #34c759' : step > 3 ? '2px solid #34c759' : '2px solid #e5e7eb', background: step === 3 ? 'rgba(52,199,89,0.04)' : step > 3 ? 'rgba(52,199,89,0.03)' : '#fff', opacity: step >= 3 ? 1 : 0.35, transition: 'all 0.4s', animation: step === 3 ? 'lkpPulse 1.5s infinite' : 'none' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ background: '#34c759', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>3</span>
                                        <strong style={{ fontSize: '0.92rem' }}>CSV Table Scan</strong>
                                        {step > 3 && <span style={{ marginLeft: 'auto', color: '#34c759', fontWeight: 700, fontSize: '0.78rem' }}>✓ Match Found</span>}
                                    </div>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                                        <thead>
                                            <tr style={{ background: 'rgba(0,0,0,0.04)' }}>
                                                {['ND', 'Flg_Dia', 'Pipe_OD', 'Neck_Len'].map((h, i) => (
                                                    <th key={h} style={{
                                                        padding: '8px 10px', textAlign: 'left', borderBottom: '2px solid #ddd',
                                                        color: foundCol && colIdx[foundCol] === i ? '#5856d6' : '#1d1d1f', fontWeight: 700,
                                                    }}>{h}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {CSV_DATA.map((row, ri) => (
                                                <tr key={row.ND} style={{
                                                    background: foundRow === ri ? 'rgba(52,199,89,0.15)' : scanRow === ri ? 'rgba(0,122,255,0.08)' : 'transparent',
                                                    transition: 'background 0.3s', borderBottom: '1px solid #f0f0f0',
                                                }}>
                                                    {[row.ND, row.Flg_Dia, row.Pipe_OD, row.Neck_Len].map((val, ci) => (
                                                        <td key={ci} style={{
                                                            padding: '7px 10px',
                                                            fontWeight: foundRow === ri && (ci === 0 || colIdx[foundCol] === ci) ? 700 : 400,
                                                            color: foundRow === ri && colIdx[foundCol] === ci ? '#5856d6' : foundRow === ri && ci === 0 ? '#34c759' : '#1d1d1f',
                                                            background: foundRow === ri && colIdx[foundCol] === ci ? 'rgba(88,86,214,0.1)' : 'transparent',
                                                            borderRadius: '4px', transition: 'all 0.3s',
                                                        }}>{val}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {step === 3 && scanRow >= 0 && <div style={{ fontSize: '0.78rem', color: '#007aff', marginTop: '8px', fontWeight: 600 }}>
                                        Scanning row {scanRow + 1}… checking ND = {CSV_DATA[scanRow]?.ND}
                                    </div>}
                                    {foundRow >= 0 && <div style={{ fontSize: '0.78rem', color: '#34c759', marginTop: '8px', fontWeight: 600 }}>
                                        ✓ Match at row {foundRow + 1} → extracting "{foundCol}"
                                    </div>}
                                </div>

                                {/* STEP 4: Result */}
                                <div style={{ padding: '20px', borderRadius: '14px', border: step === 4 ? '2px solid #ff9500' : '2px solid #e5e7eb', background: step === 4 ? 'linear-gradient(135deg, rgba(88,86,214,0.06), rgba(255,149,0,0.06))' : '#fff', opacity: step >= 4 ? 1 : 0.35, transition: 'all 0.4s' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                        <span style={{ background: '#ff9500', color: '#fff', width: '26px', height: '26px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>4</span>
                                        <strong style={{ fontSize: '0.92rem' }}>Result & 3D Update</strong>
                                    </div>
                                    <div style={{ textAlign: 'center', padding: '8px 0' }}>
                                        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Extracted Value</div>
                                        <div style={{ fontSize: '2.6rem', fontWeight: 800, color: resultVal !== null ? '#5856d6' : '#ddd', margin: '2px 0', transition: 'all 0.4s' }}>
                                            {resultVal !== null ? `${resultVal} mm` : '—'}
                                        </div>
                                        {resultVal !== null && (
                                            <div style={{ fontSize: '0.82rem', color: '#86868b', lineHeight: 1.6 }}>
                                                <strong>Column:</strong> {COL_LABELS[col]} &nbsp;|&nbsp; <strong>ND:</strong> DN {nd}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom buttons */}
                        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                            <button onClick={closePopup} style={{
                                flex: 1, padding: '13px', border: 'none', borderRadius: '12px',
                                background: '#f0f0f0', color: '#1d1d1f', fontWeight: 700, fontSize: '0.92rem',
                                cursor: 'pointer', fontFamily: 'inherit',
                            }}>Close</button>
                            <button onClick={runSimulation} disabled={running} style={{
                                flex: 1, padding: '13px', border: 'none', borderRadius: '12px',
                                background: running ? '#a5b4fc' : 'linear-gradient(135deg, #5856d6, #007aff)', color: '#fff',
                                fontWeight: 700, fontSize: '0.92rem', cursor: running ? 'wait' : 'pointer',
                                fontFamily: 'inherit', boxShadow: running ? 'none' : '0 4px 15px rgba(88,86,214,0.3)',
                            }}>
                                {running ? '⏳ Running…' : '▶ Run Simulation'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
