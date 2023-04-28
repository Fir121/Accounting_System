import mysql.connector as ms
from passwords import *

mydb = ms.connect(host='localhost', user='root', password=mysqlpass, database="accounting", autocommit=True)

def create_cursor():
    return mydb.cursor(dictionary=True)

def return_message(status, msg="N/A", data={}):
    if status:
        return {"status":"success", "description":msg, "data":data}
    return {"status":"error", "description":msg, "data":data}

#### USERS
def create_user(user_company_name):
    cursor = create_cursor()
    try:
        cursor.execute("insert into user(user_company_name) values(%s)", (user_company_name,))
    except:
        return return_message(False, "Account Already Exists")
    try:
        cursor.execute("select * from user where user_company_name=%s",(user_company_name,))
    except:
        return return_message(False, "Internal Sever Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(False, "Could Not Create Account")
    return return_message(True, data=data)

def read_user(user_id):
    cursor = create_cursor()
    try:
        cursor.execute("select * from user where user_id=%s",(user_id,))
    except:
        return return_message(False, "Internal Sever Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(False, "User does not Exist")
    return return_message(True, data=data)

# no updating of user
def delete_user(user_id):
    cursor = create_cursor()
    try:
        cursor.execute("delete from user where user_id=%s",(user_id,))
    except:
        return return_message(False, "Internal Sever Error")
    return return_message(True)

#### ACCOUNTS
def create_account(account_name, account_type, account_description, account_user_id):
    cursor = create_cursor()
    try:
        cursor.execute("insert into account(account_name, account_type, account_description, account_user_id) values(%s, %s, %s, %s)", (account_name, account_type, account_description, account_user_id))
    except:
        return return_message(False, "Account with same name already exists")
    return return_message(True)

def read_account(account_id):
    cursor = create_cursor()
    try:
        cursor.execute("select * from account where account_id=%s",(account_id,))
    except:
        return return_message(False, "Internal Sever Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(False, "account does not Exist")
    return return_message(True, data=data)

def get_accounts(user_id, detailed):
    cursor = create_cursor()
    try:
        cursor.execute("select * from account where account_user_id=%s",(user_id,))
    except:
        return return_message(False, "Internal Sever Error")
    data = cursor.fetchall()
    if not detailed:
        for i in range(len(data)):
            data[i] = {"account_id":data[i]["account_id"], "account_name":data[i]["account_name"]}
    return return_message(True, data=data)

def update_account(account_id, account_name, account_type, account_description):
    cursor = create_cursor()
    try:
        cursor.execute("update account set account_name=%s, account_type=%s, account_description=%s where account_id=%s", (account_name, account_type, account_description, account_id))
    except:
        return return_message(False, "Could not update account")
    return return_message(True)

def delete_account(account_id):
    cursor = create_cursor()
    try:
        cursor.execute("delete from account where account_id=%s",(account_id,))
    except:
        return return_message(False, "Internal Sever Error")
    return return_message(True)

#### TRANSACTIONS
def create_transaction(transaction_date, transaction_type, transaction_amount, transaction_from_account_id, transaction_to_account_id):
    cursor = create_cursor()
    try:
        cursor.execute("insert into transaction(transaction_date, transaction_type, transaction_amount, transaction_from_account_id, transaction_to_account_id) values(%s, %s, %s, %s, %s)", (transaction_date, transaction_type, transaction_amount, transaction_from_account_id, transaction_to_account_id))
    except:
        return return_message(False, "Could not create transaction")
    return return_message(True)

def read_transaction(transaction_id):
    cursor = create_cursor()
    try:
        cursor.execute("select * from transaction left join description on transaction.transaction_description_id = description.description_id where transaction_id=%s",(transaction_id,))
    except:
        return return_message(False, "Internal Sever Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(False, "transaction does not Exist")
    return return_message(True, data=data)

def get_transactions(user_id, transaction_date):
    cursor = create_cursor()
    try:
        cursor.execute("select * from UserTransaction where user_id=%s and transaction_date=%s",(user_id, transaction_date))
    except:
        return return_message(False, "Internal Sever Error")
    data = cursor.fetchall()
    return return_message(True, data=data)

def update_transaction(transaction_id, transaction_type, transaction_amount, transaction_from_account_id, transaction_to_account_id):
    cursor = create_cursor()
    try:
        cursor.execute("update transaction set transaction_type=%s, transaction_amount=%s, transaction_from_account_id=%s, transaction_to_account_id=%s where transaction_id=%s", (transaction_type, transaction_amount, transaction_from_account_id, transaction_to_account_id, transaction_id))
    except:
        return return_message(False, "Could not update transaction")
    return return_message(True)

def delete_transaction(transaction_id):
    cursor = create_cursor()
    try:
        cursor.execute("delete from transaction where transaction_id=%s",(transaction_id,))
    except:
        return return_message(False, "Internal Sever Error")
    return return_message(True)

#### DESCRIPTIONS
def create_description(description, description_links):
    cursor = create_cursor()
    try:
        cursor.execute("insert into description(description) values(%s)", (description,))
    except:
        return return_message(False, "Could not create description")
    try:
        cursor.execute("select SELECT LAST_INSERT_ID() as description_id")
    except:
        return return_message(False, "Internal Sever Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(False, "Could Not link description")
    
    description_id = data["description_id"]
    try:
        cursor.execute("update transaction set transaction_description_id=%s where transaction_id in %s", (description_id, str(tuple(description_links))))
    except:
        return return_message(False, "Could not create description")
    return return_message(True)

def update_description(description_id, description):
    cursor = create_cursor()
    try:
        cursor.execute("update description set description%s where description_id=%s", (description, description_id))
    except:
        return return_message(False, "Could not update description")
    return return_message(True)

def delete_description(description_id):
    cursor = create_cursor()
    try:
        cursor.execute("delete from description where description_id=%s",(description_id,))
    except:
        return return_message(False, "Internal Sever Error")
    return return_message(True)

