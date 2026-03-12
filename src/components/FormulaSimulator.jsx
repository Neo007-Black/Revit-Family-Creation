import { useState } from 'react';

const TABS = [
    { id: 'basic', label: 'Basic Math', desc: '+, -, *, /, ^ (Exponentiation)' },
    { id: 'rounding', label: 'Rounding', desc: 'round, roundup, rounddown' },
    { id: 'trig', label: 'Trigonometry', desc: 'sin, cos, tan, asin, acos, atan' },
    { id: 'conditional', label: 'Conditional', desc: 'if(condition, true_val, false_val)' },
];

const basicOps = [
    { op: '+', sym: '+', name: 'Addition' },
    { op: '-', sym: '-', name: 'Subtraction' },
    { op: '*', sym: '*', name: 'Multiplication' },
    { op: '/', sym: '/', name: 'Division' },
    { op: '^', sym: '^', name: 'Exponentiation' },
];

const roundFuncs = [
    { id: 'round', name: 'round(x)', desc: 'Rounds to nearest integer' },
    { id: 'roundup', name: 'roundup(x)', desc: 'Rounds up to next integer' },
    { id: 'rounddown', name: 'rounddown(x)', desc: 'Rounds down to previous integer' },
];

const trigFuncs = [
    { id: 'sin', name: 'sin(x°)', desc: 'Sine of angle in degrees' },
    { id: 'cos', name: 'cos(x°)', desc: 'Cosine of angle in degrees' },
    { id: 'tan', name: 'tan(x°)', desc: 'Tangent of angle in degrees' },
    { id: 'asin', name: 'asin(x)', desc: 'Arc sine, result in degrees' },
    { id: 'acos', name: 'acos(x)', desc: 'Arc cosine, result in degrees' },
    { id: 'atan', name: 'atan(x)', desc: 'Arc tangent, result in degrees' },
];

function toRad(deg) { return (deg * Math.PI) / 180; }
function toDeg(rad) { return (rad * 180) / Math.PI; }

export function FormulaSimulator() {
    const [activeTab, setActiveTab] = useState('basic');

    // Basic Math
    const [basicA, setBasicA] = useState('100');
    const [basicB, setBasicB] = useState('50');
    const [basicOp, setBasicOp] = useState('+');

    // Rounding
    const [roundX, setRoundX] = useState('7.6');
    const [roundFunc, setRoundFunc] = useState('round');

    // Trigonometry
    const [trigX, setTrigX] = useState('30');
    const [trigFunc, setTrigFunc] = useState('sin');

    // Conditional
    const [condRight, setCondRight] = useState('500');
    const [condOp, setCondOp] = useState('>');
    const [condParam, setCondParam] = useState('300');
    const [condTrueVal, setCondTrueVal] = useState('Large');
    const [condFalseVal, setCondFalseVal] = useState('Small');

    const inputStyle = {
        padding: '0.5rem 0.75rem',
        borderRadius: '8px',
        border: '1px solid rgba(0,0,0,0.15)',
        fontSize: '1rem',
        width: '100%',
        maxWidth: '120px',
        fontFamily: 'monospace',
    };

    const cardStyle = {
        padding: '1.25rem 1.5rem',
        background: 'rgba(255,255,255,0.6)',
        borderRadius: '12px',
        border: '1px solid rgba(0,0,0,0.08)',
    };

    // Compute basic math result
    const basicResult = (() => {
        const a = parseFloat(basicA);
        const b = parseFloat(basicB);
        if (isNaN(a) || isNaN(b)) return null;
        switch (basicOp) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b === 0 ? null : a / b;
            case '^': return Math.pow(a, b);
            default: return null;
        }
    })();

    // Compute rounding result
    const roundResult = (() => {
        const x = parseFloat(roundX);
        if (isNaN(x)) return null;
        switch (roundFunc) {
            case 'round': return Math.round(x);
            case 'roundup': return Math.ceil(x);
            case 'rounddown': return Math.floor(x);
            default: return null;
        }
    })();

    // Compute trig result
    const trigResult = (() => {
        const x = parseFloat(trigX);
        if (isNaN(x)) return null;
        switch (trigFunc) {
            case 'sin': return Math.sin(toRad(x));
            case 'cos': return Math.cos(toRad(x));
            case 'tan': return Math.tan(toRad(x));
            case 'asin': return x >= -1 && x <= 1 ? toDeg(Math.asin(x)) : null;
            case 'acos': return x >= -1 && x <= 1 ? toDeg(Math.acos(x)) : null;
            case 'atan': return toDeg(Math.atan(x));
            default: return null;
        }
    })();

    // Compute conditional result
    const condResult = (() => {
        const left = parseFloat(condParam);
        const right = parseFloat(condRight);
        if (isNaN(left) || isNaN(right)) return null;
        let ok = false;
        switch (condOp) {
            case '>': ok = left > right; break;
            case '<': ok = left < right; break;
            case '=': ok = Math.abs(left - right) < 1e-6; break;
            case '>=': ok = left >= right; break;
            case '<=': ok = left <= right; break;
            case '<>': ok = Math.abs(left - right) >= 1e-6; break;
            default: return null;
        }
        return ok ? condTrueVal : condFalseVal;
    })();

    const formatNum = (n) => {
        if (n === null || n === undefined) return '—';
        const r = typeof n === 'number' ? n : parseFloat(n);
        if (isNaN(r)) return '—';
        if (trigFunc && ['asin','acos','atan'].includes(trigFunc)) return r.toFixed(2) + '°';
        if (Math.abs(r) < 1e-10 || Math.abs(r) > 1e10) return r.toExponential(2);
        return Number.isInteger(r) ? String(r) : r.toFixed(4).replace(/\.?0+$/, '');
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', margin: '3rem 0', overflow: 'hidden' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#000', textAlign: 'center', fontSize: '1.5rem' }}>
                Formula Simulator
            </h3>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                Try each Revit formula type. Change inputs to see live results.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem', justifyContent: 'center' }}>
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        style={{
                            padding: '0.6rem 1.2rem',
                            background: activeTab === t.id ? 'var(--accent)' : 'rgba(255,255,255,0.8)',
                            color: activeTab === t.id ? '#fff' : '#333',
                            border: activeTab === t.id ? 'none' : '1px solid rgba(0,0,0,0.12)',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            transition: 'all 0.2s',
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Basic Math */}
            {activeTab === 'basic' && (
                <div style={{ ...cardStyle, maxWidth: '500px', margin: '0 auto' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--accent)' }}>Basic Math</h4>
                    <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        Use +, -, *, /, and ^ for exponentiation in Revit formulas.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <input type="text" value={basicA} onChange={(e) => setBasicA(e.target.value)} style={inputStyle} />
                        <select value={basicOp} onChange={(e) => setBasicOp(e.target.value)} style={{ ...inputStyle, maxWidth: '80px' }}>
                            {basicOps.map((o) => (
                                <option key={o.op} value={o.op}>{o.sym} {o.name}</option>
                            ))}
                        </select>
                        <input type="text" value={basicB} onChange={(e) => setBasicB(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ fontFamily: 'monospace', background: '#1e1b2e', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem' }}>
                        <span style={{ color: '#a5b4fc' }}>Result</span> = {basicA} {basicOp} {basicB}
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: basicResult !== null ? 'var(--accent)' : '#999' }}>
                        = {formatNum(basicResult)}
                    </div>
                </div>
            )}

            {/* Rounding */}
            {activeTab === 'rounding' && (
                <div style={{ ...cardStyle, maxWidth: '500px', margin: '0 auto' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--accent)' }}>Rounding Functions</h4>
                    <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        round, roundup, rounddown — Revit uses these for integer results.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <select value={roundFunc} onChange={(e) => setRoundFunc(e.target.value)} style={{ ...inputStyle, maxWidth: '160px' }}>
                            {roundFuncs.map((f) => (
                                <option key={f.id} value={f.id}>{f.name} — {f.desc}</option>
                            ))}
                        </select>
                        <span style={{ color: 'var(--text-secondary)' }}>x =</span>
                        <input type="text" value={roundX} onChange={(e) => setRoundX(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ fontFamily: 'monospace', background: '#1e1b2e', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem' }}>
                        <span style={{ color: '#a5b4fc' }}>Result</span> = {roundFunc}(<span style={{ color: '#34d399' }}>{roundX}</span>)
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: roundResult !== null ? 'var(--accent)' : '#999' }}>
                        = {formatNum(roundResult)}
                    </div>
                </div>
            )}

            {/* Trigonometry */}
            {activeTab === 'trig' && (
                <div style={{ ...cardStyle, maxWidth: '500px', margin: '0 auto' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--accent)' }}>Trigonometry</h4>
                    <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        sin, cos, tan use angles in <strong>degrees</strong>. asin, acos, atan return degrees.
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <select value={trigFunc} onChange={(e) => setTrigFunc(e.target.value)} style={{ ...inputStyle, maxWidth: '180px' }}>
                            {trigFuncs.map((f) => (
                                <option key={f.id} value={f.id}>{f.name} — {f.desc}</option>
                            ))}
                        </select>
                        <span style={{ color: 'var(--text-secondary)' }}>x =</span>
                        <input type="text" value={trigX} onChange={(e) => setTrigX(e.target.value)} style={inputStyle} placeholder={['asin','acos','atan'].includes(trigFunc) ? '-1 to 1' : 'angle in degrees'} />
                    </div>
                    <div style={{ fontFamily: 'monospace', background: '#1e1b2e', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.95rem' }}>
                        <span style={{ color: '#a5b4fc' }}>Result</span> = {trigFunc}(<span style={{ color: '#34d399' }}>{trigX}</span>)
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: trigResult !== null ? 'var(--accent)' : '#999' }}>
                        = {formatNum(trigResult)}
                    </div>
                </div>
            )}

            {/* Conditional */}
            {activeTab === 'conditional' && (
                <div style={{ ...cardStyle, maxWidth: '560px', margin: '0 auto' }}>
                    <h4 style={{ margin: '0 0 1rem 0', color: 'var(--accent)' }}>Conditional (if statement)</h4>
                    <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        if(condition, value_if_true, value_if_false). Note: &lt;= uses NOT(x &gt; y).
                    </p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem 1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Parameter value (e.g. Width):</label>
                        <input type="text" value={condParam} onChange={(e) => setCondParam(e.target.value)} style={inputStyle} />
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Compare to:</label>
                        <input type="text" value={condRight} onChange={(e) => setCondRight(e.target.value)} style={inputStyle} />
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Operator:</label>
                        <select value={condOp} onChange={(e) => setCondOp(e.target.value)} style={{ ...inputStyle }}>
                            <option value=">">greater than (&gt;)</option>
                            <option value="<">less than (&lt;)</option>
                            <option value="=">equals (=)</option>
                            <option value=">=">greater or equal (&gt;=)</option>
                            <option value="<=">less or equal (&lt;=)</option>
                            <option value="<>">not equal (&lt;&gt;)</option>
                        </select>
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>If true:</label>
                        <input type="text" value={condTrueVal} onChange={(e) => setCondTrueVal(e.target.value)} style={inputStyle} />
                        <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>If false:</label>
                        <input type="text" value={condFalseVal} onChange={(e) => setCondFalseVal(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ fontFamily: 'monospace', background: '#1e1b2e', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', fontSize: '0.9rem', lineHeight: 1.8 }}>
                        if(<span style={{ color: '#fbbf24' }}>{condParam}</span> {condOp} <span style={{ color: '#34d399' }}>{condRight}</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#34d399' }}>"{condTrueVal}"</span>,<br />
                        &nbsp;&nbsp;<span style={{ color: '#34d399' }}>"{condFalseVal}"</span>)
                    </div>
                    <div style={{ marginTop: '1rem', fontSize: '1.25rem', fontWeight: 700, color: condResult !== null ? 'var(--accent)' : '#999' }}>
                        = {condResult ?? '—'}
                    </div>
                </div>
            )}
        </div>
    );
}
