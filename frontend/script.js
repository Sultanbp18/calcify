// Tab navigation
document.addEventListener('DOMContentLoaded', function() {
    // Main tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabName).classList.add('active');
        });
    });

    // Sub-tabs
    const subTabButtons = document.querySelectorAll('.sub-tab-button');
    const subTabContents = document.querySelectorAll('.sub-tab-content');

    subTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const subTabName = button.getAttribute('data-sub-tab');

            // Remove active class from all sub-buttons and sub-contents
            subTabButtons.forEach(btn => btn.classList.remove('active'));
            subTabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked sub-button and corresponding sub-content
            button.classList.add('active');
            document.getElementById(subTabName).classList.add('active');
        });
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        darkModeToggle.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
        localStorage.setItem('darkMode', isDark);
    });

    // Load dark mode preference (default to dark)
    let savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === null) {
        savedDarkMode = 'true';
        localStorage.setItem('darkMode', 'true');
    }
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.textContent = '☀️ Light Mode';
    }

    // Form submissions
    setupFormHandlers();
});

// Setup form handlers
function setupFormHandlers() {
    // Dosimetry form
    document.getElementById('dosimetry-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            temperature: parseFloat(document.getElementById('temperature').value),
            pressure: parseFloat(document.getElementById('pressure').value),
            chamber: document.getElementById('chamber').value,
            k_elec: parseFloat(document.getElementById('k_elec').value),
            nd_w: parseFloat(document.getElementById('nd_w').value),
            mu: parseFloat(document.getElementById('mu').value),
            clinical_pdd: parseFloat(document.getElementById('clinical_pdd').value),
            v1: parseFloat(document.getElementById('v1').value),
            v2: parseFloat(document.getElementById('v2').value),
            m1: parseFloat(document.getElementById('m1').value),
            mmin: parseFloat(document.getElementById('mmin').value),
            m2: parseFloat(document.getElementById('m2').value),
            tpr: parseFloat(document.getElementById('tpr').value)
        };

        try {
            const response = await fetch('/api/dosimetry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Calculation failed');
            }

            const result = await response.json();
            displayDosimetryResults(result);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // Field size form
    document.getElementById('field-size-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            x: parseFloat(document.getElementById('x').value),
            y: parseFloat(document.getElementById('y').value),
            x1: parseFloat(document.getElementById('x1').value),
            x2: parseFloat(document.getElementById('x2').value),
            y1: parseFloat(document.getElementById('y1').value),
            y2: parseFloat(document.getElementById('y2').value)
        };

        try {
            const response = await fetch('/api/field_size', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Calculation failed');
            }

            const result = await response.json();
            displayFieldSizeResults(result);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // Table position form
    document.getElementById('table-position-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            set_shift: parseFloat(document.getElementById('set-shift').value),
            measured_shift: parseFloat(document.getElementById('measured-shift').value)
        };

        try {
            const response = await fetch('/api/table_position', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Calculation failed');
            }

            const result = await response.json();
            displayTablePositionResults(result);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // ODI form
    document.getElementById('odi-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            set_distance: parseFloat(document.getElementById('set-distance').value),
            measured_distance: parseFloat(document.getElementById('measured-distance').value)
        };

        try {
            const response = await fetch('/api/odi', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Calculation failed');
            }

            const result = await response.json();
            displayODIResults(result);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // Gantry angle form
    document.getElementById('gantry-angle-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            set_angle: parseFloat(document.getElementById('set-angle-gantry').value),
            measured_angle: parseFloat(document.getElementById('measured-angle-gantry').value)
        };

        try {
            const response = await fetch('/api/gantry_angle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Calculation failed');
            }

            const result = await response.json();
            displayGantryAngleResults(result);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // Collimator angle form
    document.getElementById('collimator-angle-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = {
            set_angle: parseFloat(document.getElementById('set-angle-collimator').value),
            measured_angle: parseFloat(document.getElementById('measured-angle-collimator').value)
        };

        try {
            const response = await fetch('/api/collimator_angle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Calculation failed');
            }

            const result = await response.json();
            displayCollimatorAngleResults(result);
        } catch (error) {
            alert('Error: ' + error.message);
        }
    });

    // Export handlers
    setupExportHandlers();
}

// Display functions
function displayDosimetryResults(result) {
    document.getElementById('dosis-absolute').textContent = result.dosis_absolute;
    document.getElementById('deviasi').textContent = result.deviasi;
    document.getElementById('dosimetry-results').style.display = 'block';
}

function displayFieldSizeResults(result) {
    document.getElementById('delta-x').textContent = result.delta_x;
    document.getElementById('delta-y').textContent = result.delta_y;
    document.getElementById('field-size-status').textContent = result.lulus ? 'LULUS' : 'TIDAK LULUS';
    document.getElementById('field-size-results').style.display = 'block';
}

function displayTablePositionResults(result) {
    document.getElementById('delta-s-table').textContent = result.delta_s;
    document.getElementById('table-position-status').textContent = result.lulus ? 'LULUS' : 'TIDAK LULUS';
    document.getElementById('table-position-results').style.display = 'block';
}

function displayODIResults(result) {
    document.getElementById('delta-d').textContent = result.delta_d;
    document.getElementById('odi-status').textContent = result.lulus ? 'LULUS' : 'TIDAK LULUS';
    document.getElementById('odi-results').style.display = 'block';
}

function displayGantryAngleResults(result) {
    document.getElementById('delta-s-gantry').textContent = result.delta_s;
    document.getElementById('gantry-angle-status').textContent = result.lulus ? 'LULUS' : 'TIDAK LULUS';
    document.getElementById('gantry-angle-results').style.display = 'block';
}

function displayCollimatorAngleResults(result) {
    document.getElementById('delta-s-collimator').textContent = result.delta_s;
    document.getElementById('collimator-angle-status').textContent = result.lulus ? 'LULUS' : 'TIDAK LULUS';
    document.getElementById('collimator-angle-results').style.display = 'block';
}

// Export handlers
function setupExportHandlers() {
    document.getElementById('export-dosimetry').addEventListener('click', () => {
        const data = {
            type: 'dosimetry',
            dosis_absolute: document.getElementById('dosis-absolute').textContent,
            deviasi: document.getElementById('deviasi').textContent,
            timestamp: new Date().toISOString()
        };
        downloadJSON(data, 'dosimetry-results.json');
    });

    document.getElementById('export-field-size').addEventListener('click', () => {
        const data = {
            type: 'field_size',
            delta_x: document.getElementById('delta-x').textContent,
            delta_y: document.getElementById('delta-y').textContent,
            status: document.getElementById('field-size-status').textContent,
            timestamp: new Date().toISOString()
        };
        downloadJSON(data, 'field-size-results.json');
    });

    document.getElementById('export-table-position').addEventListener('click', () => {
        const data = {
            type: 'table_position',
            delta_s: document.getElementById('delta-s-table').textContent,
            status: document.getElementById('table-position-status').textContent,
            timestamp: new Date().toISOString()
        };
        downloadJSON(data, 'table-position-results.json');
    });

    document.getElementById('export-odi').addEventListener('click', () => {
        const data = {
            type: 'odi',
            delta_d: document.getElementById('delta-d').textContent,
            status: document.getElementById('odi-status').textContent,
            timestamp: new Date().toISOString()
        };
        downloadJSON(data, 'odi-results.json');
    });

    document.getElementById('export-gantry-angle').addEventListener('click', () => {
        const data = {
            type: 'gantry_angle',
            delta_s: document.getElementById('delta-s-gantry').textContent,
            status: document.getElementById('gantry-angle-status').textContent,
            timestamp: new Date().toISOString()
        };
        downloadJSON(data, 'gantry-angle-results.json');
    });

    document.getElementById('export-collimator-angle').addEventListener('click', () => {
        const data = {
            type: 'collimator_angle',
            delta_s: document.getElementById('delta-s-collimator').textContent,
            status: document.getElementById('collimator-angle-status').textContent,
            timestamp: new Date().toISOString()
        };
        downloadJSON(data, 'collimator-angle-results.json');
    });
}

// Utility function to download JSON
function downloadJSON(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}