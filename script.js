/* ==========================================================================
   MASTER SCRIPT - 3D BIKE & SCOOTER RIDING LEARNING SIMULATOR
   ========================================================================== */

// Global Game State
const GameState = {
    currentScreen: 'main-menu',
    selectedVehicleId: 'bike_r15',
    vehicleType: 'bike',
    currentSpeed: 0,
    currentGear: 'N',
    isEngineRunning: false,
    controlsState: {
        throttle: false,
        clutch: false,
        frontBrake: false,
        rearBrake: false
    },
    progress: {
        completedLessons: [],
        currentLesson: 1,
        unlockedVehicles: ['bike_r15', 'scooter_activa']
    },
    settings: {
        soundEnabled: true,
        volume: 0.8,
        graphicsQuality: 'medium'
    }
};

// 30 Vehicle Parts Database with Bengali & English Details
const vehiclePartsDatabase = [
    { id: 1, bn: "হ্যান্ডেল", en: "Handlebar", desc: "বাইক বা স্কুটার ডানে-বামে ঘুরিয়ে দিক পরিবর্তন করতে এবং গাড়ি নিয়ন্ত্রণ করতে সাহায্য করে।" },
    { id: 2, bn: "অ্যাক্সিলারেটর / থ্রটল", en: "Accelerator / Throttle", desc: "ডান হাতের মুঠো ঘুরিয়ে ইঞ্জিনের গতি এবং গাড়ির স্পিড বাড়ানো বা কমানো হয়।" },
    { id: 3, bn: "ক্লাচ লিভার", en: "Clutch Lever", desc: "বাম হাতের কাছে থাকে। গিয়ার পরিবর্তনের সময় ইঞ্জিন থেকে চাকার পাওয়ার সংযোগ বিচ্ছিন্ন করতে ব্যবহৃত হয়।" },
    { id: 4, bn: "সামনের ব্রেক লিভার", en: "Front Brake Lever", desc: "ডান হাতের আঙুলের নিচে থাকে। সামনের চাকায় ব্রেক কষে গাড়ি দ্রুত থামায়।" },
    { id: 5, bn: "পিছনের ব্রেক প্যাডেল", en: "Rear Brake Pedal", desc: "ডান পায়ের নিচে থাকে। পিছনের চাকায় ব্রেক প্রয়োগ করে সুষম থামানো নিশ্চিত করে।" },
    { id: 6, bn: "গিয়ার লিভার", en: "Gear Lever", desc: "বাম পায়ের সাহায্যে গিয়ার বাড়িয়ে বা কমিয়ে ইঞ্জিনের শক্তি ও গতি নিয়ন্ত্রণ করা হয়।" },
    { id: 7, bn: "সেলফ স্টার্ট বাটন", en: "Self-Start Button", desc: "ইলেকট্রিক মোটর চালিত ব্যাটারির সাহায্যে ইঞ্জিন স্বয়ংক্রিয়ভাবে চালু করে।" },
    { id: 8, bn: "কিক স্টার্ট", en: "Kick Starter", desc: "পায়ের সাহায্যে হাতুড়ি বা লিভারে চাপ দিয়ে ম্যানুয়ালি ইঞ্জিন স্টার্ট করার বিকল্প ব্যবস্থা।" },
    { id: 9, bn: "ইগনিশন চাবি", en: "Ignition Key", desc: "গাড়ির মেইন ইলেকট্রিক সার্কিট ও ইঞ্জিন অন-অফ করার চাবি।" },
    { id: 10, bn: "সিট", en: "Seat", desc: "চালক ও যাত্রীর বসার আরামদায়ক স্থান।" },
    { id: 11, bn: "হর্ন বাটন", en: "Horn Button", desc: "সতর্কবার্তা দেওয়ার জন্য শব্দ তৈরি করতে ব্যবহৃত হয়।" },
    { id: 12, bn: "ইন্ডিকেটর সুইচ", en: "Indicator Switch", desc: "ডান বা বাম দিকে মোড় নেওয়ার সময় সংকেত লাইট জ্বালাতে সাহায্য করে।" },
    { id: 13, bn: "হেডলাইট সুইচ", en: "Headlight Switch", desc: "রাতের অন্ধকারে রাস্তা দেখার জন্য প্রধান আলো অন বা অফ করে।" },
    { id: 14, bn: "হাই/লো বিম সুইচ", en: "High/Low Beam Switch", desc: "হেডলাইটের আলোর উচ্চতা বা তীব্রতা দূর ও কাছের জন্য পরিবর্তন করে।" },
    { id: 15, bn: "ইঞ্জিন কিল সুইচ", en: "Engine Kill Switch", desc: "জরুরি মুহূর্তে মুহূর্তের মধ্যে ইঞ্জিন বন্ধ করার বাটন।" },
    { id: 16, bn: "পাস সুইচ", en: "Pass Switch", desc: "সামনের গাড়িকে ওভারটেক করার সময় ফ্ল্যাশার লাইট সিগন্যাল দিতে ব্যবহৃত হয়।" },
    { id: 17, bn: "ফুয়েল ট্যাংক ক্যাপ", en: "Fuel Tank Cap", desc: "জ্বালানি বা পেট্রোল ঢালার ট্যাংকের মুখ ঢাকনা।" },
    { id: 18, bn: "ফুটরেস্ট", en: "Footrest", desc: "চালক ও যাত্রীর পা রাখার নির্দিষ্ট আরামদায়ক প্যাডেল।" },
    { id: 19, bn: "সাইড স্ট্যান্ড", en: "Side Stand", desc: "গাড়ি পার্ক করার সময় একপাশে হেলিয়ে দাঁড় করিয়ে রাখতে ব্যবহৃত হয়।" },
    { id: 20, bn: "সেন্টার স্ট্যান্ড", en: "Center Stand", desc: "গাড়িকে সোজা ও নিরাপদে মাঝখানে দাঁড় করিয়ে রাখার ডাবল স্ট্যান্ড।" },
    { id: 21, bn: "রিয়ারভিউ মিরর", en: "Rearview Mirror", desc: "পেছনের ট্রাফিক দেখার জন্য ড্রাইভারের দুই পাশের আয়না।" },
    { id: 22, bn: "স্পিডোমিটার", en: "Speedometer", desc: "গাড়ির বর্তমান গতি (km/h) এবং মোট অতিক্রান্ত দূরত্ব দেখায়।" },
    { id: 23, bn: "ফুয়েল গেজ", en: "Fuel Gauge", desc: "ট্যাংকে কতটুকু পেট্রোল বা জ্বালানি অবশিষ্ট আছে তা প্রদর্শন করে।" },
    { id: 24, bn: "মোবাইল হোল্ডার", en: "Mobile Holder", desc: "স্মার্টফোন ম্যাপ বা জিপিএস দেখার জন্য হ্যান্ডেলে সুরক্ষিত রাখার স্ট্যান্ড।" },
    { id: 25, bn: "ব্রেক লাইট সুইচ", en: "Brake Light Switch", desc: "ব্রেক চাপলে পিছনের লাল বাতি জ্বালিয়ে পেছনের গাড়িকে সতর্ক করে।" },
    { id: 26, bn: "চোক লিভার", en: "Choke Lever", desc: "শীতকালে বা ঠান্ডা ইঞ্জিনে ফুয়েল-এয়ার মিক্সচার বাড়িয়ে সহজে স্টার্ট করতে সাহায্য করে।" },
    { id: 27, bn: "সিট লক", en: "Seat Lock", desc: "সিটের নিচে টুলস ও কাগজপত্র সুরক্ষিত রাখতে খোলার চাবি লক।" },
    { id: 28, bn: "হেলমেট লক", en: "Helmet Lock", desc: "গাড়ি রেখে যাওয়ার সময় হেলমেট আটকে সুরক্ষিত রাখার হুক বা লক।" },
    { id: 29, bn: "ট্যাংক গ্রিপ", en: "Tank Grip", desc: "ব্রেকিংয়ের সময় হাঁটু দিয়ে ট্যাংক শক্ত করে ধরে রাখার প্যাড।" },
    { id: 30, bn: "ইঞ্জিন কভার", en: "Engine Guard", desc: "নিচের অংশ পাথর বা আঘাত থেকে ইঞ্জিনকে রক্ষা করার গার্ড।" }
];

// Three.js Core Variables
let scene, camera, renderer, vehicleMesh, orbitControls;

/* --------------------------------------------------------------------------
   1. NAVIGATION & SCREEN MANAGEMENT
   -------------------------------------------------------------------------- */
function navigateTo(screenId) {
    document.querySelectorAll('.overlay-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
        GameState.currentScreen = screenId;
    }

    const hudEl = document.getElementById('lesson-hud');
    if (hudEl) {
        if (screenId === 'lesson-hud') {
            hudEl.classList.remove('hidden');
        } else {
            hudEl.classList.add('hidden');
        }
    }
}

function showMainMenu() {
    navigateTo('main-menu');
}

function openGarage(type) {
    GameState.vehicleType = type;
    if (typeof updateGarageUI === 'function') {
        updateGarageUI();
    } else {
        const titleEl = document.getElementById('garage-title');
        const nameEl = document.getElementById('vehicle-name');
        const typeEl = document.getElementById('vehicle-type');
        
        if (titleEl) titleEl.innerText = type === 'bike' ? 'Bike Garage (বাইক গ্যারেজ)' : 'Scooter Garage (স্কুটার গ্যারেজ)';
        if (nameEl) nameEl.innerText = type === 'bike' ? 'Yamaha R15 V4' : 'Honda Activa 6G';
        if (typeEl) typeEl.innerText = type === 'bike' ? 'Manual Transmission' : 'Automatic CVT Transmission';
    }
    navigateTo('garage-screen');
}

function prevVehicle() {
    if (typeof getPrevVehicle === 'function') {
        const v = getPrevVehicle();
        updateVehicle3DMesh(v);
    }
}

function nextVehicle() {
    if (typeof getNextVehicle === 'function') {
        const v = getNextVehicle();
        updateVehicle3DMesh(v);
    }
}

function selectCurrentVehicle() {
    let selectedVehicle = null;
    if (typeof getSelectedVehicleObject === 'function') {
        selectedVehicle = getSelectedVehicleObject();
        GameState.selectedVehicleId = selectedVehicle.id;
        GameState.vehicleType = selectedVehicle.category;
    }
    
    if (typeof adjustControlsForVehicleType === 'function') {
        adjustControlsForVehicleType(GameState.vehicleType);
    }

    navigateTo('lesson-hud');
    initSimulationScene();

    if (typeof loadLessonContent === 'function') {
        loadLessonContent(GameState.progress.currentLesson);
    }
}

/* --------------------------------------------------------------------------
   2. PARTS LEARNING SYSTEM (30 PARTS)
   -------------------------------------------------------------------------- */
function initPartsLearning() {
    const listContainer = document.getElementById('parts-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    vehiclePartsDatabase.forEach((part, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${index + 1}. ${part.bn}</strong> (${part.en})`;
        li.onclick = () => selectPartDetails(part, li);
        listContainer.appendChild(li);
    });
}

function selectPartDetails(part, element) {
    document.querySelectorAll('#parts-list li').forEach(el => el.classList.remove('active'));
    if (element) element.classList.add('active');

    const bnEl = document.getElementById('part-title-bn');
    const enEl = document.getElementById('part-title-en');
    const descEl = document.getElementById('part-description');
    const actionBox = document.getElementById('part-demo-action');

    if (bnEl) bnEl.innerText = part.bn;
    if (enEl) enEl.innerText = part.en;
    if (descEl) descEl.innerText = part.desc;
    if (actionBox) actionBox.classList.remove('hidden');
}

function triggerPartAction() {
    alert("যন্ত্রাংশটির ৩ডি সিমুলেশন ও ইন্টারেক্টিভ ইন্টারঅ্যাকশন পরীক্ষা করা হচ্ছে।");
}

/* --------------------------------------------------------------------------
   3. THREE.JS 3D ENGINE & SCENE
   -------------------------------------------------------------------------- */
function initSimulationScene() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    if (!scene) {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x0f0f15);

        camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 2.5, 5);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        if (typeof THREE.OrbitControls !== 'undefined') {
            orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
            orbitControls.enableDamping = true;
            orbitControls.maxPolarAngle = Math.PI / 2 - 0.05;
        }

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        scene.add(dirLight);

        const planeGeo = new THREE.PlaneGeometry(100, 100);
        const planeMat = new THREE.MeshStandardMaterial({ color: 0x1f1f2e, roughness: 0.8 });
        const plane = new THREE.Mesh(planeGeo, planeMat);
        plane.rotation.x = -Math.PI / 2;
        scene.add(plane);

        createVehicle3DMesh();

        if (typeof generateEnvironmentDecorations === 'function') {
            generateEnvironmentDecorations(scene);
        }

        window.addEventListener('resize', onWindowResize);
        animateSimulation();
    }
}

function createVehicle3DMesh() {
    if (vehicleMesh) scene.remove(vehicleMesh);

    const vehicleGroup = new THREE.Group();
    let meshColor = 0xff6b00;

    if (typeof getSelectedVehicleObject === 'function') {
        const v = getSelectedVehicleObject();
        if (v && v.meshColor) meshColor = v.meshColor;
    }

    const bodyGeo = new THREE.BoxGeometry(0.8, 0.6, 2.0);
    const bodyMat = new THREE.MeshStandardMaterial({ color: meshColor, roughness: 0.3 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.y = 0.6;
    vehicleGroup.add(bodyMesh);

    const wheelGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });

    const frontWheel = new THREE.Mesh(wheelGeo, wheelMat);
    frontWheel.rotation.z = Math.PI / 2;
    frontWheel.position.set(0, 0.3, -0.8);
    vehicleGroup.add(frontWheel);

    const rearWheel = new THREE.Mesh(wheelGeo, wheelMat);
    rearWheel.rotation.z = Math.PI / 2;
    rearWheel.position.set(0, 0.3, 0.8);
    vehicleGroup.add(rearWheel);

    scene.add(vehicleGroup);
    vehicleMesh = vehicleGroup;
}

function updateVehicle3DMesh(vehicleObj) {
    if (!vehicleMesh || !vehicleObj) return;
    vehicleMesh.children[0].material.color.setHex(vehicleObj.meshColor || 0xff6b00);
}

function onWindowResize() {
    if (!camera || !renderer) return;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animateSimulation() {
    requestAnimationFrame(animateSimulation);

    if (orbitControls) orbitControls.update();

    if (GameState.isEngineRunning && vehicleMesh) {
        if (GameState.controlsState.throttle) {
            GameState.currentSpeed = Math.min(GameState.currentSpeed + 0.5, 90);
        } else {
            GameState.currentSpeed = Math.max(GameState.currentSpeed - 0.4, 0);
        }

        if (GameState.controlsState.frontBrake || GameState.controlsState.rearBrake) {
            GameState.currentSpeed = Math.max(GameState.currentSpeed - 1.2, 0);
        }

        vehicleMesh.position.z -= GameState.currentSpeed * 0.002;
        if (vehicleMesh.position.z < -40) vehicleMesh.position.z = 0;
    }

    updateHUDStats();

    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

/* --------------------------------------------------------------------------
   4. HUD & CONTROLS UPDATES
   -------------------------------------------------------------------------- */
function updateHUDStats() {
    const speedEl = document.getElementById('speed-val');
    const gearEl = document.getElementById('gear-val');

    if (speedEl) speedEl.innerText = Math.round(GameState.currentSpeed);
    if (gearEl) gearEl.innerText = GameState.isEngineRunning ? GameState.currentGear : 'N';
}

/* --------------------------------------------------------------------------
   5. SAVE & PROGRESS SYSTEM
   -------------------------------------------------------------------------- */
function loadGameProgress() {
    const saved = localStorage.getItem('bike_simulator_progress');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            GameState.progress = data;
        } catch (e) {
            console.error("Progress parse error:", e);
        }
    }
}

function saveGameProgress() {
    localStorage.setItem('bike_simulator_progress', JSON.stringify(GameState.progress));
}

/* --------------------------------------------------------------------------
   6. DOM INITIALIZATION
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
    loadGameProgress();
    initPartsLearning();

    if (typeof initMultiTouchControls === 'function') {
        initMultiTouchControls();
    }

    console.log("3D Bike & Scooter Learning Simulator Master Script initialized.");
});
