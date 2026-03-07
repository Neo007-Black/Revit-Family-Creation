import React, { useEffect, useRef } from 'react';

export function TestingZoneSimulator() {
    const iframeRef = useRef(null);

    useEffect(() => {
        // We will fetch the HTML content or serve it directly
        // For simplicity, we can just point the iframe to the public folder or inline it
    }, []);

    return (
        <div style={{ width: '100%', height: '800px', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-card)' }}>
            <iframe
                src="/Test.html"
                title="Testing Zone Simulator"
                style={{ width: '100%', height: '100%', border: 'none' }}
                sandbox="allow-scripts allow-same-origin"
            />
        </div>
    );
}
