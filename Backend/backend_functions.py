import mysql.connector as ms
from passwords import *

# do basic input validations

def create_cursor():
    mydb = ms.connect(host='localhost', user='root', password=mysqlpass, database="accounting", autocommit=True)
    cursor = mydb.cursor(dictionary=True, buffered=True)
    return mydb, cursor

def return_message(mydb, cursor, status, msg="N/A", data={}):
    try:
        cursor.close()
        mydb.close()
    except:
        pass
    if status:
        return {"status":1, "description":msg, "data":data}
    return {"status":0, "description":msg, "data":data}

#### USERS
def create_user(user_company_name):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("insert into user(user_company_name) values(%s)", (user_company_name,))
    except:
        return return_message(mydb, cursor, False, "Account Already Exists")
    try:
        cursor.execute("select * from user where user_company_name=%s",(user_company_name,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(mydb, cursor, False, "Could Not Create Account")
    return return_message(mydb, cursor, True, data=data)

def read_user(user_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("select * from user where user_id=%s",(user_id,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(mydb, cursor, False, "User does not Exist")
    return return_message(mydb, cursor, True, data=data)

def read_user_login(user_company_name):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("select * from user where user_company_name=%s",(user_company_name,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(mydb, cursor, False, "User does not Exist")
    return return_message(mydb, cursor, True, data=data)

# no updating of user
def delete_user(user_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("delete from user where user_id=%s",(user_id,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    return return_message(mydb, cursor, True)

#### ACCOUNTS
def create_account(account_name, account_type, account_description, account_user_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("insert into account(account_name, account_type, account_description, account_user_id) values(%s, %s, %s, %s)", (account_name, account_type, account_description, account_user_id))
    except:
        return return_message(mydb, cursor, False, "Account with same name already exists")
    return return_message(mydb, cursor, True)

def read_account(account_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("select * from account where account_id=%s",(account_id,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(mydb, cursor, False, "account does not Exist")
    return return_message(mydb, cursor, True, data=data)

def get_accounts(user_id, detailed):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("select * from account where account_user_id=%s",(user_id,))
    except Exception as e:
        print(e)
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchall()
    if not detailed:
        for i in range(len(data)):
            data[i] = {"account_id":data[i]["account_id"], "account_name":data[i]["account_name"]}
    return return_message(mydb, cursor, True, data=data)

def update_account(account_id, account_name, account_type, account_description):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("update account set account_name=%s, account_type=%s, account_description=%s where account_id=%s", (account_name, account_type, account_description, account_id))
    except:
        return return_message(mydb, cursor, False, "Could not update account")
    return return_message(mydb, cursor, True)

def delete_account(account_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("delete from account where account_id=%s",(account_id,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    return return_message(mydb, cursor, True)

#### TRANSACTIONS
def create_transaction(transaction_date, transaction_amount, transaction_from_account_id, transaction_to_account_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("insert into transaction(transaction_date, transaction_amount, transaction_from_account_id, transaction_to_account_id) values(%s, %s, %s, %s)", (transaction_date, transaction_amount, transaction_from_account_id, transaction_to_account_id))
    except:
        return return_message(mydb, cursor, False, "Could not create transaction")
    return return_message(mydb, cursor, True)

def read_transaction(transaction_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("select * from transaction left join description on transaction.transaction_description_id = description.description_id where transaction_id=%s",(transaction_id,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(mydb, cursor, False, "transaction does not Exist")
    return return_message(mydb, cursor, True, data=data)

def get_transactions(user_id, transaction_date):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("select * from UserTransaction where user_id=%s and transaction_date=%s",(user_id, transaction_date))
    except Exception as e:
        print(e)
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchall()
    return return_message(mydb, cursor, True, data=data)

def update_transaction(transaction_id, transaction_amount, transaction_from_account_id, transaction_to_account_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("update transaction set transaction_amount=%s, transaction_from_account_id=%s, transaction_to_account_id=%s where transaction_id=%s", (transaction_amount, transaction_from_account_id, transaction_to_account_id, transaction_id))
    except Exception as e:
        return return_message(mydb, cursor, False, "Could not update transaction")
    return return_message(mydb, cursor, True)

def delete_transaction(transaction_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("delete from transaction where transaction_id=%s",(transaction_id,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    return return_message(mydb, cursor, True)

#### DESCRIPTIONS
def create_description(description, description_links):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("insert into description(description) values(%s)", (description,))
    except:
        return return_message(mydb, cursor, False, "Could not create description")
    try:
        cursor.execute("select LAST_INSERT_ID() as description_id")
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(mydb, cursor, False, "Could Not link description")
    
    description_id = data["description_id"]
    try:
        #SQL INJECTION DANGER DANGER DANGER
        if len(description_links) == 1:
            final_str = "("+str(description_links[0])+")"
        else:
            final_str = str(tuple(description_links))
        cursor.execute(f"update transaction set transaction_description_id=%s where transaction_id in {final_str}", (description_id,))
    except Exception as e:
        print(e)
        return return_message(mydb, cursor, False, "Could not create description")
    return return_message(mydb, cursor, True)

def get_descriptions(user_id, date):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("select * from UserDescription where user_id=%s and transaction_date=%s",(user_id, date))
    except Exception as e:
        print(e)
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchall()
    return return_message(mydb, cursor, True, data=data)

def update_description(description_id, description):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("update description set description=%s where description_id=%s", (description, description_id))
    except:
        return return_message(mydb, cursor, False, "Could not update description")
    return return_message(mydb, cursor, True)

def delete_description(description_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("delete from description where description_id=%s",(description_id,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    return return_message(mydb, cursor, True)


def read_description(description_id):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("select * from description where description_id=%s",(description_id,))
    except:
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchone()
    if data is None:
        return return_message(mydb, cursor, False, "description does not Exist")
    return return_message(mydb, cursor, True, data=data)


#### REPORTS

def get_daily_journal(user_id, transaction_date):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("CALL SelectDailyJournal(%s, %s) ",(user_id,transaction_date))
    except Exception as e:
        print(e)
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchall()
    return return_message(mydb, cursor, True, data=data)

def get_account_reports(userid):
    mydb, cursor = create_cursor()
    try:
        cursor.execute("CALL SelectAccountReports(%s) ",(userid,))
    except Exception as e:
        print(e)
        return return_message(mydb, cursor, False, "Internal Server Error")
    data = cursor.fetchall()
    return return_message(mydb, cursor, True, data=data)