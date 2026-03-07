
import React, { useEffect, useRef } from 'react';
import './TestZoneNative.css';
import { initTestingZone } from '../lib/testZoneEngine';

export function TestZoneNative() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const cleanup = initTestingZone(containerRef.current);

        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="test-zone-native-container"
            style={{ width: '100%', height: 'calc(100vh - 60px)', position: 'relative', overflow: 'hidden', display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#f5f5f7', backgroundImage: 'radial-gradient(circle at 15% 50%, rgba(88, 86, 214, 0.15), transparent 40%), radial-gradient(circle at 85% 30%, rgba(255, 45, 85, 0.12), transparent 45%), radial-gradient(circle at 50% 80%, rgba(0, 122, 255, 0.15), transparent 50%), linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}
        />
    );
}
