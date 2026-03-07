
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export function initTestingZone(container) {
    // Clear previously injected HTML or scenes to prevent duplicates on hot reload
    container.innerHTML = `
        ${`
<div id="properties-palette">
        <div class="tab-header" id="tab-header-bar">
            <button class="tab-btn active" onclick="switchTab('geometry')">1. Geo</button>
            <button class="tab-btn" onclick="switchTab('parameters')">2. Params</button>
            <button class="tab-btn" onclick="switchTab('reference')">3. Ref Line</button>
            <button class="tab-btn" onclick="switchTab('lookup')">4. Lookup</button>
            <button class="tab-btn" onclick="switchTab('paramtypes')">5. Types</button>
            <button class="tab-btn" onclick="switchTab('famprops')">6. Props</button>
            <button class="tab-btn" onclick="switchTab('modify')" style="color: var(--apple-teal);">7. Modify</button>
        </div>
        

        <div id="tab-geometry" class="tab-content active">
            <h2>Form Editor</h2>
            <div class="control-group">
                <h3>Project Views</h3>
                <div class="view-controls">
                    <button class="view-btn active-view" id="btn-iso" onclick="setView('iso')">3D Default</button>
                    <button class="view-btn" id="btn-top" onclick="setView('top')">Top View</button>
                    <button class="view-btn" id="btn-front" onclick="setView('front')">Front Elev.</button>
                    <button class="view-btn" id="btn-left" onclick="setView('left')">Left Elev.</button>
                </div>
                <label
                    style="font-size: 0.85rem; font-weight:600; display:block; margin-top:15px; margin-bottom:5px;">Active
                    Work Plane:</label>
                <select id="workplane-select">
                    <option value="level">Reference Level (Plan)</option>
                    <option value="front">Front/Back (Elevation)</option>
                    <option value="left">Left/Right (Elevation)</option>
                </select>
            </div>

            <div class="control-group">
                <h3>Solid Form Type</h3>
                <select id="form-type-select">
                    <option value="extrusion">Extrusion</option>
                    <option value="blend">Blend</option>
                    <option value="revolve">Revolve</option>
                    <option value="sweep">Sweep</option>
                    <option value="swept_blend">Swept Blend</option>
                </select>
            </div>
            <button id="mode-toggle" class="toggle-btn active">Edit Sketch Mode</button>
            <button id="finish-toggle" class="toggle-btn">Finish Edit Mode</button>
            <div class="control-group" style="margin-top: 16px;">
                <h3>Sketches</h3>
                <div id="ui-path" class="dynamic-ui"
                    style="margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid rgba(0,0,0,0.1);">
                    <label style="font-size: 0.85rem; font-weight:600; color:var(--apple-pink);">Path Line
                        Sketch:</label>
                    <select id="path-select">
                        <option value="spline">S-Curve Spline</option>
                        <option value="arc">Curved Arc</option>
                        <option value="straight">Straight Line</option>
                    </select>
                </div>
                <div id="ui-shape1">
                    <label style="font-size: 0.85rem; font-weight:600;"><span id="shape1-label">Profile
                            Shape:</span></label>
                    <select id="shape1-select">
                        <option value="square">Square</option>
                        <option value="circle">Circle</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
                <div id="ui-shape2" class="dynamic-ui"
                    style="margin-top: 10px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 10px;">
                    <label style="font-size: 0.85rem; font-weight:600;">Top/End Profile Shape:</label>
                    <select id="shape2-select">
                        <option value="circle">Circle</option>
                        <option value="square">Square</option>
                        <option value="triangle">Triangle</option>
                    </select>
                </div>
            </div>
            <div class="control-group">
                <h3>Dimensions & Constraints</h3>
                <div class="slider-container" id="ui-size1"><label><span id="size1-label">Base Profile Size</span> <span
                            id="size1-val">100</span></label><input type="range" id="size1-slider" min="20" max="200"
                        value="100" step="10"></div>
                <div class="slider-container dynamic-ui" id="ui-size2"><label><span id="size2-label">Top Profile
                            Size</span> <span id="size2-val">50</span></label><input type="range" id="size2-slider"
                        min="10" max="200" value="50" step="10"></div>
                <div class="slider-container dynamic-ui" id="ui-end"><label><span>Extrusion End (Top)</span> <span
                            id="end-val">150</span></label><input type="range" id="end-slider" min="-250" max="250"
                        value="150" step="10" disabled></div>
                <div class="slider-container dynamic-ui" id="ui-start"><label><span>Extrusion Start (Bottom)</span>
                        <span id="start-val">0</span></label><input type="range" id="start-slider" min="-250" max="250"
                        value="0" step="10" disabled></div>
                <div class="slider-container dynamic-ui" id="ui-angle"><label><span>Revolve Angle</span> <span
                            id="angle-val">270°</span></label><input type="range" id="angle-slider" min="10" max="360"
                        value="270" step="10" disabled></div>
            </div>
        </div>

        <div id="tab-parameters" class="tab-content">
            <h2>Type vs Instance</h2>
            <div class="control-group" style="border-left: 4px solid var(--apple-blue);">
                <h3>1. Parameter Definition</h3>
                <label style="font-size: 0.85rem; font-weight:600; display:block; margin-bottom:5px;">Data Type:</label>
                <select id="param-datatype" onchange="updateParamUI()">
                    <option value="length">Length (Controls Dimensions)</option>
                    <option value="material">Material (Controls Surface Finish)</option>
                    <option value="yesno">Yes/No (Controls Visibility)</option>
                </select>
                <label
                    style="font-size: 0.85rem; font-weight:600; display:block; margin-top: 15px; margin-bottom:5px;">Behavior:</label>
                <div class="radio-group">
                    <label style="color: var(--type-color);"><input type="radio" name="behavior" value="type" checked
                            onchange="syncData()"> Type (Global)</label>
                    <label style="color: var(--inst-color);"><input type="radio" name="behavior" value="instance"
                            onchange="syncData()"> Instance (Local)</label>
                </div>
            </div>
            <div class="control-group">
                <h3>2. Testing Environment</h3>
                <label style="font-size: 0.85rem; font-weight:600; display:block; margin-bottom:5px;">Target Element
                    Selection:</label>
                <select id="param-target" onchange="loadTargetData()">
                    <option value="table1">Table A (Left Instance)</option>
                    <option value="table2">Table B (Right Instance)</option>
                </select>
                <div id="input-length" class="param-input active">
                    <div class="slider-container"><label><span>Table Width</span> <span
                                id="p-width-val">150</span></label><input type="range" id="p-width-slider" min="80"
                            max="250" value="150" step="10" oninput="applyParamChange('width', this.value)"></div>
                </div>
                <div id="input-material" class="param-input"><label
                        style="font-size: 0.85rem; font-weight:600; display:block; margin-bottom:5px;">Table Top
                        Finish:</label><select id="p-mat-select" onchange="applyParamChange('mat', this.value)">
                        <option value="wood">Birch Wood (Light)</option>
                        <option value="metal">Brushed Steel (Dark)</option>
                        <option value="glass">Tempered Glass (Blue)</option>
                    </select></div>
                <div id="input-yesno" class="param-input"><label class="checkbox-label"><input type="checkbox"
                            id="p-vis-check" checked onchange="applyParamChange('vis', this.checked)"> Show Keyboard
                        Tray</label></div>
            </div>
        </div>

        <div id="tab-reference" class="tab-content">
            <h2>Reference Constraints</h2>
            <div class="control-group" style="border-left: 4px solid var(--apple-green);">
                <h3>Entity Type</h3>
                <select id="ref-type-select" onchange="updateRefScene()">
                    <option value="plane">Reference Plane (Infinite 2D)</option>
                    <option value="line">Reference Line (1D with Local Planes)</option>
                </select>
                <label class="checkbox-label" style="margin-top: 15px;"><input type="checkbox" id="ref-show-planes"
                        checked onchange="updateRefScene()"> Reveal Hidden Work Planes</label>
            </div>
            <div class="control-group">
                <h3>Angular Constraint Parameter</h3>
                <div class="slider-container"><label><span>Rotation Angle</span> <span
                            id="ref-angle-val">0°</span></label><input type="range" id="ref-angle-slider" min="0"
                        max="180" value="0" step="5" oninput="updateRefScene()"></div>
                <label class="checkbox-label"
                    style="margin-top: 15px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 15px;"><input
                        type="checkbox" id="ref-host-geo" onchange="updateRefScene()"> Host geometry to entity</label>
            </div>
        </div>

        <div id="tab-lookup" class="tab-content">
            <h2>CSV Lookup Logic</h2>
            <div class="control-group" style="border-left: 4px solid var(--apple-purple); padding-bottom: 15px;">
                <h3>1. Input Data</h3>
                <label style="font-size: 0.85rem; font-weight:600; display:block; margin-bottom:5px;">Nominal Diameter
                    (ND):</label>
                <select id="lookup-nd-select" onchange="updateLookupScene()">
                    <option value="50">DN 50 (2 inch)</option>
                    <option value="100" selected>DN 100 (4 inch)</option>
                    <option value="150">DN 150 (6 inch)</option>
                    <option value="200">DN 200 (8 inch)</option>
                </select>
            </div>
            <div class="flow-container">
                <div class="flow-box" id="flow-1">1. Input</div>
                <div class="flow-arrow" id="arrow-1">➔</div>
                <div class="flow-box" id="flow-2">2. Formula</div>
                <div class="flow-arrow" id="arrow-2">➔</div>
                <div class="flow-box" id="flow-3">3. CSV Query</div>
                <div class="flow-arrow" id="arrow-3">➔</div>
                <div class="flow-box" id="flow-4">4. 3D Flex</div>
            </div>
            <div class="control-group" style="margin-top: 20px;">
                <h3>Revit Formula Engine</h3>
                <div class="status-tracker" id="lookup-status">Waiting for input...</div>
                <div class="formula-builder" id="formula-display">
                    <span style="color:#a5b4fc">Result</span> = size_lookup(<br>
                    &nbsp;&nbsp;<span style="color:#94a3b8">"Flange_Data.csv"</span>,<br>
                    &nbsp;&nbsp;
                    <select id="lookup-col-input" onchange="runLookupAnimation()">
                        <option value="Flg_Dia">"Flg_Dia"</option>
                        <option value="Pipe_OD">"Pipe_OD"</option>
                        <option value="Neck_Len">"Neck_Len"</option>
                    </select>,<br>
                    &nbsp;&nbsp;<span style="color:#94a3b8">0</span>,<br>
                    &nbsp;&nbsp;
                    <select id="lookup-nd-input" onchange="runLookupAnimation()">
                        <option value="50">ND_50</option>
                        <option value="100" selected>ND_100</option>
                        <option value="150">ND_150</option>
                        <option value="200">ND_200</option>
                    </select><br>
                    )<br>
                    <div class="formula-result" id="formula-result">= 220 mm</div>
                </div>
            </div>
            <div class="control-group">
                <h3>External Data Table (CSV)</h3>
                <table class="csv-table" id="csv-display">
                    <thead>
                        <tr>
                            <th id="th-ND">ND</th>
                            <th id="th-Flg_Dia">Flg_Dia</th>
                            <th id="th-Pipe_OD">Pipe_OD</th>
                            <th id="th-Neck_Len">Neck_Len</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div style="text-align:center; margin-top:16px;">
                <button onclick="openLookupPopup()" style="
                    background: var(--apple-purple); color: #fff; border: none;
                    padding: 12px 28px; border-radius: 14px; font-weight: 700;
                    font-size: 0.95rem; cursor: pointer; transition: all 0.2s;
                    font-family: inherit; letter-spacing: 0.02em;
                    box-shadow: 0 4px 15px rgba(88,86,214,0.3);
                " onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 20px rgba(88,86,214,0.4)'"
                    onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 4px 15px rgba(88,86,214,0.3)'">
                    ▶ Simulate Lookup Logic
                </button>
            </div>
        </div>

        <!-- Lookup Popup Overlay -->
        <div class="lookup-overlay" id="lookup-overlay">
            <div class="lookup-popup">
                <h3>⚡ Simulate Lookup Logic</h3>
                <p>Select your input parameters to query the external CSV data table.</p>

                <label>Nominal Diameter (ND)</label>
                <select id="popup-nd">
                    <option value="50">DN 50 (2 inch)</option>
                    <option value="100" selected>DN 100 (4 inch)</option>
                    <option value="150">DN 150 (6 inch)</option>
                    <option value="200">DN 200 (8 inch)</option>
                </select>

                <label>Lookup Column</label>
                <select id="popup-col">
                    <option value="Flg_Dia">Flg_Dia (Flange Diameter)</option>
                    <option value="Pipe_OD">Pipe_OD (Pipe Outer Diameter)</option>
                    <option value="Neck_Len">Neck_Len (Neck Length)</option>
                </select>

                <div class="popup-btn-row">
                    <button class="popup-btn cancel" onclick="closeLookupPopup()">Cancel</button>
                    <button class="popup-btn run" onclick="runLookupFromPopup()">Run Simulation</button>
                </div>

                <div class="lookup-result-box" id="popup-result-box">
                    <div class="result-label">Lookup Result</div>
                    <div class="result-value" id="popup-result-value">—</div>
                    <div class="result-detail" id="popup-result-detail"></div>
                </div>
            </div>
        </div>

        <div id="tab-paramtypes" class="tab-content">
            <h2>Revit Parameter Types</h2>
            <div class="control-group" style="border-left: 4px solid var(--apple-orange);">
                <h3>Select Parameter Logic</h3>
                <select id="ptype-select" onchange="updateParamTypeScene()">
                    <option value="system">1. Built-In System (e.g. Mark)</option>
                    <option value="family">2. Family Parameter (e.g. Door Width)</option>
                    <option value="project">3. Project Parameter (e.g. Fire Rating)</option>
                    <option value="shared">4. Shared Parameter (e.g. Asset ID)</option>
                    <option value="global">5. Global Parameter (e.g. Global Height)</option>
                </select>
                <div id="ptype-input-container"
                    style="margin-top: 15px; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 15px;">
                </div>
            </div>
            <div class="control-group">
                <h3>Capability Matrix</h3>
                <div class="type-matrix">
                    <div class="matrix-item"><span class="matrix-icon" id="mat-sched"></span> In Schedules</div>
                    <div class="matrix-item"><span class="matrix-icon" id="mat-tag"></span> In Tags</div>
                    <div class="matrix-item"><span class="matrix-icon" id="mat-multi"></span> Cross-Family</div>
                    <div class="matrix-item"><span class="matrix-icon" id="mat-ext"></span> External File</div>
                </div>
            </div>
            <div class="educational-note" id="ptype-note"
                style="border-color: var(--apple-orange); color: #b26800; background: rgba(255, 149, 0, 0.1);">
                Explanation goes here.
            </div>
        </div>

        <div id="tab-famprops" class="tab-content">
            <h2>Family Properties</h2>
            <div class="control-group" style="border-left: 4px solid var(--apple-cyan);">
                <h3>Project Placement Host</h3>
                <select id="fp-host" onchange="updateFamPropsScene()">
                    <option value="level">Level 1 (Flat Floor)</option>
                    <option value="sloped">Sloped Glazing (30° Roof)</option>
                </select>
            </div>
            <div class="control-group">
                <h3>Parameters (Other Category)</h3>

                <label class="checkbox-label"><input type="checkbox" id="fp-wpb" checked
                        onchange="updateFamPropsScene()"> Work Plane-Based</label>
                <div class="param-desc">Allows the family to be hosted to any flat surface, not just levels.</div>

                <label class="checkbox-label"><input type="checkbox" id="fp-av" onchange="updateFamPropsScene()"> Always
                    vertical</label>
                <div class="param-desc">Forces the family to ignore the host's slope and point straight up.</div>

                <label class="checkbox-label"><input type="checkbox" id="fp-shared" onchange="updateFamPropsScene()">
                    Shared</label>
                <div class="param-desc">Allows nested families to be scheduled individually.</div>

                <label class="checkbox-label"><input type="checkbox" id="fp-rcp" onchange="updateFamPropsScene()"> Room
                    Calculation Point</label>
                <div class="param-desc">Reveals a spatial point that dictates which room this element belongs to.</div>

                <div id="rcp-controls"
                    style="display: none; margin-top: 10px; padding: 10px; background: rgba(0,0,0,0.05); border-radius: 8px;">
                    <div class="slider-container">
                        <label><span>Adjust Point Offset (Y-Axis)</span></label>
                        <input type="range" id="fp-rcp-slider" min="-80" max="80" value="0" step="5"
                            oninput="updateFamPropsScene()">
                    </div>
                </div>
            </div>
            <div class="educational-note" id="fp-note"
                style="border-color: var(--apple-cyan); color: #0077a3; background: rgba(50, 173, 230, 0.1);"></div>
        </div>

        <div id="tab-modify" class="tab-content">
            <h2>Modify Tools</h2>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top:-15px; margin-bottom: 20px;">Simulate
                core spatial modification commands.</p>

            <div class="control-group" style="border-left: 4px solid var(--apple-teal);">
                <h3>Select Tool</h3>
                <select id="mod-tool-select" onchange="updateModifyUI()">
                    <option value="align">Align</option>
                    <option value="offset">Offset</option>
                    <option value="mirror">Mirror</option>
                    <option value="array">Linear Array</option>
                </select>
            </div>

            <div id="mod-options" class="control-group">
            </div>

            <button id="mod-execute-btn" class="toggle-btn active" onclick="executeModifyTool()"
                style="background: var(--apple-teal); border-color: var(--apple-teal); box-shadow: 0 4px 15px rgba(90, 200, 250, 0.4);">Execute
                Modify Tool</button>
            <button class="toggle-btn" onclick="resetModifyScene()">Reset Scenario</button>

            <div class="educational-note"
                style="border-color: var(--apple-teal); color: #006b8f; background: rgba(90, 200, 250, 0.1);">
                <strong>Interactive:</strong> Click 'Execute' to see how Revit calculates the spatial transformation.
            </div>
        </div>

    </div>

    <div id="viewport">
        <div id="axis-legend">
            <strong>Global Project Axes</strong>
            <div><span class="axis-z">■ Blue</span> = Z (Up/Down)</div>
            <div><span class="axis-y">■ Green</span> = Y (Front/Back)</div>
            <div><span class="axis-x">■ Red</span> = X (Left/Right)</div>
        </div>

        <div id="ptypes-overlay" class="overlay-container">
            <div id="ptype-tag" class="overlay-tag">Tag Data</div>
            <div id="ptype-schedule" class="overlay-schedule">
                <h4>🚪 Door Schedule <span>(Proj. Env.)</span></h4>
                <div class="schedule-row">Door 101 <span class="schedule-val" id="sched-val-1">-</span></div>
                <div class="schedule-row">Door 102 <span class="schedule-val" id="sched-val-2">-</span></div>
            </div>
        </div>

        <div id="fp-rcp-tag" class="rcp-tag">Room: Unknown</div>
    </div>
`}
    `;

    const document = container;
    const windowGlobals = {};

    // Map getElementById to search within the container
    const originalGetElementById = document.getElementById;
    document.getElementById = function (id) {
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
    (function (document, window) {
        // --- CORE THREE.JS SETUP ---
        const viewport = document.getElementById('viewport');
        const scene = new THREE.Scene();
        scene.background = null; // Transparent background for Glass UI
        THREE.Object3D.DefaultUp.set(0, 0, 1); // Revit standard: Z is UP

        const camera = new THREE.PerspectiveCamera(45, viewport.clientWidth / viewport.clientHeight, 1, 5000);
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(viewport.clientWidth, viewport.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x000000, 0);
        viewport.appendChild(renderer.domElement);

        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        scene.add(new THREE.AmbientLight(0xffffff, 0.9));
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
        dirLight.position.set(500, 500, 1000);
        scene.add(dirLight);

        // Utility Function to create Revit-Style Work Planes
        function createRevitWorkPlane(size, colorHex) {
            const group = new THREE.Group();

            const planeMat = new THREE.MeshBasicMaterial({ color: colorHex, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
            const planeGeo = new THREE.PlaneGeometry(size, size);
            group.add(new THREE.Mesh(planeGeo, planeMat));

            const edgeMat = new THREE.LineBasicMaterial({ color: colorHex, linewidth: 2 });
            const edges = new THREE.LineSegments(new THREE.EdgesGeometry(planeGeo), edgeMat);
            group.add(edges);

            const grid = new THREE.GridHelper(size, size / 20, colorHex, colorHex);
            grid.rotation.x = Math.PI / 2;
            grid.material.transparent = true;
            grid.material.opacity = 0.3;
            group.add(grid);

            return group;
        }

        // General Global Grid (Used for Tabs 2, 4, 5, 7)
        const globalGrid = createRevitWorkPlane(800, 0x888888);
        globalGrid.visible = false;
        scene.add(globalGrid);

        // Global Axes Helper (Z is Up by default now)
        const axesHelper = new THREE.AxesHelper(200);
        axesHelper.renderOrder = 999;
        axesHelper.material.depthTest = false;
        scene.add(axesHelper);

        // ==========================================
        // SCENE 1: GEOMETRY (TAB 1)
        // ==========================================
        const geoSceneGroup = new THREE.Group();
        scene.add(geoSceneGroup);
        const workPlaneGroup = new THREE.Group();
        geoSceneGroup.add(workPlaneGroup);
        const geoWorkPlane = createRevitWorkPlane(800, 0x34c759);
        workPlaneGroup.add(geoWorkPlane);
        const geometryGroup = new THREE.Group();
        workPlaneGroup.add(geometryGroup);

        let isSketchMode = true;
        const formSelect = document.getElementById('form-type-select');
        const workplaneSelect = document.getElementById('workplane-select');
        const pathSelect = document.getElementById('path-select');
        const shape1Select = document.getElementById('shape1-select');
        const shape2Select = document.getElementById('shape2-select');
        const modeToggle = document.getElementById('mode-toggle');
        const finishToggle = document.getElementById('finish-toggle');
        const eduNote = document.getElementById('edu-note');
        const size1Slider = document.getElementById('size1-slider');
        const size2Slider = document.getElementById('size2-slider');
        const startSlider = document.getElementById('start-slider');
        const endSlider = document.getElementById('end-slider');
        const angleSlider = document.getElementById('angle-slider');

        workplaneSelect.addEventListener('change', (e) => {
            const plane = e.target.value;
            if (plane === 'level') workPlaneGroup.rotation.set(0, 0, 0);
            else if (plane === 'front') workPlaneGroup.rotation.set(Math.PI / 2, 0, 0);
            else if (plane === 'left') workPlaneGroup.rotation.set(Math.PI / 2, Math.PI / 2, 0, 'YXZ');
        });

        function updateGeoUIVisibility() {
            const form = formSelect.value;
            const needsTwoProfiles = (form === 'blend' || form === 'swept_blend');
            const needsPath = (form === 'sweep' || form === 'swept_blend');

            document.getElementById('ui-path').style.display = needsPath ? 'block' : 'none';
            document.getElementById('ui-shape2').style.display = needsTwoProfiles ? 'block' : 'none';
            document.getElementById('ui-size2').style.display = needsTwoProfiles ? 'block' : 'none';
            document.getElementById('ui-angle').style.display = (form === 'revolve') ? 'block' : 'none';
            document.getElementById('ui-start').style.display = (form === 'extrusion' || form === 'blend') ? 'block' : 'none';
            document.getElementById('ui-end').style.display = (form === 'extrusion' || form === 'blend') ? 'block' : 'none';
            document.getElementById('shape1-label').innerText = needsTwoProfiles ? 'Base Profile Shape:' : 'Profile Shape:';
            document.getElementById('size1-label').innerText = needsTwoProfiles ? 'Base Profile Size' : 'Profile Size';
        }

        function getNormalizedShapePoints(type, size) {
            const points = []; const numPoints = 36;
            if (type === 'circle') {
                for (let i = 0; i < numPoints; i++) {
                    const angle = (i / numPoints) * Math.PI * 2;
                    points.push(new THREE.Vector2(Math.cos(angle) * size, Math.sin(angle) * size));
                }
            } else if (type === 'square') {
                const ptsPerSide = numPoints / 4;
                for (let side = 0; side < 4; side++) {
                    for (let i = 0; i < ptsPerSide; i++) {
                        const t = i / ptsPerSide; let x, y;
                        if (side === 0) { x = size; y = size - (t * 2 * size); }
                        else if (side === 1) { x = size - (t * 2 * size); y = -size; }
                        else if (side === 2) { x = -size; y = -size + (t * 2 * size); }
                        else if (side === 3) { x = -size + (t * 2 * size); y = size; }
                        points.push(new THREE.Vector2(x, y));
                    }
                }
            } else if (type === 'triangle') {
                const ptsPerSide = numPoints / 3; const r = size;
                const p0 = new THREE.Vector2(0, r);
                const p1 = new THREE.Vector2(-r * Math.cos(Math.PI / 6), -r * Math.sin(Math.PI / 6));
                const p2 = new THREE.Vector2(r * Math.cos(Math.PI / 6), -r * Math.sin(Math.PI / 6));
                for (let side = 0; side < 3; side++) {
                    const start = side === 0 ? p0 : (side === 1 ? p1 : p2);
                    const end = side === 0 ? p1 : (side === 1 ? p2 : p0);
                    for (let i = 0; i < ptsPerSide; i++) {
                        const t = i / ptsPerSide;
                        points.push(new THREE.Vector2(start.x + (end.x - start.x) * t, start.y + (end.y - start.y) * t));
                    }
                }
            }
            return points;
        }

        function createShapeFromNormalized(points) {
            const shape = new THREE.Shape();
            shape.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) { shape.lineTo(points[i].x, points[i].y); }
            shape.lineTo(points[0].x, points[0].y);
            return shape;
        }

        function createLoftGeometry(pts1, pts2, zStart, zEnd) {
            const geo = new THREE.BufferGeometry(); const vertices = []; const indices = []; const numPts = pts1.length;
            for (let i = 0; i < numPts; i++) { vertices.push(pts1[i].x, pts1[i].y, zStart); }
            for (let i = 0; i < numPts; i++) { vertices.push(pts2[i].x, pts2[i].y, zEnd); }
            for (let i = 0; i < numPts; i++) {
                let next_i = (i + 1) % numPts;
                indices.push(i, next_i, i + numPts);
                indices.push(next_i, next_i + numPts, i + numPts);
            }
            vertices.push(0, 0, zStart); const botCenter = numPts * 2;
            vertices.push(0, 0, zEnd); const topCenter = numPts * 2 + 1;
            for (let i = 0; i < numPts; i++) {
                let next_i = (i + 1) % numPts;
                indices.push(botCenter, next_i, i);
                indices.push(topCenter, i + numPts, next_i + numPts);
            }
            geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geo.setIndex(indices);
            geo.computeVertexNormals();
            return geo;
        }

        function getSelectedPath(type, scale) {
            if (type === 'straight') {
                return new THREE.LineCurve3(new THREE.Vector3(-scale, 0, 0), new THREE.Vector3(scale, 0, 0));
            } else if (type === 'arc') {
                return new THREE.QuadraticBezierCurve3(new THREE.Vector3(-scale, 0, 0), new THREE.Vector3(-scale, scale, 0), new THREE.Vector3(0, scale, 0));
            } else if (type === 'spline') {
                return new THREE.CatmullRomCurve3([new THREE.Vector3(-scale, 0, 0), new THREE.Vector3(-scale / 2, scale / 2, 0), new THREE.Vector3(scale / 2, -scale / 2, 0), new THREE.Vector3(scale, 0, 0)]);
            }
        }

        function createSweptBlendCurveGeometry(pts1, pts2, curve, steps) {
            const geo = new THREE.BufferGeometry(); const vertices = []; const indices = []; const numPts = pts1.length;
            const frames = curve.computeFrenetFrames(steps, false);
            const spacedPoints = curve.getSpacedPoints(steps);

            for (let step = 0; step <= steps; step++) {
                const t = step / steps;
                const pt = spacedPoints[step];
                const normal = frames.normals[step];
                const binormal = frames.binormals[step];
                for (let i = 0; i < numPts; i++) {
                    const x = pts1[i].x * (1 - t) + pts2[i].x * t;
                    const y = pts1[i].y * (1 - t) + pts2[i].y * t;
                    const pos = pt.clone().add(normal.clone().multiplyScalar(x)).add(binormal.clone().multiplyScalar(y));
                    vertices.push(pos.x, pos.y, pos.z);
                }
            }

            for (let step = 0; step < steps; step++) {
                for (let i = 0; i < numPts; i++) {
                    const next_i = (i + 1) % numPts;
                    const a = step * numPts + i;
                    const b = step * numPts + next_i;
                    const c = (step + 1) * numPts + i;
                    const d = (step + 1) * numPts + next_i;
                    indices.push(a, b, c);
                    indices.push(b, d, c);
                }
            }

            const botCenterIdx = vertices.length / 3;
            vertices.push(spacedPoints[0].x, spacedPoints[0].y, spacedPoints[0].z);
            for (let i = 0; i < numPts; i++) { indices.push(botCenterIdx, (i + 1) % numPts, i); }

            const topCenterIdx = vertices.length / 3;
            const lastPt = spacedPoints[steps];
            vertices.push(lastPt.x, lastPt.y, lastPt.z);
            const offset = steps * numPts;
            for (let i = 0; i < numPts; i++) { indices.push(topCenterIdx, offset + i, offset + ((i + 1) % numPts)); }

            geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
            geo.setIndex(indices);
            geo.computeVertexNormals();
            return geo;
        }

        function drawGeometry() {
            while (geometryGroup.children.length > 0) { geometryGroup.remove(geometryGroup.children[0]); }

            const form = formSelect.value;
            const shapeType1 = shape1Select.value;
            const shapeType2 = shape2Select.value;
            const pathType = pathSelect.value;

            const size1 = parseInt(size1Slider.value);
            const size2 = parseInt(size2Slider.value);
            const start = parseInt(startSlider.value);
            const end = parseInt(endSlider.value);
            const angle = parseInt(angleSlider.value) * (Math.PI / 180);

            const matMagenta = new THREE.LineBasicMaterial({ color: 0xec4899, linewidth: 3 });
            const matAxis = new THREE.LineDashedMaterial({ color: 0x007aff, dashSize: 10, gapSize: 5, linewidth: 2 });
            const matSolid = new THREE.MeshPhysicalMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.85, roughness: 0.2, metalness: 0.1, side: THREE.DoubleSide });
            const matEdge = new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3, linewidth: 1.5 });

            const pts1 = getNormalizedShapePoints(shapeType1, size1);
            const pts2 = getNormalizedShapePoints(shapeType2, size2);

            if (form === 'extrusion') {
                if (isSketchMode) {
                    geometryGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([...pts1, pts1[0]]), matMagenta));
                } else {
                    const depth = Math.max(0.1, Math.abs(end - start));
                    const geo = new THREE.ExtrudeGeometry(createShapeFromNormalized(pts1), { depth: depth, bevelEnabled: false });
                    const mesh = new THREE.Mesh(geo, matSolid);
                    const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), matEdge);
                    mesh.position.z = Math.min(start, end);
                    edges.position.z = Math.min(start, end);
                    geometryGroup.add(mesh); geometryGroup.add(edges);
                }
            } else if (form === 'blend') {
                if (isSketchMode) {
                    const l1 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([...pts1, pts1[0]]), matMagenta); l1.position.z = start; geometryGroup.add(l1);
                    const l2 = new THREE.Line(new THREE.BufferGeometry().setFromPoints([...pts2, pts2[0]]), matMagenta); l2.position.z = end; geometryGroup.add(l2);
                } else {
                    const geo = createLoftGeometry(pts1, pts2, start, end);
                    geometryGroup.add(new THREE.Mesh(geo, matSolid));
                    geometryGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), matEdge));
                }
            } else if (form === 'revolve') {
                const offsetPts = pts1.map(p => new THREE.Vector2(p.x + size1 + 20, p.y));
                if (isSketchMode) {
                    geometryGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([...offsetPts, offsetPts[0]]), matMagenta));
                    const axisLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -150, 0), new THREE.Vector3(0, 150, 0)]), matAxis);
                    axisLine.computeLineDistances();
                    geometryGroup.add(axisLine);
                } else {
                    const geo = new THREE.LatheGeometry(offsetPts, 32, 0, angle);
                    geo.rotateX(Math.PI / 2);
                    geometryGroup.add(new THREE.Mesh(geo, matSolid));
                    geometryGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), matEdge));
                }
            } else if (form === 'sweep') {
                const pathCurve = getSelectedPath(pathType, 150);
                if (isSketchMode) {
                    geometryGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathCurve.getPoints(50)), matMagenta));
                    const ptStart = pathCurve.getPoint(0);
                    const tangent = pathCurve.getTangent(0);
                    const profileLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([...pts1, pts1[0]].map(p => new THREE.Vector3(p.x, p.y, 0))), matMagenta);
                    profileLine.position.copy(ptStart);
                    profileLine.lookAt(ptStart.clone().add(tangent));
                    geometryGroup.add(profileLine);
                } else {
                    const geo = new THREE.ExtrudeGeometry(createShapeFromNormalized(pts1), { extrudePath: pathCurve, steps: 64, bevelEnabled: false });
                    geometryGroup.add(new THREE.Mesh(geo, matSolid));
                    geometryGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), matEdge));
                }
            } else if (form === 'swept_blend') {
                const pathCurve = getSelectedPath(pathType, 150);
                if (isSketchMode) {
                    geometryGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pathCurve.getPoints(50)), matMagenta));
                    const ptStart = pathCurve.getPoint(0);
                    const tangentStart = pathCurve.getTangent(0);
                    const p1Line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([...pts1, pts1[0]].map(p => new THREE.Vector3(p.x, p.y, 0))), matMagenta);
                    p1Line.position.copy(ptStart); p1Line.lookAt(ptStart.clone().add(tangentStart)); geometryGroup.add(p1Line);

                    const ptEnd = pathCurve.getPoint(1);
                    const tangentEnd = pathCurve.getTangent(1);
                    const p2Line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([...pts2, pts2[0]].map(p => new THREE.Vector3(p.x, p.y, 0))), matMagenta);
                    p2Line.position.copy(ptEnd); p2Line.lookAt(ptEnd.clone().add(tangentEnd)); geometryGroup.add(p2Line);
                } else {
                    const geo = createSweptBlendCurveGeometry(pts1, pts2, pathCurve, 64);
                    geometryGroup.add(new THREE.Mesh(geo, matSolid));
                    geometryGroup.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), matEdge));
                }
            }
        }

        formSelect.addEventListener('change', () => { updateGeoUIVisibility(); drawGeometry(); });
        pathSelect.addEventListener('change', () => { drawGeometry(); });
        shape1Select.addEventListener('change', () => { drawGeometry(); });
        shape2Select.addEventListener('change', () => { drawGeometry(); });

        modeToggle.addEventListener('click', function () {
            isSketchMode = true; this.classList.add('active'); finishToggle.classList.remove('active');
            startSlider.disabled = true; endSlider.disabled = true; angleSlider.disabled = true;
            workplaneSelect.disabled = false; shape1Select.disabled = false; shape2Select.disabled = false; pathSelect.disabled = false;
            updateGeoUIVisibility(); drawGeometry();
        });

        finishToggle.addEventListener('click', function () {
            isSketchMode = false; this.classList.add('active'); modeToggle.classList.remove('active');
            startSlider.disabled = false; endSlider.disabled = false; angleSlider.disabled = false;
            workplaneSelect.disabled = true; shape1Select.disabled = true; shape2Select.disabled = true; pathSelect.disabled = true;
            updateGeoUIVisibility(); drawGeometry();
        });

        size1Slider.addEventListener('input', drawGeometry);
        size2Slider.addEventListener('input', drawGeometry);
        startSlider.addEventListener('input', drawGeometry);
        endSlider.addEventListener('input', drawGeometry);
        angleSlider.addEventListener('input', drawGeometry);

        // --- TAB SWITCHING LOGIC ---
        window.setView = function (view) {
            document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active-view'));
            document.getElementById(`btn-${view}`).classList.add('active-view');
            const dist = 700; const wpSelect = document.getElementById('workplane-select');
            switch (view) {
                case 'iso': camera.position.set(dist, -dist, dist); break;
                case 'top': camera.position.set(0, 0, dist); if (!wpSelect.disabled && geoSceneGroup.visible) wpSelect.value = 'level'; break;
                case 'front': camera.position.set(0, -dist, 0); if (!wpSelect.disabled && geoSceneGroup.visible) wpSelect.value = 'front'; break;
                case 'left': camera.position.set(-dist, 0, 0); if (!wpSelect.disabled && geoSceneGroup.visible) wpSelect.value = 'left'; break;
            }
            if (geoSceneGroup.visible) { wpSelect.dispatchEvent(new Event('change')); }
            controls.target.set(0, 0, 0); controls.update();
        };

        window.switchTab = function (tabName) {
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.querySelector(`.tab-btn[onclick="switchTab('${tabName}')"]`).classList.add('active');
            document.getElementById(`tab-${tabName}`).classList.add('active');

            geoSceneGroup.visible = false; paramSceneGroup.visible = false; refSceneGroup.visible = false;
            lookupSceneGroup.visible = false; ptypeSceneGroup.visible = false; famPropSceneGroup.visible = false;
            modifySceneGroup.visible = false;

            document.getElementById('ptypes-overlay').classList.remove('active');
            document.getElementById('fp-rcp-tag').classList.remove('active');

            globalGrid.visible = false;

            if (tabName === 'geometry') {
                geoSceneGroup.visible = true; setView('iso');
            } else if (tabName === 'parameters') {
                paramSceneGroup.visible = true; globalGrid.visible = true; camera.position.set(0, -500, 300); controls.target.set(0, 0, 50); renderTables();
            } else if (tabName === 'reference') {
                refSceneGroup.visible = true; globalGrid.visible = true; camera.position.set(200, -300, 200); controls.target.set(0, 0, 0); updateRefScene();
            } else if (tabName === 'lookup') {
                lookupSceneGroup.visible = true; globalGrid.visible = true; camera.position.set(300, -300, 300); controls.target.set(0, 0, 0);
                updateLookupScene(false);
            } else if (tabName === 'paramtypes') {
                ptypeSceneGroup.visible = true; globalGrid.visible = true; document.getElementById('ptypes-overlay').classList.add('active'); camera.position.set(0, -400, 300); controls.target.set(0, 0, 80); updateParamTypeScene();
            } else if (tabName === 'famprops') {
                famPropSceneGroup.visible = true; camera.position.set(0, -400, 200); controls.target.set(0, 0, 50); updateFamPropsScene();
            } else if (tabName === 'modify') {
                modifySceneGroup.visible = true; globalGrid.visible = true; camera.position.set(0, -400, 300); controls.target.set(0, 0, 50); updateModifyUI();
            }
        }

        // Listen for postMessage from parent to switch tabs
        window.addEventListener('message', function (event) {
            if (event.data && event.data.type === 'switchTab' && event.data.tab) {
                switchTab(event.data.tab);
            }
        });

        // ==========================================
        // SCENE 2: PARAMS (TAB 2)
        // ==========================================
        const paramSceneGroup = new THREE.Group(); scene.add(paramSceneGroup);

        let tableData = { table1: { width: 150, mat: 'wood', vis: true }, table2: { width: 150, mat: 'wood', vis: true } };
        const materials = { wood: new THREE.MeshPhysicalMaterial({ color: 0xd4a373, roughness: 0.8 }), metal: new THREE.MeshPhysicalMaterial({ color: 0x64748b, roughness: 0.3, metalness: 0.6 }), glass: new THREE.MeshPhysicalMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4, roughness: 0.1 }) };
        const legMat = new THREE.MeshPhysicalMaterial({ color: 0x333333, roughness: 0.7 });

        function buildTable() {
            const group = new THREE.Group();
            const topMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 80, 5), materials.wood); topMesh.position.z = 70; topMesh.name = "tableTop"; group.add(topMesh);
            for (let i = 0; i < 4; i++) {
                const leg = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 70), legMat); leg.position.z = 35; leg.position.y = (i < 2) ? 35 : -35; leg.name = `leg${i}`; group.add(leg);
            }
            const tray = new THREE.Mesh(new THREE.BoxGeometry(60, 30, 2), legMat); tray.position.set(0, -40, 60); tray.name = "tray"; group.add(tray);
            return group;
        }

        const table1Mesh = buildTable(); table1Mesh.position.x = -120; paramSceneGroup.add(table1Mesh);
        const table2Mesh = buildTable(); table2Mesh.position.x = 120; paramSceneGroup.add(table2Mesh);

        function renderTables() {
            [{ mesh: table1Mesh, data: tableData.table1 }, { mesh: table2Mesh, data: tableData.table2 }].forEach(obj => {
                const top = obj.mesh.getObjectByName('tableTop'); top.scale.x = obj.data.width;
                const offset = (obj.data.width / 2) - 10;
                obj.mesh.getObjectByName('leg0').position.x = offset; obj.mesh.getObjectByName('leg1').position.x = -offset; obj.mesh.getObjectByName('leg2').position.x = offset; obj.mesh.getObjectByName('leg3').position.x = -offset;
                top.material = materials[obj.data.mat]; obj.mesh.getObjectByName('tray').visible = obj.data.vis;
            });
        }

        window.updateParamUI = function () { const dataType = document.getElementById('param-datatype').value; document.querySelectorAll('.param-input').forEach(el => el.classList.remove('active')); document.getElementById(`input-${dataType}`).classList.add('active'); loadTargetData(); }
        window.loadTargetData = function () { const data = tableData[document.getElementById('param-target').value]; document.getElementById('p-width-slider').value = data.width; document.getElementById('p-width-val').innerText = data.width; document.getElementById('p-mat-select').value = data.mat; document.getElementById('p-vis-check').checked = data.vis; }
        window.syncData = function () { if (document.querySelector('input[name="behavior"]:checked').value === 'type') { const sourceData = tableData[document.getElementById('param-target').value]; tableData.table1 = { ...sourceData }; tableData.table2 = { ...sourceData }; renderTables(); } }
        window.applyParamChange = function (param, value) { const target = document.getElementById('param-target').value; if (param === 'width') { value = parseInt(value); document.getElementById('p-width-val').innerText = value; } if (document.querySelector('input[name="behavior"]:checked').value === 'type') { tableData.table1[param] = value; tableData.table2[param] = value; } else { tableData[target][param] = value; } renderTables(); }

        // ==========================================
        // SCENE 3: REF LINES (TAB 3)
        // ==========================================
        const refSceneGroup = new THREE.Group(); scene.add(refSceneGroup);
        const refLineContainer = new THREE.Group(); refLineContainer.position.set(0, 0, 50); refSceneGroup.add(refLineContainer);
        let refVisuals = [];

        window.updateRefScene = function () {
            refVisuals.forEach(v => refLineContainer.remove(v)); refVisuals = [];
            const type = document.getElementById('ref-type-select').value; const angleDeg = parseInt(document.getElementById('ref-angle-slider').value); const angleRad = angleDeg * (Math.PI / 180);
            const showPlanes = document.getElementById('ref-show-planes').checked; const hostGeo = document.getElementById('ref-host-geo').checked;
            document.getElementById('ref-angle-val').innerText = angleDeg + "°"; document.getElementById('ref-angle-slider').disabled = (type === 'plane');

            const length = 200; refLineContainer.rotation.z = (type === 'line') ? angleRad : 0;
            const matPlaneArea = new THREE.MeshBasicMaterial({ color: 0x34c759, transparent: true, opacity: 0.15, side: THREE.DoubleSide });
            const matPlaneEdge = new THREE.LineDashedMaterial({ color: 0x34c759, dashSize: 10, gapSize: 5, linewidth: 2 });
            const matSolidLine = new THREE.LineBasicMaterial({ color: 0x34c759, linewidth: 4 });
            const matLocalPlane = new THREE.MeshBasicMaterial({ color: 0x007aff, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
            const matLocalEdge = new THREE.LineBasicMaterial({ color: 0x007aff });

            if (type === 'plane') {
                const planeMesh = new THREE.Mesh(new THREE.PlaneGeometry(length * 2, length * 2), matPlaneArea); refVisuals.push(planeMesh);
                const lineMesh = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-length, 0, 0), new THREE.Vector3(length, 0, 0)]), matPlaneEdge); lineMesh.computeLineDistances(); refVisuals.push(lineMesh);
            } else if (type === 'line') {
                const lineMesh = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0)]), matSolidLine); refVisuals.push(lineMesh);
                if (showPlanes) {
                    const planeSize = 60;
                    const pHoriz = new THREE.Mesh(new THREE.PlaneGeometry(length, planeSize), matLocalPlane); pHoriz.position.set(length / 2, 0, 0); refVisuals.push(pHoriz);
                    const pVert = new THREE.Mesh(new THREE.PlaneGeometry(length, planeSize), matLocalPlane); pVert.rotation.x = Math.PI / 2; pVert.position.set(length / 2, 0, 0); refVisuals.push(pVert);
                    const pStart = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize), matLocalPlane); pStart.rotation.y = Math.PI / 2; refVisuals.push(pStart);
                    const pEnd = new THREE.Mesh(new THREE.PlaneGeometry(planeSize, planeSize), matLocalPlane); pEnd.rotation.y = Math.PI / 2; pEnd.position.set(length, 0, 0); refVisuals.push(pEnd);
                    refVisuals.forEach(mesh => { if (mesh.geometry.type === 'PlaneGeometry') { const edges = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), matLocalEdge); edges.position.copy(mesh.position); edges.rotation.copy(mesh.rotation); refVisuals.push(edges); } });
                }
            }
            if (hostGeo) { const doorMesh = new THREE.Mesh(new THREE.BoxGeometry(length, 10, 100), new THREE.MeshPhysicalMaterial({ color: 0xd4a373, roughness: 0.8 })); doorMesh.position.set(length / 2, 0, 50); refVisuals.push(doorMesh); }
            refVisuals.forEach(v => refLineContainer.add(v));
        }

        // ==========================================
        // SCENE 4: LOOKUP TABLE & ANIMATION (TAB 4)
        // ==========================================
        const lookupSceneGroup = new THREE.Group(); scene.add(lookupSceneGroup);
        const lookupGeoContainer = new THREE.Group(); lookupSceneGroup.add(lookupGeoContainer);

        const csvData = [
            { ND: 50, Flg_Dia: 140, Pipe_OD: 60, Neck_Len: 80 },
            { ND: 100, Flg_Dia: 220, Pipe_OD: 114, Neck_Len: 120 },
            { ND: 150, Flg_Dia: 285, Pipe_OD: 168, Neck_Len: 150 },
            { ND: 200, Flg_Dia: 340, Pipe_OD: 219, Neck_Len: 180 }
        ];

        function populateCSVTable() {
            const tbody = document.querySelector('#csv-display tbody');
            tbody.innerHTML = '';
            csvData.forEach((row) => {
                const tr = document.createElement('tr');
                tr.id = `row-nd-${row.ND}`;
                tr.innerHTML = `<td class="col-nd">${row.ND}</td><td class="col-flg">${row.Flg_Dia}</td><td class="col-pipe">${row.Pipe_OD}</td><td class="col-neck">${row.Neck_Len}</td>`;
                tbody.appendChild(tr);
            });
        }
        populateCSVTable();

        function createHollowCylinder(outerRadius, innerRadius, length, color) { const shape = new THREE.Shape(); shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false); const holePath = new THREE.Path(); holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, true); shape.holes.push(holePath); const geo = new THREE.ExtrudeGeometry(shape, { depth: length, bevelEnabled: false, curveSegments: 32 }); const mat = new THREE.MeshPhysicalMaterial({ color: color, roughness: 0.2, metalness: 0.4, transparent: true, opacity: 0.9 }); const mesh = new THREE.Mesh(geo, mat); const edges = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 })); const group = new THREE.Group(); group.add(mesh); group.add(edges); return group; }

        function buildFlangeGeometry(selectedND, rowData) {
            while (lookupGeoContainer.children.length > 0) { lookupGeoContainer.remove(lookupGeoContainer.children[0]); }
            const innerBore = selectedND / 2; const pipeRadius = rowData.Pipe_OD / 2; const flangeRadius = rowData.Flg_Dia / 2; const flangeThickness = 25; const neckLength = rowData.Neck_Len;
            const flangeMesh = createHollowCylinder(flangeRadius, innerBore, flangeThickness, 0x5856d6); lookupGeoContainer.add(flangeMesh);
            const neckMesh = createHollowCylinder(pipeRadius, innerBore, neckLength, 0x007aff); neckMesh.position.z = flangeThickness; lookupGeoContainer.add(neckMesh);
            lookupGeoContainer.position.z = - (neckLength + flangeThickness) / 2;
        }

        const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        window.runLookupAnimation = async function () {
            const valInput = document.getElementById('lookup-nd-input');
            const colInput = document.getElementById('lookup-col-input');
            document.getElementById('lookup-nd-select').value = valInput.value;

            const targetND = parseInt(valInput.value);
            const targetCol = colInput.value;
            const resultDisplay = document.getElementById('formula-result');
            const statusText = document.getElementById('lookup-status');

            valInput.disabled = true; colInput.disabled = true; document.getElementById('lookup-nd-select').disabled = true;

            resultDisplay.classList.remove('flash'); resultDisplay.innerText = "= ???";
            document.querySelectorAll('#csv-display td, #csv-display tr').forEach(el => el.classList.remove('scanning', 'found-row', 'target-cell'));

            statusText.innerText = "Scanning first column for ND " + targetND + "...";

            for (let i = 1; i <= 4; i++) { document.getElementById(`flow-${i}`).classList.remove('active-flow'); if (i < 4) document.getElementById(`arrow-${i}`).classList.remove('active-flow'); }

            document.getElementById('flow-1').classList.add('active-flow');
            await sleep(400);

            document.getElementById('arrow-1').classList.add('active-flow');
            document.getElementById('flow-2').classList.add('active-flow');

            const rows = document.querySelectorAll('#csv-display tbody tr');
            let matchedRow = null; let rowIndex = 0;

            for (let r of rows) {
                const ndCell = r.cells[0];
                ndCell.classList.add('scanning');
                await sleep(500);

                if (parseInt(ndCell.innerText) === targetND) {
                    ndCell.classList.remove('scanning');
                    r.classList.add('found-row');
                    matchedRow = r;
                    statusText.innerText = "Match found at Row " + (rowIndex + 1) + "!";
                    await sleep(400);
                    break;
                }
                ndCell.classList.remove('scanning');
                rowIndex++;
            }

            document.getElementById('arrow-2').classList.add('active-flow');
            document.getElementById('flow-3').classList.add('active-flow');
            statusText.innerText = "Finding column '" + targetCol + "'...";

            let colIndex = 1;
            if (targetCol === 'Flg_Dia') colIndex = 1;
            if (targetCol === 'Pipe_OD') colIndex = 2;
            if (targetCol === 'Neck_Len') colIndex = 3;
            await sleep(500);

            statusText.innerText = "Extracting value...";
            const targetCell = matchedRow.cells[colIndex];
            targetCell.classList.add('target-cell');
            await sleep(600);

            const extractedValue = targetCell.innerText;
            resultDisplay.innerText = `= ${extractedValue} mm`;
            resultDisplay.classList.add('flash');
            statusText.innerText = "Value returned! Rebuilding geometry...";

            document.getElementById('arrow-3').classList.add('active-flow');
            document.getElementById('flow-4').classList.add('active-flow');

            const fullRowData = csvData.find(d => d.ND === targetND);
            buildFlangeGeometry(targetND, fullRowData);

            await sleep(500);
            statusText.innerText = "Ready for next input.";
            valInput.disabled = false; colInput.disabled = false; document.getElementById('lookup-nd-select').disabled = false;
        }

        window.updateLookupScene = function (animate = true) {
            document.getElementById('lookup-nd-input').value = document.getElementById('lookup-nd-select').value;
            if (animate) runLookupAnimation();
        }

        // ---- Lookup Popup Functions ----
        window.openLookupPopup = function () {
            document.getElementById('popup-result-box').classList.remove('active');
            document.getElementById('popup-result-value').innerText = '—';
            document.getElementById('popup-result-detail').innerText = '';
            document.getElementById('lookup-overlay').classList.add('active');
        }

        window.closeLookupPopup = function () {
            document.getElementById('lookup-overlay').classList.remove('active');
        }

        window.runLookupFromPopup = async function () {
            const nd = document.getElementById('popup-nd').value;
            const col = document.getElementById('popup-col').value;

            // Sync to the existing controls so the main animation works
            document.getElementById('lookup-nd-select').value = nd;
            document.getElementById('lookup-nd-input').value = nd;
            document.getElementById('lookup-col-input').value = col;

            // Run the main animation (in the background panel)
            runLookupAnimation();

            // Wait for animation to complete then show result in popup
            const targetND = parseInt(nd);
            const colNames = { 'Flg_Dia': 'Flange Diameter', 'Pipe_OD': 'Pipe Outer Diameter', 'Neck_Len': 'Neck Length' };
            const row = csvData.find(d => d.ND === targetND);

            if (row) {
                const value = row[col];
                // Show result after a delay matching the animation
                await sleep(3500);
                document.getElementById('popup-result-value').innerText = value + ' mm';
                document.getElementById('popup-result-detail').innerHTML =
                    '<strong>Query:</strong> size_lookup("Flange_Data.csv", "' + col + '", 0, ND_' + nd + ')<br>' +
                    '<strong>Column:</strong> ' + colNames[col] + '<br>' +
                    '<strong>ND:</strong> DN ' + nd;
                document.getElementById('popup-result-box').classList.add('active');
            }
        }

        // ==========================================
        // SCENE 5: PARAMETER TYPES (TAB 5)
        // ==========================================
        const ptypeSceneGroup = new THREE.Group(); scene.add(ptypeSceneGroup);

        const wallMat = new THREE.MeshPhysicalMaterial({ color: 0xcccccc, transparent: true, opacity: 0.5 });
        const doorFrameMat = new THREE.MeshPhysicalMaterial({ color: 0x555555 });
        const doorPanelMat = new THREE.MeshPhysicalMaterial({ color: 0xd4a373 });

        function createDoorAssembly() {
            const group = new THREE.Group();
            const wall = new THREE.Mesh(new THREE.BoxGeometry(200, 10, 150), wallMat); wall.position.set(0, 0, 75); group.add(wall);
            const frame = new THREE.Mesh(new THREE.BoxGeometry(80, 12, 120), doorFrameMat); frame.position.set(0, 0, 60); frame.name = "frame"; group.add(frame);
            const panel = new THREE.Mesh(new THREE.BoxGeometry(70, 4, 115), doorPanelMat); panel.position.set(0, 6, 57.5); panel.name = "panel"; group.add(panel);
            return group;
        }
        const d1Group = createDoorAssembly(); d1Group.position.set(-120, 0, 0); ptypeSceneGroup.add(d1Group);
        const d2Group = createDoorAssembly(); d2Group.position.set(120, 0, 0); ptypeSceneGroup.add(d2Group);

        let pData = {
            system: { val: "Entrance", canSched: true, canTag: true, isMulti: false, isExt: false, note: "Built into Revit. Every door has a 'Mark'. Schedules and Tags perfectly." },
            family: { val: 70, canSched: false, canTag: false, isMulti: false, isExt: false, note: "Lives ONLY in this Family file. Changes geometry, but cannot be tagged or scheduled in the project!" },
            project: { val: "2-Hour", canSched: true, canTag: false, isMulti: true, isExt: false, note: "Assigned to the Category in the Project. Schedules perfectly, but Tags cannot see it!" },
            shared: { val: "HW-01", canSched: true, canTag: true, isMulti: true, isExt: true, note: "The Holy Grail! Saved in an external TXT file. Can be used in Families, Projects, Schedules, AND Tags." },
            global: { val: 120, canSched: false, canTag: false, isMulti: true, isExt: false, note: "A project-wide variable. Notice how sliding this changes the height of ALL doors in the project simultaneously." }
        };

        function setMatrixIcons(sched, tag, multi, ext) {
            const yClass = 'icon-yes'; const nClass = 'icon-no';
            document.getElementById('mat-sched').className = 'matrix-icon ' + (sched ? yClass : nClass); document.getElementById('mat-sched').innerText = sched ? '✓' : '✕';
            document.getElementById('mat-tag').className = 'matrix-icon ' + (tag ? yClass : nClass); document.getElementById('mat-tag').innerText = tag ? '✓' : '✕';
            document.getElementById('mat-multi').className = 'matrix-icon ' + (multi ? yClass : nClass); document.getElementById('mat-multi').innerText = multi ? '✓' : '✕';
            document.getElementById('mat-ext').className = 'matrix-icon ' + (ext ? yClass : nClass); document.getElementById('mat-ext').innerText = ext ? '✓' : '✕';
        }

        window.updateParamTypeScene = function () {
            const pType = document.getElementById('ptype-select').value; const data = pData[pType];
            document.getElementById('ptype-note').innerText = data.note; setMatrixIcons(data.canSched, data.canTag, data.isMulti, data.isExt);
            const container = document.getElementById('ptype-input-container'); container.innerHTML = '';
            if (pType === 'family' || pType === 'global') {
                const isGlobal = (pType === 'global'); const lbl = isGlobal ? 'Global Door Height:' : 'Family Door Width:'; const min = isGlobal ? 100 : 50; const max = isGlobal ? 150 : 100;
                container.innerHTML = `<div class="slider-container"><label><span>${lbl}</span> <span id="ptype-val-display">${data.val}</span></label><input type="range" min="${min}" max="${max}" value="${data.val}" oninput="simulateParamFlow('${pType}', this.value)"></div>`;
            } else {
                let lbl = ''; if (pType === 'system') lbl = 'System Mark:'; if (pType === 'project') lbl = 'Project Fire Rating:'; if (pType === 'shared') lbl = 'Shared Hardware Code:';
                container.innerHTML = `<label style="font-size: 0.85rem; font-weight:600; display:block; margin-bottom:5px;">${lbl}</label><input type="text" value="${data.val}" oninput="simulateParamFlow('${pType}', this.value)"> ${pType === 'shared' ? '<div style="font-size:0.7rem; color:var(--text-muted); margin-top:5px;">💾 Linked to: SharedParams.txt</div>' : ''}`;
            }
            simulateParamFlow(pType, data.val);
        }

        window.simulateParamFlow = function (pType, val) {
            pData[pType].val = val; const display = document.getElementById('ptype-val-display'); if (display) display.innerText = val;
            const frame1 = d1Group.getObjectByName('frame'); const panel1 = d1Group.getObjectByName('panel'); const frame2 = d2Group.getObjectByName('frame'); const panel2 = d2Group.getObjectByName('panel');
            frame1.scale.set(1, 1, 1); panel1.scale.set(1, 1, 1); frame2.scale.set(1, 1, 1); panel2.scale.set(1, 1, 1);
            if (pType === 'family') { const scale = val / 70; frame1.scale.x = scale; panel1.scale.x = scale; } else if (pType === 'global') { const scale = val / 120; frame1.scale.z = scale; panel1.scale.z = scale; frame2.scale.z = scale; panel2.scale.z = scale; }
            const tag = document.getElementById('ptype-tag'); const sched = document.getElementById('ptype-schedule'); const val1 = document.getElementById('sched-val-1'); const val2 = document.getElementById('sched-val-2');
            if (pData[pType].canTag) { tag.classList.remove('disabled'); tag.innerText = val; } else { tag.classList.add('disabled'); tag.innerText = "? (Can't Tag)"; }
            if (pData[pType].canSched) { sched.classList.remove('disabled'); val1.innerText = val; val1.classList.remove('empty'); val2.innerText = pData[pType].isMulti ? val : '(Blank)'; if (!pData[pType].isMulti) val2.classList.add('empty'); else val2.classList.remove('empty'); } else { sched.classList.add('disabled'); val1.innerText = "N/A"; val2.innerText = "N/A"; val1.classList.add('empty'); val2.classList.add('empty'); }
        };

        // --- SCENE 6: FAMILY PROPERTIES (TAB 6) ---
        const famPropSceneGroup = new THREE.Group(); scene.add(famPropSceneGroup);

        // Translucent Work Planes
        const fpFloor = createRevitWorkPlane(600, 0x34c759);
        const fpRoof = createRevitWorkPlane(400, 0xff9500);
        fpRoof.position.set(0, 0, 80); fpRoof.rotation.x = Math.PI / 6;
        famPropSceneGroup.add(fpFloor); famPropSceneGroup.add(fpRoof);

        const fpDesk = new THREE.Group();
        const topDesk = new THREE.Mesh(new THREE.BoxGeometry(100, 50, 4), new THREE.MeshPhysicalMaterial({ color: 0xd4a373 })); topDesk.position.z = 40; fpDesk.add(topDesk);
        const legMatDesk = new THREE.MeshPhysicalMaterial({ color: 0x333333 });
        const l1 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 40), legMatDesk); l1.rotation.x = Math.PI / 2; l1.position.set(-45, 20, 20); fpDesk.add(l1);
        const l2 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 40), legMatDesk); l2.rotation.x = Math.PI / 2; l2.position.set(45, 20, 20); fpDesk.add(l2);
        const l3 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 40), legMatDesk); l3.rotation.x = Math.PI / 2; l3.position.set(-45, -20, 20); fpDesk.add(l3);
        const l4 = new THREE.Mesh(new THREE.CylinderGeometry(2, 2, 40), legMatDesk); l4.rotation.x = Math.PI / 2; l4.position.set(45, -20, 20); fpDesk.add(l4);
        famPropSceneGroup.add(fpDesk);

        const rcpGroup = new THREE.Group();
        const rcpLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -50, 0)]), new THREE.LineDashedMaterial({ color: 0x34c759, dashSize: 2, gapSize: 2 })); rcpLine.computeLineDistances();
        const rcpDot = new THREE.Mesh(new THREE.SphereGeometry(4, 16, 16), new THREE.MeshBasicMaterial({ color: 0x34c759 }));
        rcpGroup.add(rcpLine); rcpGroup.add(rcpDot); fpDesk.add(rcpGroup);

        window.updateFamPropsScene = function () {
            const host = document.getElementById('fp-host').value;
            const isWPB = document.getElementById('fp-wpb').checked;
            const isAV = document.getElementById('fp-av').checked;
            const showRCP = document.getElementById('fp-rcp').checked;
            const isShared = document.getElementById('fp-shared').checked;

            const rcpControls = document.getElementById('rcp-controls');
            const note = document.getElementById('fp-note');
            const rcpTag = document.getElementById('fp-rcp-tag');

            fpDesk.rotation.set(0, 0, 0);

            if (host === 'level') {
                fpDesk.position.set(0, 0, 0);
                note.innerText = "On a flat floor, 'Work Plane-Based' and 'Always vertical' have no noticeable visual effect.";
            } else if (host === 'sloped') {
                if (!isWPB) {
                    fpDesk.position.set(0, 0, 0);
                    note.innerHTML = "<strong style='color:var(--apple-pink);'>Warning:</strong> Family is not Work Plane-Based! It cannot attach to the roof and is stuck on Level 1.";
                } else {
                    fpDesk.position.set(0, 0, 80);
                    if (isAV) {
                        note.innerHTML = "<strong>Always Vertical:</strong> Attached to the slope, but forcing itself to stay straight up.";
                    } else {
                        fpDesk.rotation.x = Math.PI / 6;
                        note.innerHTML = "<strong>Normal to Surface:</strong> 'Always vertical' is off, so the desk tilts perfectly with the sloped host.";
                    }
                }
            }

            if (isShared) { note.innerHTML += "<br><br>💾 <em>Shared is ON: This family will appear in the main project schedule even if nested inside another family.</em>"; }

            if (showRCP) {
                rcpControls.style.display = 'block'; rcpGroup.visible = true; rcpTag.classList.add('active');
                const offset = parseInt(document.getElementById('fp-rcp-slider').value);
                rcpDot.position.set(0, offset, 0);
                rcpLine.geometry.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, offset, 0)]);

                const dotGlobalY = fpDesk.position.y + offset;
                if (dotGlobalY < -25) {
                    rcpTag.innerText = "Calculated Room: Corridor"; rcpTag.style.borderColor = "var(--apple-green)"; rcpTag.style.boxShadow = "0 0 15px rgba(52, 199, 89, 0.5)";
                } else {
                    rcpTag.innerText = "Calculated Room: Exterior (None)"; rcpTag.style.borderColor = "var(--apple-pink)"; rcpTag.style.boxShadow = "0 0 15px rgba(255, 45, 85, 0.5)";
                }
            } else { rcpControls.style.display = 'none'; rcpGroup.visible = false; rcpTag.classList.remove('active'); }
        };

        // ==========================================
        // SCENE 7: MODIFY TOOLS (TAB 7)
        // ==========================================
        const modifySceneGroup = new THREE.Group(); scene.add(modifySceneGroup);
        const modObjects = new THREE.Group(); modifySceneGroup.add(modObjects);
        const modHelpers = new THREE.Group(); modifySceneGroup.add(modHelpers);

        let modBaseMesh = null;
        const modMat = new THREE.MeshPhysicalMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.85, roughness: 0.2, metalness: 0.2 });
        const modGhostMat = new THREE.MeshPhysicalMaterial({ color: 0x86868b, transparent: true, opacity: 0.3 });

        window.updateModifyUI = function () {
            const tool = document.getElementById('mod-tool-select').value;
            const opts = document.getElementById('mod-options');
            opts.innerHTML = '';

            if (tool === 'align') {
                opts.innerHTML = `<p class="param-desc">Aligns one or more elements with a selected element or reference.</p>`;
            } else if (tool === 'offset') {
                opts.innerHTML = `
                    <p class="param-desc">Moves or copies an element a specified distance.</p>
                    <div class="slider-container"><label><span>Offset Distance</span> <span id="mod-off-val">50</span></label><input type="range" id="mod-off-slider" min="20" max="150" value="50" oninput="document.getElementById('mod-off-val').innerText=this.value"></div>
                `;
            } else if (tool === 'mirror') {
                opts.innerHTML = `
                    <p class="param-desc">Reverses the position of a selected element across an axis.</p>
                    <label class="checkbox-label"><input type="checkbox" id="mod-mir-copy" checked> Copy Object</label>
                `;
            } else if (tool === 'array') {
                opts.innerHTML = `
                    <p class="param-desc">Creates a linear array of elements.</p>
                    <div class="slider-container"><label><span>Number of Items</span> <span id="mod-arr-val">4</span></label><input type="range" id="mod-arr-slider" min="2" max="8" value="4" oninput="document.getElementById('mod-arr-val').innerText=this.value"></div>
                    <div class="slider-container"><label><span>Spacing Distance</span> <span id="mod-arr-dist-val">40</span></label><input type="range" id="mod-arr-dist-slider" min="20" max="80" value="40" oninput="document.getElementById('mod-arr-dist-val').innerText=this.value"></div>
                `;
            }
            resetModifyScene();
        };

        window.resetModifyScene = function () {
            while (modObjects.children.length > 0) modObjects.remove(modObjects.children[0]);
            while (modHelpers.children.length > 0) modHelpers.remove(modHelpers.children[0]);

            const tool = document.getElementById('mod-tool-select').value;

            if (tool === 'align') {
                // Target Plane
                const plane = new THREE.Mesh(new THREE.PlaneGeometry(150, 150), new THREE.MeshBasicMaterial({ color: 0x34c759, transparent: true, opacity: 0.3, side: THREE.DoubleSide }));
                plane.rotation.y = Math.PI / 2;
                plane.position.set(-80, 0, 50);
                modHelpers.add(plane);
                // Object to align
                modBaseMesh = new THREE.Mesh(new THREE.BoxGeometry(20, 60, 40), modMat);
                modBaseMesh.position.set(80, 0, 50);
                modObjects.add(modBaseMesh);
            }
            else if (tool === 'offset') {
                modBaseMesh = new THREE.Mesh(new THREE.BoxGeometry(150, 4, 20), modMat);
                modBaseMesh.position.set(0, -50, 10);
                modObjects.add(modBaseMesh);
            }
            else if (tool === 'mirror') {
                // Axis Line
                const axis = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -150, 0), new THREE.Vector3(0, 150, 0)]), new THREE.LineDashedMaterial({ color: 0xff2d55, dashSize: 10, gapSize: 10, linewidth: 2 }));
                axis.computeLineDistances();
                modHelpers.add(axis);
                // L-Shaped Object to show flipping clearly
                const shape = new THREE.Shape(); shape.moveTo(0, 0); shape.lineTo(40, 0); shape.lineTo(40, 10); shape.lineTo(10, 10); shape.lineTo(10, 50); shape.lineTo(0, 50); shape.lineTo(0, 0);
                modBaseMesh = new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 20, bevelEnabled: false }), modMat);
                modBaseMesh.position.set(20, -25, 0);
                modObjects.add(modBaseMesh);
            }
            else if (tool === 'array') {
                modBaseMesh = new THREE.Mesh(new THREE.CylinderGeometry(15, 15, 30), modMat);
                modBaseMesh.rotation.x = Math.PI / 2;
                modBaseMesh.position.set(-100, 0, 15);
                modObjects.add(modBaseMesh);
            }

            // Re-enable execute button
            document.getElementById('mod-execute-btn').style.opacity = '1';
            document.getElementById('mod-execute-btn').style.pointerEvents = 'auto';
        };

        window.executeModifyTool = function () {
            // Disable button during execution
            document.getElementById('mod-execute-btn').style.opacity = '0.5';
            document.getElementById('mod-execute-btn').style.pointerEvents = 'none';

            const tool = document.getElementById('mod-tool-select').value;

            if (tool === 'align') {
                const startX = modBaseMesh.position.x;
                const targetX = -70; // Front face touches plane at -80
                let p = 0;
                function anim() {
                    p += 0.05;
                    if (p <= 1) {
                        modBaseMesh.position.x = startX + (targetX - startX) * p;
                        requestAnimationFrame(anim);
                    } else {
                        modBaseMesh.material = new THREE.MeshPhysicalMaterial({ color: 0x34c759, transparent: true, opacity: 0.8 });
                        setTimeout(() => { modBaseMesh.material = modMat; }, 500);
                    }
                }
                anim();
            }
            else if (tool === 'offset') {
                const dist = parseInt(document.getElementById('mod-off-slider').value);
                const clone = modBaseMesh.clone();
                clone.material = modGhostMat.clone();
                clone.position.y += dist;
                modObjects.add(clone);
                let p = 0;
                function anim() {
                    p += 0.08;
                    if (p <= 1) { clone.scale.set(1, p, 1); requestAnimationFrame(anim); }
                    else { clone.scale.set(1, 1, 1); clone.material = modMat; }
                }
                anim();
            }
            else if (tool === 'mirror') {
                const isCopy = document.getElementById('mod-mir-copy').checked;
                const clone = modBaseMesh.clone();
                clone.material = modGhostMat.clone();
                clone.scale.x = -1; // Flip X
                clone.position.x = -modBaseMesh.position.x; // Move across axis

                if (!isCopy) modBaseMesh.visible = false;
                modObjects.add(clone);

                let p = 0;
                function anim() {
                    p += 0.08;
                    if (p <= 1) { clone.scale.z = p; requestAnimationFrame(anim); }
                    else { clone.scale.z = 1; clone.material = modMat; }
                }
                anim();
            }
            else if (tool === 'array') {
                const count = parseInt(document.getElementById('mod-arr-slider').value);
                const dist = parseInt(document.getElementById('mod-arr-dist-slider').value);

                let current = 1;
                function spawn() {
                    if (current < count) {
                        const clone = modBaseMesh.clone();
                        clone.position.x = modBaseMesh.position.x + (dist * current);
                        modObjects.add(clone);
                        current++;
                        setTimeout(spawn, 150);
                    }
                }
                spawn();
            }
        };

        // --- GLOBAL RENDER LOOP ---
        function animate() { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); }
        window.addEventListener("resize_mock", () => { camera.aspect = viewport.clientWidth / viewport.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(viewport.clientWidth, viewport.clientHeight); });

        // Initialize All Scenes safely
        setView('iso');
        updateGeoUIVisibility();
        drawGeometry();
        renderTables();
        updateRefScene();
        buildFlangeGeometry(100, csvData.find(d => d.ND === 100));
        updateParamTypeScene();
        updateFamPropsScene();
        updateModifyUI(); // Init Tab 7
        animate();
    })(document, mockWindow);

    const viewport = container.querySelector('#viewport');

    // Attach resize listener specifically for the viewport
    const resizeHandler = () => {
        if (!viewport) return;
        const width = viewport.clientWidth;
        const height = viewport.clientHeight;
        if (windowGlobals.camera && windowGlobals.renderer) {
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
