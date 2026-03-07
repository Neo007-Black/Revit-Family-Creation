import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File, Layers, LayoutTemplate, Box, Component } from 'lucide-react';

export function TreeDiagram({ data, defaultOpen = [], activeNodeId, onNodeSelect }) {
    const [openNodes, setOpenNodes] = useState(defaultOpen);

    const toggleNode = (id) => {
        setOpenNodes(prev => prev.includes(id) ? prev.filter(n => n !== id) : [...prev, id]);
    };

    const handleNodeClick = (node) => {
        if (node.children && node.children.length > 0) {
            toggleNode(node.id);
        } else if (onNodeSelect) {
            onNodeSelect(node);
        }
    };

    const renderIcon = (iconName, color) => {
        const props = { size: 16, color: color || 'var(--text-secondary)' };
        switch (iconName) {
            case 'folder': return <Folder {...props} />;
            case 'file': return <File {...props} />;
            case 'layers': return <Layers {...props} />;
            case 'layout': return <LayoutTemplate {...props} />;
            case 'box': return <Box {...props} />;
            case 'component': return <Component {...props} />;
            default: return <File {...props} />;
        }
    };

    const TreeNode = ({ node, level = 0 }) => {
        const hasChildren = node.children && node.children.length > 0;
        const isOpen = openNodes.includes(node.id);
        const isActive = activeNodeId === node.id || activeNodeId === node.label;
        const paddingLeft = `${level * 1.5}rem`;

        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                    onClick={() => handleNodeClick(node)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem',
                        paddingLeft,
                        cursor: 'pointer',
                        userSelect: 'none',
                        background: isActive ? 'var(--bg-light)' : (isOpen && hasChildren ? 'rgba(0,0,0,0.02)' : 'transparent'),
                        borderRadius: '6px',
                        transition: 'background 0.2s',
                        color: isActive ? 'var(--accent)' : '#000',
                        fontWeight: isActive ? 'bold' : 'normal'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = isActive ? 'var(--bg-light)' : 'rgba(0,0,0,0.04)'}
                    onMouseLeave={e => e.currentTarget.style.background = isActive ? 'var(--bg-light)' : (isOpen && hasChildren ? 'rgba(0,0,0,0.02)' : 'transparent')}
                >
                    {/* Expand/Collapse Chevron */}
                    <div style={{ width: '16px', display: 'flex', justifyContent: 'center', opacity: hasChildren ? 1 : 0 }}>
                        {hasChildren && (
                            isOpen ? <ChevronDown size={14} color="#666" /> : <ChevronRight size={14} color="#666" />
                        )}
                    </div>

                    {/* Node Icon */}
                    {renderIcon(node.icon, node.color)}

                    {/* Node Label */}
                    <span style={{
                        fontWeight: hasChildren ? '600' : '400',
                        fontSize: '0.95rem'
                    }}>
                        {node.label}
                    </span>

                    {/* Optional Badge */}
                    {node.badge && (
                        <span style={{
                            marginLeft: 'auto',
                            fontSize: '0.7rem',
                            background: 'rgba(0,0,0,0.05)',
                            padding: '0.1rem 0.5rem',
                            borderRadius: '12px',
                            color: '#666',
                            fontWeight: 'bold',
                            textTransform: 'uppercase'
                        }}>
                            {node.badge}
                        </span>
                    )}
                </div>

                {/* Children Container (Animated) */}
                {hasChildren && (
                    <div style={{
                        display: 'grid',
                        gridTemplateRows: isOpen ? '1fr' : '0fr',
                        transition: 'grid-template-rows 0.3s ease-in-out',
                    }}>
                        <div style={{ overflow: 'hidden' }}>
                            <div style={{
                                position: 'relative',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '2px',
                                marginTop: '2px'
                            }}>
                                {/* Vertical connecting line */}
                                <div style={{
                                    position: 'absolute',
                                    left: `calc(${paddingLeft} + 1.3rem)`,
                                    top: 0,
                                    bottom: '10px',
                                    width: '1px',
                                    background: 'rgba(0,0,0,0.1)',
                                    zIndex: 0
                                }} />

                                {node.children.map(child => (
                                    <div key={child.id} style={{ position: 'relative', zIndex: 1 }}>
                                        {/* Horizontal connecting branch */}
                                        <div style={{
                                            position: 'absolute',
                                            left: `calc(${paddingLeft} + 1.3rem)`,
                                            top: '1rem',
                                            width: '0.75rem',
                                            height: '1px',
                                            background: 'rgba(0,0,0,0.1)'
                                        }} />
                                        <TreeNode node={child} level={level + 1} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div style={{
            background: 'var(--bg-dark)',
            border: '1px solid var(--border-card)',
            borderRadius: '12px',
            padding: '1rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
            {data.map(node => (
                <TreeNode key={node.id} node={node} />
            ))}
        </div>
    );
}
