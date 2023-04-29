from flask import request, jsonify, Flask
import backend_functions as bf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/create_user', methods=['POST'])
def create_user():
    user_company_name = request.form.get('user_company_name')
    return jsonify(bf.create_user(user_company_name))

@app.route('/read_user', methods=['GET'])
def read_user():
    user_id = request.args.get('user_id')
    return jsonify(bf.read_user(user_id))

@app.route('/read_user_login', methods=['GET'])
def read_user_login():
    user_company_name = request.args.get('user_company_name')
    return jsonify(bf.read_user_login(user_company_name))

@app.route('/delete_user', methods=['POST'])
def delete_user():
    user_id = request.form.get('user_id')
    return jsonify(bf.delete_user(user_id))


@app.route('/create_account', methods=['POST'])
def create_account():
    account_name = request.form.get('account_name')
    account_type = request.form.get("account_type")
    account_description = request.form.get("account_description")
    account_user_id = request.form.get("account_user_id")
    return jsonify(bf.create_account(account_name, account_type, account_description, account_user_id))

@app.route('/read_account', methods=['GET'])
def read_account():
    account_id = request.args.get('account_id')
    return jsonify(bf.read_account(account_id))

@app.route('/get_accounts', methods=['GET'])
def get_accounts():
    user_id = request.args.get('user_id')
    detailed = request.args.get('detailed')
    if detailed is None:
        detailed = True
    return jsonify(bf.get_accounts(user_id, detailed))

@app.route('/update_account', methods=['POST'])
def update_account():
    account_id = request.form.get("account_id")
    account_name = request.form.get('account_name')
    account_type = request.form.get("account_type")
    account_description = request.form.get("account_description")
    return jsonify(bf.update_account(account_id, account_name, account_type, account_description))

@app.route('/delete_account', methods=['POST'])
def delete_account():
    account_id = request.form.get('account_id')
    return jsonify(bf.delete_account(account_id))

@app.route('/create_transaction', methods=['POST'])
def create_transaction():
    transaction_date = request.form.get("transaction_date")
    transaction_type = request.form.get("transaction_type")
    transaction_amount = request.form.get("transaction_amount")
    transaction_from_account_id = request.form.get("transaction_from_account_id")
    transaction_to_account_id = request.form.get("transaction_to_account_id")
    return jsonify(bf.create_transaction(transaction_date, transaction_type, transaction_amount, transaction_from_account_id, transaction_to_account_id))

@app.route('/read_transaction', methods=['GET'])
def read_transaction():
    transaction_id = request.args.get('transaction_id')
    return jsonify(bf.read_transaction(transaction_id))

@app.route('/get_transactions', methods=['GET'])
def get_transactions():
    user_id = request.args.get('user_id')
    transaction_date = request.args.get('transaction_date')
    return jsonify(bf.get_transactions(user_id, transaction_date))

@app.route('/update_transaction', methods=['POST'])
def update_transaction():
    transaction_id = request.form.get("transaction_id")
    transaction_type = request.form.get("transaction_type")
    transaction_amount = request.form.get("transaction_amount")
    transaction_from_account_id = request.form.get("transaction_from_account_id")
    transaction_to_account_id = request.form.get("transaction_to_account_id")
    return jsonify(bf.update_transaction(transaction_id, transaction_type, transaction_amount, transaction_from_account_id, transaction_to_account_id))

@app.route('/delete_transaction', methods=['POST'])
def delete_transaction():
    transaction_id = request.form.get('transaction_id')
    return jsonify(bf.delete_transaction(transaction_id))

@app.route('/create_description', methods=['POST'])
def create_description(): ## SPECIAL METHOD
    data = request.json
    description = data["description"]
    description_links = data["description_links"]
    return jsonify(bf.create_description(description, description_links))

@app.route('/get_descriptions', methods=['GET'])
def get_descriptions():
    user_id = request.args.get('user_id')
    date = request.args.get('date')
    return jsonify(bf.get_descriptions(user_id, date))


@app.route('/update_description', methods=['POST'])
def update_description():
    description_id = request.form.get('description_id')
    description = request.form.get('description')
    return jsonify(bf.update_description(description_id, description))

@app.route('/delete_description', methods=['POST'])
def delete_description():
    description_id = request.form.get('description_id')
    return jsonify(bf.delete_description(description_id))

if __name__ == "__main__":
    app.run(debug=True)