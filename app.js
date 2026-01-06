// Central Database Helper
const getDB = () => JSON.parse(localStorage.getItem('ecoTrackDB')) || {};
const saveDB = (db) => localStorage.setItem('ecoTrackDB', JSON.stringify(db));

// 1. CITY OFFICER LOGIC (Saves to 'cities' object)
function saveCityData() {
    const db = getDB();
    const date = document.getElementById('city-date').value;
    const city = document.getElementById('city-select').value;
    const weight = parseFloat(document.getElementById('weight').value) || 0;

    if (!date || weight <= 0) { alert("Enter valid date and weight!"); return; }

    if (!db[date]) db[date] = { cities: {}, industry: { weight: 0, res: 0, cap: 0, iron: 0, mag: 0, cop: 0, sil: 0 } };
    
    db[date].cities[city] = (db[date].cities[city] || 0) + weight;
    saveDB(db);
    alert(`Success: ${weight}kg added to ${city} for ${date}`);
}

// 2. INDUSTRY LOGIC (Saves to 'industry' object)
function saveIndustryData() {
    const db = getDB();
    const date = document.getElementById('ind-date').value;
    if (!date) { alert("Select date first!"); return; }

    if (!db[date]) db[date] = { cities: {}, industry: { weight: 0, res: 0, cap: 0, iron: 0, mag: 0, cop: 0, sil: 0 } };

    const ind = db[date].industry;
    ind.weight += parseFloat(document.getElementById('rec-weight').value) || 0;
    ind.res += parseInt(document.getElementById('res').value) || 0;
    ind.cap += parseInt(document.getElementById('cap').value) || 0;
    ind.iron += parseInt(document.getElementById('iron').value) || 0;
    ind.mag += parseInt(document.getElementById('mag').value) || 0;
    ind.cop += parseFloat(document.getElementById('cop').value) || 0;
    ind.sil += parseFloat(document.getElementById('sil').value) || 0;

    saveDB(db);
    alert("Industry Recovery Linked Successfully!");
}

// 3. DASHBOARD LOGIC (Calculates Sheets)
function loadDashboard() {
    const db = getDB();
    const date = document.getElementById('view-date').value;
    const tableBody = document.getElementById('table-body');
    const calcDiv = document.getElementById('calc-summary');

    // Reset
    tableBody.innerHTML = "";
    calcDiv.innerHTML = "";

    if (!date || !db[date]) {
        calcDiv.innerHTML = "<p style='color:#e67e22'>No data recorded for this date.</p>";
        return;
    }

    const data = db[date];
    let totalGen = 0;

    // Build Daily Sheet
    for (const [city, weight] of Object.entries(data.cities)) {
        totalGen += weight;
        tableBody.innerHTML += `<tr><td>${city}</td><td><strong>${weight} kg</strong></td></tr>`;
    }

    // Build Calculation Summary
    const recW = data.industry.weight;
    const eff = totalGen > 0 ? ((recW / totalGen) * 100).toFixed(1) : 0;

    calcDiv.innerHTML = `
        <div class="result-card">
            <p>Total Generation: <strong>${totalGen} kg</strong></p>
            <p>Total Recycled: <strong>${recW} kg</strong></p>
            <h3 style="color:#27ae60">Efficiency: ${eff}%</h3>
        </div>
        <div class="comp-results">
            <p>Resistors: ${data.industry.res} units</p>
            <p>Capacitors: ${data.industry.cap} units</p>
            <p>Copper: ${data.industry.cop} kg</p>
        </div>
    `;
}
// app.js
function saveCityData() {
    const db = JSON.parse(localStorage.getItem('ecoTrackDB')) || {};
    const date = document.getElementById('city-date').value;
    const city = document.getElementById('city-select').value;
    const weight = parseFloat(document.getElementById('weight').value) || 0;

    if (!date || weight <= 0) {
        alert("Please select a date and enter a valid weight!");
        return;
    }

    // Initialize the date entry if it doesn't exist
    if (!db[date]) {
        db[date] = { 
            cities: {}, 
            industry: { weight: 0, res: 0, cap: 0, iron: 0, mag: 0, cop: 0, sil: 0 } 
        };
    }

    // Update the city weight
    db[date].cities[city] = (db[date].cities[city] || 0) + weight;

    // Save back to localStorage
    localStorage.setItem('ecoTrackDB', JSON.stringify(db));
    
    alert(`Data Link Successful!\nCity: ${city}\nWeight: ${weight}kg\nDate: ${date}`);
    window.location.href = "index.html"; // Redirect back to login after success
}
function saveIndustryData() {
    // 1. Get current database
    const db = JSON.parse(localStorage.getItem('ecoTrackDB')) || {};
    
    // 2. Get Date
    const date = document.getElementById('ind-date').value;
    if (!date) {
        alert("Please select the date first!");
        return;
    }

    // 3. Initialize structure for this date if it's new
    if (!db[date]) {
        db[date] = { 
            cities: {}, 
            industry: { weight: 0, res: 0, cap: 0, iron: 0, mag: 0, cop: 0, sil: 0 } 
        };
    }

    // 4. Update values (Summing them with existing data for that day)
    const ind = db[date].industry;
    ind.weight += parseFloat(document.getElementById('rec-weight').value) || 0;
    ind.res += parseInt(document.getElementById('res').value) || 0;
    ind.cap += parseInt(document.getElementById('cap').value) || 0;
    ind.iron += parseInt(document.getElementById('iron').value) || 0;
    ind.mag += parseInt(document.getElementById('mag').value) || 0;
    ind.cop += parseFloat(document.getElementById('cop').value) || 0;
    ind.sil += parseFloat(document.getElementById('sil').value) || 0;

    // 5. Save and Redirect
    localStorage.setItem('ecoTrackDB', JSON.stringify(db));
    
    alert("Industry Recovery Linked Successfully!");
    window.location.href = "index.html";
}
// Function for CITY OFFICER Page
function saveCityData() {
    const db = JSON.parse(localStorage.getItem('ecoTrackDB')) || {};
    const date = document.getElementById('city-date').value;
    const city = document.getElementById('city-select').value;
    const weight = parseFloat(document.getElementById('weight').value) || 0;

    if (!date || weight <= 0) {
        alert("Enter valid date and weight!");
        return;
    }

    if (!db[date]) {
        db[date] = { cities: {}, industry: { weight: 0, res: 0, cap: 0, iron: 0, mag: 0, cop: 0, sil: 0 } };
    }

    db[date].cities[city] = (db[date].cities[city] || 0) + weight;
    localStorage.setItem('ecoTrackDB', JSON.stringify(db));
    alert("City Data Logged Successfully!");
    window.location.href = "index.html";
}

// Function for INDUSTRY Page
function saveIndustryData() {
    const db = JSON.parse(localStorage.getItem('ecoTrackDB')) || {};
    const date = document.getElementById('ind-date').value;
    
    if (!date) { alert("Select date first!"); return; }

    if (!db[date]) {
        db[date] = { cities: {}, industry: { weight: 0, res: 0, cap: 0, iron: 0, mag: 0, cop: 0, sil: 0 } };
    }

    const ind = db[date].industry;
    ind.weight += parseFloat(document.getElementById('rec-weight').value) || 0;
    ind.res += parseInt(document.getElementById('res').value) || 0;
    ind.cap += parseInt(document.getElementById('cap').value) || 0;
    ind.iron += parseInt(document.getElementById('iron').value) || 0;
    ind.mag += parseInt(document.getElementById('mag').value) || 0;
    ind.cop += parseFloat(document.getElementById('cop').value) || 0;
    ind.sil += parseFloat(document.getElementById('sil').value) || 0;

    localStorage.setItem('ecoTrackDB', JSON.stringify(db));
    alert("Industry Recovery Data Synced!");
    window.location.href = "index.html";
}

// Function for DASHBOARD Page
function loadDashboard() {
    const db = JSON.parse(localStorage.getItem('ecoTrackDB')) || {};
    const selectedDate = document.getElementById('view-date').value;
    const tableBody = document.getElementById('table-body');
    const calcDiv = document.getElementById('calc-summary');

    tableBody.innerHTML = "";
    calcDiv.innerHTML = "";

    if (!selectedDate || !db[selectedDate]) {
        calcDiv.innerHTML = "<h4 style='color:orange;'>No data submitted for this date.</h4>";
        return;
    }

    const data = db[selectedDate];
    let totalGen = 0;

    // 1. Fill Daily Generation Sheet
    for (const city in data.cities) {
        let weight = data.cities[city];
        totalGen += weight;
        tableBody.innerHTML += `<tr><td>${city}</td><td><strong>${weight} kg</strong></td></tr>`;
    }

    // 2. Fill Calculation Summary
    const recW = data.industry.weight;
    const efficiency = totalGen > 0 ? ((recW / totalGen) * 100).toFixed(1) : 0;

    calcDiv.innerHTML = `
        <div style="background:#f1f9f7; padding:15px; border-radius:10px; border-left:5px solid #00b894;">
            <p>Total E-Waste: <strong>${totalGen} kg</strong></p>
            <p>Recycled: <strong>${recW} kg</strong></p>
            <h3>Efficiency: ${efficiency}%</h3>
        </div>
        <div style="margin-top:20px;">
            <p>🔹 Resistors: ${data.industry.res} units</p>
            <p>🔹 Capacitors: ${data.industry.cap} units</p>
            <p>🔹 Copper: ${data.industry.cop} kg</p>
        </div>
    `;
}
function loadAnalytics() {
    // 1. Get shared database
    const db = JSON.parse(localStorage.getItem('ecoTrackDB')) || {};
    const selectedDate = document.getElementById('view-date').value;
    
    // UI Elements
    const tableBody = document.getElementById('table-body');
    const mapArea = document.getElementById('map-area');
    const calcSummary = document.getElementById('calc-summary');

    // Reset Views
    tableBody.innerHTML = "";
    mapArea.innerHTML = "";
    calcSummary.innerHTML = "";

    // Check if data exists for the date
    if (!selectedDate || !db[selectedDate]) {
        calcSummary.innerHTML = "<div class='stat-item'><h4>Status</h4><p>No Data Found</p></div>";
        mapArea.innerHTML = "<p>No entries for this date.</p>";
        return;
    }

    const data = db[selectedDate];
    let totalCollected = 0;

    // --- PART 1: DAILY GENERATION SHEET & HEATMAP ---
    for (const city in data.cities) {
        const weight = data.cities[city];
        totalCollected += weight;

        // Add to Table
        tableBody.innerHTML += `<tr><td>${city}</td><td><b>${weight} kg</b></td></tr>`;

        // Add to Heatmap (Green to Red based on 200kg threshold)
        let color = weight > 200 ? "#d63031" : (weight > 100 ? "#e67e22" : "#00b894");
        mapArea.innerHTML += `<div class="city-bubble" style="background:${color}">${city}<br>${weight}kg</div>`;
    }

    // --- PART 2: CALCULATION SUMMARY ---
    const recWeight = data.industry.weight || 0;
    const efficiency = totalCollected > 0 ? ((recWeight / totalCollected) * 100).toFixed(1) : 0;

    calcSummary.innerHTML = `
        <div class="stat-item">
            <h4>Total Collected</h4>
            <p>${totalCollected.toLocaleString()} kg</p>
        </div>
        <div class="stat-item">
            <h4>Total Recycled</h4>
            <p>${recWeight.toLocaleString()} kg</p>
        </div>
        <div class="stat-item">
            <h4>Recycle Efficiency</h4>
            <p class="efficiency-high">${efficiency}%</p>
        </div>
        <div style="margin-top:10px; font-size:0.9rem; color:#636e72;">
            <b>Materials Recovered:</b><br>
            Resistors: ${data.industry.res || 0} units | 
            Copper: ${data.industry.cop || 0} kg
        </div>
    `;
}