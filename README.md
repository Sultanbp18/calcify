# Calcify - Radiotherapy Calculation Tools

A web-based application for radiotherapy quality assurance calculations, implementing TRS-398 dosimetry and mechanical tests.

## Features

### Dosimetry Tab (TRS-398)
- Absolute dose calculation using TRS-398 protocol
- Input parameters: temperature, pressure, chamber, calibration factors, MU, PDD, voltages, readings
- Results: Absolute dose in cGy/MU and deviation percentage

### Mechanical Tests Tab
- **Field Size**: Field size indicator test (10x10 cm)
- **Table Position**: Table position indicator test
- **ODI**: Optical Distance Indicator test
- **Gantry Angle**: Gantry angle indicator test
- **Collimator Angle**: Collimator angle indicator test

All mechanical tests calculate deviations and provide pass/fail status based on tolerance thresholds.

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Python Flask with pylinac library
- **Containerization**: Docker & Docker Compose

## Project Structure

```
calcify/
├── frontend/
│   ├── index.html      # Main HTML structure
│   ├── styles.css      # Styling with dark mode
│   └── script.js       # Frontend logic and API calls
├── backend/
│   ├── app.py          # Flask API server
│   └── requirements.txt # Python dependencies
├── docker/
│   ├── Dockerfile      # Backend container
│   └── ...             # Backend files copied here
├── docker-compose.yml  # Multi-container setup
├── notebooks/          # Original calculation notebooks
└── README.md
```

## Installation & Running

### Prerequisites
- Docker and Docker Compose installed

### Quick Start
1. Clone the repository
2. Run the application:
   ```bash
   docker-compose up --build
   ```
3. Open your browser to `http://localhost:8080`

### Manual Setup (without Docker)
1. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
2. Run the backend:
   ```bash
   python backend/app.py
   ```
3. Serve the frontend files (e.g., using a local server or opening index.html directly)
4. Update API URLs in `frontend/script.js` if needed

## API Endpoints

- `POST /api/dosimetry` - TRS-398 dose calculation
- `POST /api/field_size` - Field size test
- `POST /api/table_position` - Table position test
- `POST /api/odi` - ODI test
- `POST /api/gantry_angle` - Gantry angle test
- `POST /api/collimator_angle` - Collimator angle test

## Usage

1. Select the appropriate tab (Dosimetry or Mechanical Tests)
2. For Mechanical Tests, choose the specific sub-test
3. Fill in the required input fields
4. Click "Calculate" to get results
5. Use the "Export" button to download results as JSON

## Dark Mode

Toggle dark mode using the button in the header. Preference is saved in localStorage.

## Disclaimer

This tool is for educational and research purposes only. Always consult with qualified medical professionals for clinical decisions.

## License

[Add appropriate license information]