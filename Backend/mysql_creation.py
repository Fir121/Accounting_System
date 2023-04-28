import mysql.connector as ms
from passwords import *

mydb = ms.connect(host='localhost', user='root', password=mysqlpass, database="accounting")
cursor = mydb.cursor()
cursor.execute("""create table if not exists user(
               user_id int auto_increment not null,
               user_creation_date datetime DEFAULT CURRENT_TIMESTAMP not null,
               user_company_name varchar(50) not null,
               primary key(user_id)
)""")
cursor.execute("""create table if not exists account(
               account_id int auto_increment not null,
               account_name varchar(50) not null,
               account_type varchar(30) not null,
               account_description text,
               account_user_id int,
               primary key(account_id, account_user_id), 
               foreign key(account_user_id) references user(user_id) ON DELETE CASCADE
)""")
cursor.execute("""create table if not exists description(
               description_id int auto_increment not null,
               description text not null,
               primary key(description_id)
)""")
cursor.execute("""create table if not exists transaction(
               transaction_id int auto_increment not null,
               transaction_date date not null,
               transaction_type ENUM('debit','credit') not null,
               transaction_amount double not null,
               transaction_from_account_id int not null,
               transaction_to_account_id int not null,
               transaction_description_id int,
               primary key(transaction_id, transaction_date), 
               foreign key(transaction_description_id) references description(description_id) ON DELETE CASCADE,
               foreign key(transaction_from_account_id) references account(account_id) ON DELETE CASCADE,
               foreign key(transaction_to_account_id) references account(account_id) ON DELETE CASCADE
)""")

# CREATE WARNING TRIGGERS