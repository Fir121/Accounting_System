from flask import request, jsonify, Flask
import backend_functions as bf

app = Flask(__name__)
security_code = 1112

@app.route('/signup', methods=['GET'])
def home():
    return jsonify({})