import mysql.connector as ms
from passwords import *

mydb = ms.connect(host='localhost', user='root', password=mysqlpass, database="accounting")

def create_cursor():
    cursor = mydb.cursor(dictionary=True)

def signup():
    return