/* ==========================================================================
   VEHICLES DATA & CONFIGURATION - 3D BIKE & SCOOTER SIMULATOR
   ========================================================================== */

const VehiclesDatabase = [
    {
        id: "bike_r15",
        name: "Yamaha R15 V4",
        category: "bike",
        transmission: "manual",
        engineCC: 155,
        priceApprox: "₹1.85 Lakh",
        clutch: true,
        gears: 6,
        description: "A high-performance sports motorcycle with liquid-cooled engine and manual wet clutch system.",
        specs: {
            power: "18.4 PS",
            torque: "14.2 Nm",
            weight: "142 kg"
        },
        meshColor: 0x0000ff // Blue sports theme
    },
    {
        id: "bike_bullet",
        name: "Royal Enfield Bullet 350",
        category: "bike",
        transmission: "manual",
        engineCC: 349,
        priceApprox: "₹2.15 Lakh",
        clutch: true,
        gears: 5,
        description: "Classic heavy cruiser motorcycle known for its iconic thumping exhaust sound and torque.",
        specs: {
            power: "20.4 PS",
            torque: "27 Nm",
            weight: "195 kg"
        },
        meshColor: 0x222222 // Black classic theme
    },
    {
        id: "bike_apache",
        name: "TVS Apache RTR 160 4V",
        category: "bike",
        transmission: "manual",
        engineCC: 159.7,
        priceApprox: "₹1.35 Lakh",
        clutch: true,
        gears: 5,
        description: "A popular commuter-sports street bike designed for agility and responsive handling.",
        specs: {
            power: "17.55 PS",
            torque: "14.73 Nm",
            weight: "144 kg"
        },
        meshColor: 0xff3d00 // Racing Red theme
    },
    {
        id: "bike_z900",
        name: "Kawasaki Z900",
        category: "bike",
        transmission: "manual",
        engineCC: 948,
        priceApprox: "₹9.30 Lakh",
        clutch: true,
        gears: 6,
        description: "Advanced high-performance inline-four supernaked motorcycle for experienced riders.",
        specs: {
            power: "125 PS",
            torque: "98.6 Nm",
            weight: "212 kg"
        },
        meshColor: 0x33cc33 // Lime Green theme
    },
    {
        id: "scooter_activa",
        name: "Honda Activa 6G",
        category: "scooter",
        transmission: "automatic",
        engineCC: 109.51,
        priceApprox: "₹78,000",
        clutch: false, // Automatic CVT
        gears: 1, // CVT automatic
        description: "India's most popular family automatic scooter with V-Matic automatic transmission.",
        specs: {
            power: "7.79 PS",
            torque: "8.84 Nm",
            weight: "107 kg"
        },
        meshColor: 0xffffff // Pearl White theme
    },
    {
        id: "scooter_burgman",
        name: "Suzuki Burgman Street",
        category: "scooter",
        transmission: "automatic",
        engineCC: 124,
        priceApprox: "₹95,000",
        clutch: false,
        gears: 1,
        description: "Maxi-scooter style automatic commuter designed for ultimate comfort and storage space.",
        specs: {
            power: "8.7 PS",
            torque: "10 Nm",
            weight: "110 kg"
        },
        meshColor: 0x00d2ff // Metallic Blue theme
    }
];

// Current Garage Selection Index Tracker
let currentVehicleIndex = 0;

function getSelectedVehicleObject() {
    return VehiclesDatabase[currentVehicleIndex];
}

function getNextVehicle() {
    currentVehicleIndex = (currentVehicleIndex + 1) % VehiclesDatabase.length;
    updateGarageUI();
    return getSelectedVehicleObject();
}

function getPrevVehicle() {
    currentVehicleIndex = (currentVehicleIndex - 1 + VehiclesDatabase.length) % VehiclesDatabase.length;
    updateGarageUI();
    return getSelectedVehicleObject();
}

function updateGarageUI() {
    const v = getSelectedVehicleObject();
    
    const nameEl = document.getElementById('vehicle-name');
    const typeEl = document.getElementById('vehicle-type');
    const specEngine = document.getElementById('spec-engine');
    const specClutch = document.getElementById('spec-clutch');
    
    if (nameEl) nameEl.innerText = v.name;
    if (typeEl) typeEl.innerText = `${v.category.toUpperCase()} • ${v.priceApprox}`;
    if (specEngine) specEngine.innerText = `Engine: ${v.engineCC}cc (${v.specs.power})`;
    if (specClutch) specClutch.innerText = `Transmission: ${v.transmission.toUpperCase()}`;
    
    console.log(`Garage active vehicle updated to: ${v.name}`);
}

// Export for module systems if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VehiclesDatabase, getSelectedVehicleObject, getNextVehicle, getPrevVehicle };
}
