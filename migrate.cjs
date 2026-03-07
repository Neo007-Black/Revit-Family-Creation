const fs = require('fs');
const path = require('path');

const htmlContent = fs.readFileSync(path.join(__dirname, 'public', 'Test.html'), 'utf-8');

// Extract CSS
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/);
const cssContent = styleMatch ? styleMatch[1].trim() : '';

// Extract Body DOM (excluding script tags)
let bodyContent = htmlContent.match(/<body>([\s\S]*?)<\/body>/)[1];
bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/g, '').trim();

// Extract Main Script
const scripts = htmlContent.match(/<script>([\s\S]*?)<\/script>/g);
const mainScriptContent = scripts[scripts.length - 1].replace(/<\/?script>/g, '').trim();

// 1. Create TestZoneNative.css
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'TestZoneNative.css'), cssContent);

// 2. Create testZoneEngine.js
const engineCode = `
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function initTestingZone(container) {
    // Clear previously injected HTML or scenes to prevent duplicates on hot reload
    container.innerHTML = \`
        \${` + '`' + `\n${bodyContent.replace(/`/g, '\\`')}\n` + '`' + `}
    \`;

    const document = container;
    const windowGlobals = {};

    // Map getElementById to search within the container
    const originalGetElementById = document.getElementById;
    document.getElementById = function(id) {
        return container.querySelector('#' + id) || window.document.getElementById(id); // fallback
    };
    
    // Create 'window' overrides for global functions defined in the script
    const mockWindow = new Proxy(window, {
        set(target, prop, value) {
            windowGlobals[prop] = value;
            return true;
        },
        get(target, prop) {
            return windowGlobals[prop] || target[prop];
        }
    });

    // We execute the raw logic in an IFE passing our mapped document and window
    (function(document, window) {
        ${mainScriptContent.replace(/window\.addEventListener\('resize'/g, 'window.addEventListener("resize_mock"')}
    })(document, mockWindow);

    const viewport = container.querySelector('#viewport');
    
    // Attach resize listener specifically for the viewport
    const resizeHandler = () => {
        if (!viewport) return;
        const width = viewport.clientWidth;
        const height = viewport.clientHeight;
        if(windowGlobals.camera && windowGlobals.renderer) {
            windowGlobals.camera.aspect = width / height;
            windowGlobals.camera.updateProjectionMatrix();
            windowGlobals.renderer.setSize(width, height);
        }
    };
    window.addEventListener('resize', resizeHandler);

    return () => {
        window.removeEventListener('resize', resizeHandler);
        container.innerHTML = '';
        if (windowGlobals.renderer) {
            windowGlobals.renderer.dispose();
        }
    };
}
`;
fs.writeFileSync(path.join(__dirname, 'src', 'lib', 'testZoneEngine.js'), engineCode);

// 3. Create TestZoneNative.jsx
const jsxCode = `
import React, { useEffect, useRef } from 'react';
import './TestZoneNative.css';
import { initTestingZone } from '../lib/testZoneEngine';

export function TestZoneNative() {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;
        
        const cleanup = initTestingZone(containerRef.current);
        
        return () => {
            if(cleanup) cleanup();
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
`;
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'TestZoneNative.jsx'), jsxCode);

console.log("Migration script complete.");
