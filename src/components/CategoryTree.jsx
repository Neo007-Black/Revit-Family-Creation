import { useState } from 'react';
import { Layers } from 'lucide-react';
import { TreeDiagram } from './TreeDiagram';

const CATEGORIES_DATA = [
    {
        id: 'model', label: 'Model Categories (3D)', icon: 'box', color: '#f43f5e',
        children: [
            { id: 'm1', label: 'Air Terminals', icon: 'file' },
            { id: 'm2', label: 'Ducts', icon: 'file' },
            { id: 'm3', label: 'Mechanical Equipment (Boilers, AHUs)', icon: 'file' },
            { id: 'm4', label: 'Pipes', icon: 'file' },
            { id: 'm5', label: 'Plumbing Fixtures', icon: 'file' }
        ]
    },
    {
        id: 'anno', label: 'Annotation Categories (2D)', icon: 'file', color: '#f59e0b',
        children: [
            { id: 'a1', label: 'Dimensions', icon: 'file' },
            { id: 'a2', label: 'Duct Tags', icon: 'file' },
            { id: 'a3', label: 'Generic Annotations', icon: 'file' }
        ]
    },
    {
        id: 'anal', label: 'Analytical Categories', icon: 'layers', color: '#8b5cf6',
        children: [
            { id: 'an1', label: 'Analytical Pipes', icon: 'file' },
            { id: 'an2', label: 'Spaces', icon: 'file' }
        ]
    }
];

export function CategoryTree() {
    const [activeData, setActiveData] = useState({ name: '', desc: '' });

    const handleNodeSelect = (node) => {
        if (!node.children) {
            setActiveData({
                name: node.label,
                desc: `Details for ${node.label} will appear here. This could include properties, usage examples, or links to documentation.`
            });
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', margin: '3rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Layers size={24} color="var(--accent)" /> Element Hierarchy</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#000', fontWeight: '500' }}>Click through the Revit classification system</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <TreeDiagram
                    data={CATEGORIES_DATA}
                    defaultOpen={['model']}
                    onNodeSelect={handleNodeSelect}
                    activeNodeId={activeData.name} // using name as id since original logic did
                />

                {/* Details Panel */}
                <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--border-card)' }}>
                    {activeData.name ? (
                        <>
                            <h4 style={{ marginTop: 0, color: 'var(--accent)', fontSize: '1.25rem' }}>{activeData.name}</h4>
                            <p style={{ color: '#000', lineHeight: 1.6 }}>{activeData.desc}</p>
                        </>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.5)', fontStyle: 'italic' }}>
                            Select a category file to view details
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
