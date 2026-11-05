/* ==========================================================================
   ENVIRONMENT & ROAD CONDITIONS - 3D BIKE & SCOOTER SIMULATOR
   ========================================================================== */

// Environment Configurations Database
const EnvironmentDatabase = {
    village: {
        nameBN: "শান্ত গ্রাম্য রাস্তা",
        nameEN: "Quiet Village Road",
        skyColor: 0x87ceeb,
        groundColor: 0x557a46,
        fogDensity: 0.015,
        obstacles: ["trees", "cows", "narrow_path"],
        lighting: "day"
    },
    town: {
        nameBN: "ব্যস্ত শহরের রাস্তা",
        nameEN: "Busy Town Road",
        skyColor: 0x68788c,
        groundColor: 0x333333,
        fogDensity: 0.01,
        obstacles: ["cars", "buses", "pedestrians", "traffic_signals"],
        lighting: "day"
    },
    broken: {
        nameBN: "ভাঙা রাস্তা ও গর্ত",
        nameEN: "Broken Road & Potholes",
        skyColor: 0x99aab5,
        groundColor: 0x4a4a4a,
        fogDensity: 0.02,
        obstacles: ["potholes", "stones", "speed_breakers"],
        lighting: "day"
    },
    night: {
        nameBN: "রাতের পরিবেশ ও হেডলাইট",
        nameEN: "Nighttime Environment",
        skyColor: 0x050510,
        groundColor: 0x11111a,
        fogDensity: 0.03,
        obstacles: ["street_lights", "incoming_vehicles"],
        lighting: "night"
    }
};

let currentEnvironmentKey = 'village';

// Apply Selected Environment Settings to Three.js Scene
function setupEnvironment(envKey, sceneRef, directionalLightRef, ambientLightRef) {
    const env = EnvironmentDatabase[envKey];
    if (!env || !sceneRef) return;

    currentEnvironmentKey = envKey;

    // Update Background & Fog
    sceneRef.background = new THREE.Color(env.skyColor);
    sceneRef.fog = new THREE.FogExp2(env.skyColor, env.fogDensity);

    // Update Lighting based on Day/Night
    if (env.lighting === 'night') {
        if (ambientLightRef) ambientLightRef.intensity = 0.15;
        if (directionalLightRef) directionalLightRef.intensity = 0.2;
    } else {
        if (ambientLightRef) ambientLightRef.intensity = 0.7;
        if (directionalLightRef) directionalLightRef.intensity = 0.8;
    }

    console.log(`Environment switched to: ${env.nameEN} (${env.nameBN})`);
}

// Generate Simulated Obstacles or Road Features (Speed breakers, Potholes markers)
function generateEnvironmentDecorations(sceneRef) {
    if (!sceneRef) return;

    // Example: Adding simulated speed breakers along the road
    const breakerGeo = new THREE.BoxGeometry(6, 0.2, 0.8);
    const breakerMat = new THREE.MeshStandardMaterial({ color: 0xffea00, roughness: 0.5 });

    for (let i = 0; i < 5; i++) {
        const breaker = new THREE.Mesh(breakerGeo, breakerMat);
        breaker.position.set(0, 0.1, -15 * (i + 1));
        sceneRef.add(breaker);
    }
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EnvironmentDatabase, setupEnvironment, generateEnvironmentDecorations };
}
