from flask import Flask, request, jsonify
from flask_cors import CORS
from pylinac.calibration import trs398
import math

app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/api/dosimetry', methods=['POST'])
def calculate_dosimetry():
    data = request.json

    try:
        # Extract inputs
        temp = float(data['temperature'])
        press_mmHg = float(data['pressure'])
        press = trs398.mmHg2kPa(press_mmHg)
        chamber = data['chamber']
        k_elec = float(data['k_elec'])
        nd_w = float(data['nd_w'])
        mu = float(data['mu'])
        clinical_pdd = float(data['clinical_pdd'])
        v1 = float(data['v1'])
        v2 = float(data['v2'])
        m1 = float(data['m1'])
        mmin = float(data['mmin'])
        m2 = float(data['m2'])
        tpr = float(data['tpr'])

        # Section 3: dosimeter corrections
        k_tp = trs398.k_tp(temp=temp, press=press)
        k_pol = trs398.k_pol(m_reference=m1, m_opposite=mmin)
        k_s = trs398.k_s(voltage_reference=v1, voltage_reduced=v2,
                         m_reference=m1, m_reduced=m2)
        m_corrected = trs398.m_corrected(m_reference=m1,
                                         k_tp=k_tp, k_elec=k_elec, k_pol=k_pol, k_s=k_s) / mu

        # Section 4: kQ + dose at zref
        kq = trs398.kq_photon(chamber=chamber, tpr=tpr)
        dose_mu_zref = m_corrected * nd_w * kq

        # Section 5: Dose at zmax (SSD setup)
        dose_mu_zmax = dose_mu_zref * 100 / clinical_pdd
        dose_mu_zmax = dose_mu_zmax * 10000  # to cGy/MU

        deviasi = (abs(dose_mu_zmax - mu) / mu) * 100

        return jsonify({
            'dosis_absolute': round(dose_mu_zmax, 2),
            'deviasi': round(deviasi, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/field_size', methods=['POST'])
def calculate_field_size():
    data = request.json

    try:
        x = float(data['x'])
        y = float(data['y'])
        x1 = float(data['x1'])
        x2 = float(data['x2'])
        y1 = float(data['y1'])
        y2 = float(data['y2'])

        delta_x = round(abs(x - (x2 + x1)) * 10, 2)  # mm
        delta_y = round(abs(y - (y2 + y1)) * 10, 2)  # mm

        lulus = (delta_x <= 2) and (delta_y <= 2)

        return jsonify({
            'delta_x': delta_x,
            'delta_y': delta_y,
            'lulus': lulus
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/couch_position', methods=['POST'])
def calculate_couch_position():
    data = request.json

    try:
        set_shift = float(data['set_shift'])
        measured_shift = float(data['measured_shift'])

        delta_s = round(abs(set_shift - measured_shift) * 10, 2)  # mm

        lulus = delta_s <= 2

        return jsonify({
            'delta_s': delta_s,
            'lulus': lulus
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/odi', methods=['POST'])
def calculate_odi():
    data = request.json

    try:
        set_distance = float(data['set_distance'])
        measured_distance = float(data['measured_distance'])

        delta_d = round(abs(set_distance - measured_distance) * 10, 2)  # mm

        lulus = delta_d <= 2

        return jsonify({
            'delta_d': delta_d,
            'lulus': lulus
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/gantry_angle', methods=['POST'])
def calculate_gantry_angle():
    data = request.json

    try:
        set_angle = float(data['set_angle'])
        measured_angle = float(data['measured_angle'])

        delta_s = abs(set_angle - measured_angle)  # degrees

        lulus = delta_s <= 1

        return jsonify({
            'delta_s': round(delta_s, 2),
            'lulus': lulus
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/api/collimator_angle', methods=['POST'])
def calculate_collimator_angle():
    data = request.json

    try:
        set_angle = float(data['set_angle'])
        measured_angle = float(data['measured_angle'])

        delta_s = abs(set_angle - measured_angle)  # degrees

        lulus = delta_s <= 1

        return jsonify({
            'delta_s': round(delta_s, 2),
            'lulus': lulus
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)