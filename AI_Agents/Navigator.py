from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/locate-pharmacy', methods=['GET'])
def locate_pharmacy():
    pharmacies = [
        {"name": "Pharmacy 1", "address": "123 Main St", "lat": 37.7749, "lng": -122.4194},
        {"name": "Pharmacy 2", "address": "456 Elm St", "lat": 37.7799, "lng": -122.4149}
    ]
    return jsonify({"pharmacies": pharmacies})

if __name__ == '__main__':
    app.run(debug=True)
