import { useState } from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

const WORKFLOW_STEPS = [
    "Plan the family.",
    "Create a new family (.rfa) using the appropriate family template.",
    "Define Subcategories to control the visibility.",
    "Create the family skeleton or framework.",
    "Define the insertion point.",
    "Layout Reference Planes and Reference Lines.",
    "Add dimensions to specify parametric relationship.",
    "Label Dimensions to create type or instance parameters.",
    "Test, or flex the framework.",
    "Specify different parameters.",
    "Add geometry in solids, voids and constraints.",
    "Flex the model.",
    "Load in the project.",
    "Repeat previous steps until the family geometry is complete."
];

export function WorkflowChecklist() {
    const [completed, setCompleted] = useState(new Set());

    const toggleStep = (index) => {
        const newCompleted = new Set(completed);
        if (newCompleted.has(index)) {
            newCompleted.delete(index);
        } else {
            newCompleted.add(index);
        }
        setCompleted(newCompleted);
    };

    const progress = (completed.size / WORKFLOW_STEPS.length) * 100;

    return (
        <div className="glass-panel" style={{ padding: '2rem', margin: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem' }}>The 14-Step Workflow</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#000', fontWeight: '500' }}>Click each step as you complete it</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', height: '6px', overflow: 'hidden' }}>
                <div style={{
                    background: 'var(--success)',
                    height: '100%',
                    width: `${progress}%`,
                    transition: 'width 0.3s ease'
                }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {WORKFLOW_STEPS.map((step, index) => {
                    const isDone = completed.has(index);
                    return (
                        <div
                            key={index}
                            onClick={() => toggleStep(index)}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '1rem',
                                padding: '1rem',
                                background: isDone ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-card)',
                                border: `1px solid ${isDone ? 'var(--success)' : 'var(--border-card)'}`,
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                opacity: isDone ? 0.8 : 1
                            }}
                        >
                            <div style={{ marginTop: '0.1rem' }}>
                                {isDone ? <CheckCircle2 size={20} color="var(--success)" /> : <Circle size={20} color="#000" />}
                            </div>
                            <div>
                                <span style={{
                                    background: isDone ? 'rgba(244, 63, 94, 0.1)' : 'rgba(255,255,255,0.7)',
                                    color: isDone ? '#000' : '#000',
                                    fontWeight: isDone ? '400' : '600',
                                    textDecoration: isDone ? 'line-through' : 'none',
                                    textDecorationColor: 'rgba(0,0,0,0.3)'
                                }}
                                >
                                    <strong style={{ color: isDone ? 'var(--success)' : 'var(--accent)', marginRight: '0.5rem' }}>
                                        {String(index + 1).padStart(2, '0')}.
                                    </strong>
                                    {step}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

        </div >
    );
}
