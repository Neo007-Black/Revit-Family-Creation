import { useState, useEffect } from 'react';

const FLOW_SEQUENCES = [
    ['root', 'h-root', 'spine', 'h-sys', 'system', 'h-sys-out', 'sys-out'],
    ['root', 'h-root', 'spine', 'h-load', 'loadable', 'h-load-out', 'load-out'],
    ['root', 'h-root', 'spine', 'h-inp', 'inplace', 'h-inp-out', 'inp-out'],
];

export function FamilyTypeTree() {
    const [active, setActive] = useState(new Set(['root']));
    const [seqIdx, setSeqIdx] = useState(0);
    const [stepIdx, setStepIdx] = useState(0);

    useEffect(() => {
        const seq = FLOW_SEQUENCES[seqIdx];
        if (stepIdx >= seq.length) {
            const t = setTimeout(() => {
                setActive(new Set(['root']));
                setSeqIdx(i => (i + 1) % FLOW_SEQUENCES.length);
                setStepIdx(0);
            }, 800);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setActive(prev => new Set([...prev, seq[stepIdx]]));
            setStepIdx(i => i + 1);
        }, 230);
        return () => clearTimeout(t);
    }, [seqIdx, stepIdx]);

    const on = (key) => active.has(key);
    const nodeFill = (key, idle) => on(key) ? '#00ffe5' : idle;
    const nodeFilter = (key) => on(key)
        ? 'drop-shadow(0 0 14px rgba(0,255,229,0.95)) drop-shadow(0 0 28px rgba(0,255,229,0.5))'
        : 'drop-shadow(0 3px 8px rgba(0,0,0,0.5))';
    const lineStroke = (key) => on(key) ? '#00ffe5' : 'rgba(255,255,255,0.2)';
    const lineFilter = (key) => on(key) ? 'drop-shadow(0 0 6px rgba(0,255,229,0.9))' : 'none';
    const lw = (key) => on(key) ? 3.5 : 2;

    // ── Layout (viewBox 900 × 280) ──────────────────────────────
    const VW = 900, VH = 280;

    // Root node (left-center)
    const rX = 30, rY = 100, rW = 160, rH = 80;
    const rCY = rY + rH / 2;          // 140

    // Spine
    const spX = 250;                   // x of vertical spine
    const rows = [50, 140, 230];       // y-centers of 3 branches

    // Branch nodes
    const bX = spX + 14, bW = 125, bH = 62;

    // Output nodes
    const oX = bX + bW + 36, oW = 160, oH = 62;

    const Node = ({ id, x, y, w, h, idle, lines }) => (
        <g style={{ transition: 'filter 0.25s ease', filter: nodeFilter(id) }}>
            <rect x={x} y={y - h / 2} width={w} height={h} rx={20}
                fill={nodeFill(id, idle)}
                style={{ transition: 'fill 0.25s ease' }} />
            {lines.map((txt, i) => (
                <text key={i} x={x + w / 2} y={y - h / 2 + 22 + i * 21}
                    textAnchor="middle" fill="#000"
                    fontSize="12.5" fontWeight="900"
                    fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif">
                    {txt}
                </text>
            ))}
        </g>
    );

    const Ln = ({ id, x1, y1, x2, y2 }) => (
        <line x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={lineStroke(id)} strokeWidth={lw(id)} strokeLinecap="round"
            style={{ transition: 'stroke 0.25s ease, filter 0.25s ease', filter: lineFilter(id) }} />
    );

    return (
        <div style={{
            background: 'linear-gradient(140deg, #172840 0%, #0d1c2e 60%, #081420 100%)',
            borderRadius: '20px',
            padding: '1rem',
            margin: '0 0 2rem 0',
        }}>
            <svg
                viewBox={`0 0 ${VW} ${VH}`}
                width="100%"
                height="280px"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: 'block' }}
            >
                {/* ROOT */}
                <Node id="root" x={rX} y={rCY} w={rW} h={rH} idle="#5dd9cc"
                    lines={['REVIT FAMILY', 'TYPES']} />

                {/* Root → Spine */}
                <Ln id="h-root" x1={rX + rW} y1={rCY} x2={spX} y2={rCY} />

                {/* Vertical spine */}
                <Ln id="spine" x1={spX} y1={rows[0]} x2={spX} y2={rows[2]} />

                {/* ── SYSTEM (top) ── */}
                <Ln id="h-sys" x1={spX} y1={rows[0]} x2={bX} y2={rows[0]} />
                <Node id="system" x={bX} y={rows[0]} w={bW} h={bH} idle="#3ac5d8" lines={['SYSTEM', 'FAMILY']} />
                <Ln id="h-sys-out" x1={bX + bW} y1={rows[0]} x2={oX} y2={rows[0]} />
                <Node id="sys-out" x={oX} y={rows[0]} w={oW} h={oH} idle="#33d4c4" lines={['3D Component', '& 2D Annotation']} />

                {/* ── LOADABLE (middle) ── */}
                <Ln id="h-load" x1={spX} y1={rows[1]} x2={bX} y2={rows[1]} />
                <Node id="loadable" x={bX} y={rows[1]} w={bW} h={bH} idle="#3aaed6" lines={['LOADABLE', 'FAMILY']} />
                <Ln id="h-load-out" x1={bX + bW} y1={rows[1]} x2={oX} y2={rows[1]} />
                <Node id="load-out" x={oX} y={rows[1]} w={oW} h={oH} idle="#44c8d8" lines={['3D Component', '& 2D Annotation']} />

                {/* ── IN-PLACE (bottom) ── */}
                <Ln id="h-inp" x1={spX} y1={rows[2]} x2={bX} y2={rows[2]} />
                <Node id="inplace" x={bX} y={rows[2]} w={bW} h={bH} idle="#2d86ca" lines={['IN-PLACE', 'FAMILY']} />
                <Ln id="h-inp-out" x1={bX + bW} y1={rows[2]} x2={oX} y2={rows[2]} />
                <Node id="inp-out" x={oX} y={rows[2]} w={oW} h={oH} idle="#2670b0" lines={['3D', 'Component']} />
            </svg>
        </div>
    );
}
