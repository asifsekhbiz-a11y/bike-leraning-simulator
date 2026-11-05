/* ==========================================================================
   CONTROLS & MULTI-TOUCH SYSTEM - 3D BIKE & SCOOTER SIMULATOR
   ========================================================================== */

// Active Touch Controls State Tracker
const TouchControlsState = {
    throttleActive: false,
    clutchActive: false,
    frontBrakeActive: false,
    rearBrakeActive: false,
    hornActive: false,
    indicatorLeft: false,
    indicatorRight: false,
    isStarted: false
};

// Initialize Touch Controls Event Listeners for Mobile Screen
function initMultiTouchControls() {
    setupTouchButton('btn-throttle', 'throttleActive');
    setupTouchButton('btn-clutch', 'clutchActive');
    setupTouchButton('btn-front-brake', 'frontBrakeActive');
    setupTouchButton('btn-rear-brake', 'rearBrakeActive');
    setupTouchButton('btn-horn', 'hornActive');
    
    // Self Start Button Toggle
    const startBtn = document.getElementById('btn-start');
    if (startBtn) {
        startBtn.addEventListener('click', toggleVehicleEngine);
        startBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleVehicleEngine();
        });
    }

    console.log("Multi-touch control system initialized successfully.");
}

// Helper to bind touch and mouse events to on-screen buttons smoothly
function setupTouchButton(buttonId, stateKey) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    // Touch events for mobile multi-touch support
    btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        TouchControlsState[stateKey] = true;
        btn.classList.add('active-touch');
        triggerVisualFeedback(btn, true);
    }, { passive: false });

    btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        TouchControlsState[stateKey] = false;
        btn.classList.remove('active-touch');
        triggerVisualFeedback(btn, false);
    }, { passive: false });

    // Mouse fallback for desktop testing / debugging
    btn.addEventListener('mousedown', () => {
        TouchControlsState[stateKey] = true;
        btn.classList.add('active-touch');
    });

    btn.addEventListener('mouseup', () => {
        TouchControlsState[stateKey] = false;
        btn.classList.remove('active-touch');
    });
}

function triggerVisualFeedback(buttonElement, isActive) {
    if (isActive) {
        buttonElement.style.transform = 'scale(0.92)';
    } else {
        buttonElement.style.transform = 'scale(1)';
    }
}

// Engine Ignition Control Logic
function toggleVehicleEngine() {
    TouchControlsState.isStarted = !TouchControlsState.isStarted;
    
    const gearIndicator = document.getElementById('gear-val');
    if (gearIndicator) {
        gearIndicator.innerText = TouchControlsState.isStarted ? '1' : 'N';
    }

    if (TouchControlsState.isStarted) {
        console.log("Engine started successfully.");
    } else {
        console.log("Engine turned off.");
    }
}

// Dynamic Control Adjustment based on Vehicle Type (Bike vs Scooter)
function adjustControlsForVehicleType(type) {
    const clutchButton = document.getElementById('btn-clutch');
    const gearLever = document.getElementById('btn-gear');

    if (type === 'scooter') {
        // Scooters typically don't have manual clutch or foot gears
        if (clutchButton) clutchButton.style.display = 'none';
        if (gearLever) gearLever.style.display = 'none';
        console.log("Controls adjusted for Automatic Scooter (CVT).");
    } else {
        // Manual Motorcycles require clutch & gear controls
        if (clutchButton) clutchButton.style.display = 'flex';
        if (gearLever) gearLever.style.display = 'flex';
        console.log("Controls adjusted for Manual Motorcycle.");
    }
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TouchControlsState, initMultiTouchControls, adjustControlsForVehicleType };
}
