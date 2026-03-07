import { useState } from 'react';
import { Layers, LayoutTemplate, BoxSelect, Component } from 'lucide-react';
import { TreeDiagram } from './TreeDiagram';

const FAMILY_TYPES_DATA = [
    {
        id: 'revit_families', label: 'Revit Families', icon: 'layers', color: '#000',
        children: [
            {
                id: 'system', label: 'System Families', icon: 'layout', color: 'var(--accent)',
                badge: 'Predefined',
                desc: 'System Families form the basic building blocks of a Revit project. They are pre-defined in the project template and cannot be saved or loaded as independent files. You can only duplicate and modify their existing types.',
                children: [
                    { id: 'sys1', label: 'Walls', icon: 'file' },
                    { id: 'sys2', label: 'Floors', icon: 'file' },
                    { id: 'sys3', label: 'Roofs', icon: 'file' },
                    { id: 'sys4', label: 'Ceilings', icon: 'file' },
                    { id: 'sys5', label: 'Stairs', icon: 'file' }
                ]
            },
            {
                id: 'loadable', label: 'Loadable Families', icon: 'layers', color: 'var(--success)',
                badge: '.rfa Files',
                desc: 'Loadable Families are components created in external .rfa files and loaded into projects. They are highly customizable and can be shared across multiple projects or downloaded from manufacturers.',
                children: [
                    { id: 'load1', label: 'Doors', icon: 'box' },
                    { id: 'load2', label: 'Windows', icon: 'layout' },
                    { id: 'load3', label: 'Furniture', icon: 'component' },
                    { id: 'load4', label: 'Plumbing Fixtures', icon: 'component' }
                ]
            },
            {
                id: 'inplace', label: 'In-Place Families', icon: 'box', color: '#f59e0b',
                badge: 'Project Specific',
                desc: 'In-Place Families are custom elements modeled directly inside the project context. They exist ONLY in the specific project they are created in and cannot be easily reused.',
                children: [
                    { id: 'in1', label: 'Custom Wall Reveal', icon: 'file' },
                    { id: 'in2', label: 'Unique Site Features', icon: 'file' }
                ]
            }
        ]
    }
];

export function FamilyTypeDiagram() {
    const [activeData, setActiveData] = useState({ name: 'Revit Families', desc: 'Select a family type from the tree to view its properties.' });

    const handleNodeSelect = (node) => {
        // Find the node in our data to get the description
        let selectedDesc = '';

        const findDesc = (items) => {
            for (const item of items) {
                if (item.id === node.id && item.desc) return item.desc;
                if (item.children) {
                    const desc = findDesc(item.children);
                    if (desc) return desc;
                }
            }
            return null;
        };

        selectedDesc = findDesc(FAMILY_TYPES_DATA) || `Specific example: ${node.label}`;

        setActiveData({
            name: node.label,
            desc: selectedDesc
        });
    };

    return (
        <div className="glass-panel-override" style={{
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '20px',
            boxShadow: '0 8px 32px 0 rgba(244, 63, 94, 0.1)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            margin: '3rem 0',
            padding: '2rem',
            gap: '1.5rem'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ margin: 0, color: '#000', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><Component size={24} color="var(--accent)" /> Family Classification</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '1rem', color: '#000', fontWeight: '500' }}>The three distinct types of Revit families</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Visual Animated Tree Diagram Component */}
                <TreeDiagram
                    data={FAMILY_TYPES_DATA}
                    defaultOpen={['revit_families', 'system', 'loadable', 'inplace']}
                    onNodeSelect={handleNodeSelect}
                    activeNodeId={activeData.name}
                />

                {/* Details Panel */}
                <div style={{ background: 'var(--bg-dark)', borderRadius: '12px', padding: '2rem', border: '1px solid var(--border-card)' }}>
                    {activeData.name ? (
                        <>
                            <h4 style={{ marginTop: 0, color: 'var(--accent)', fontSize: '1.25rem' }}>{activeData.name}</h4>
                            <p style={{ color: '#000', lineHeight: 1.6, fontSize: '1rem' }}>{activeData.desc}</p>
                        </>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(0,0,0,0.5)', fontStyle: 'italic' }}>
                            Select a family class or type to view details
                        </div>
                    )}
                </div>
            </div>

            {/* LEGEND FOOTER */}
            <div style={{
                padding: '1.25rem 0 0 0',
                display: 'flex',
                gap: '1.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                borderTop: '1px solid rgba(0,0,0,0.1)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000', fontSize: '0.85rem', fontWeight: '500' }}>
                    <LayoutTemplate size={16} color="var(--accent)" /> System Elements
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000', fontSize: '0.85rem', fontWeight: '500' }}>
                    <Layers size={16} color="var(--success)" /> External Files (.rfa)
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#000', fontSize: '0.85rem', fontWeight: '500' }}>
                    <BoxSelect size={16} color="#f59e0b" /> Project Context Only
                </div>
            </div>
        </div>
    );
}
