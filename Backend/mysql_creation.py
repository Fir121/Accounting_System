import mysql.connector as ms
from passwords import *

mydb = ms.connect(host='localhost', user='root', password=mysqlpass, database="accounting")
cursor = mydb.cursor()
cursor.execute("""create table if not exists user(
               user_id int auto_increment not null,
               user_creation_date datetime DEFAULT CURRENT_TIMESTAMP not null,
               user_company_name varchar(50) not null,
               primary key(user_id), unique key(user_company_name)
)""")
cursor.execute("""create table if not exists account(
               account_id int auto_increment not null,
               account_name varchar(50) not null,
               account_type varchar(30) not null,
               account_description text,
               account_user_id int not null,
               primary key(account_id),
               unique key(account_name, account_user_id), 
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
               transaction_amount double not null,
               transaction_from_account_id int not null,
               transaction_to_account_id int not null,
               transaction_description_id int,
               primary key(transaction_id), 
               foreign key(transaction_description_id) references description(description_id) ON DELETE SET NULL,
               foreign key(transaction_from_account_id) references account(account_id) ON DELETE CASCADE,
               foreign key(transaction_to_account_id) references account(account_id) ON DELETE CASCADE
)""")

# VIEWS
cursor.execute(""""
    CREATE VIEW UserTransaction AS
    SELECT transaction_id, transaction_date, transaction_amount, a1.account_name as from_account, a2.account_name as to_account, a1.account_user_id as user_id, t1.transaction_description_id AS transaction_description_id
    FROM transaction t1 join account a1 on t1.transaction_from_account_id = a1.account_id
    join account a2 on t1.transaction_to_account_id = a2.account_id;
""")
cursor.execute(""""    
    CREATE VIEW UserDescription as 
    SELECT user_id, description_id, description, count(*) as transaction_count, transaction_date from usertransaction 
    join description on description_id=transaction_description_id 
    group by user_id,description_id,transaction_date;
""")

# TRIGGERS
# DELIMITER $$
cursor.execute("""
CREATE TRIGGER before_transaction_insert
BEFORE INSERT
ON Transaction FOR EACH ROW
BEGIN
    IF new.transaction_from_account_id = new.transaction_to_account_id THEN
		signal sqlstate '45000' set message_text = 'Cannot make transaction to the same account';
	END IF;
END
""")
# $$
# DELIMITER ;

# TODO TRIGGER TO ENSURE NO OVERWRITING OF DESCRIPTION BY ACCIDENT


# Restricts when from and to are different
# DELIMITER $$
cursor.execute("""
CREATE TRIGGER descriptionIdCounter
BEFORE UPDATE
ON transaction FOR EACH ROW
BEGIN
	DECLARE x INT;
	DECLARE from_transaction INT;
	DECLARE to_transaction INT;
	DECLARE from_transaction_id INT;
	DECLARE to_transaction_id INT;
    DECLARE flag INT;
    SET flag=0;
    IF (NOT new.transaction_description_id <=> old.transaction_description_id and new.transaction_description_id is not null) THEN
		SET x = (select count(*) from transaction join description on transaction_description_id=description_id where description_id=new.transaction_description_id);
        IF (x <=> 0) THEN
			 SET flag = 1;
        END IF;
        IF (x > 0) THEN
            SET from_transaction = (select count(distinct transaction_from_account_id) from transaction join description on transaction_description_id=description_id where description_id=new.transaction_description_id);
            SET to_transaction = (select count(distinct transaction_to_account_id) from transaction join description on transaction_description_id=description_id where description_id=new.transaction_description_id);
			IF (from_transaction <=> 1) THEN
                SET from_transaction_id = (select distinct transaction_from_account_id from transaction join description on transaction_description_id=description_id where description_id=new.transaction_description_id);
				IF (from_transaction_id <=> new.transaction_from_account_id) THEN
					SET flag = 1;
				END IF;
			END IF;
			IF (to_transaction <=> 1) THEN
                SET to_transaction_id = (select distinct transaction_to_account_id from transaction join description on transaction_description_id=description_id where description_id=new.transaction_description_id);
				IF (to_transaction_id <=> new.transaction_to_account_id) THEN
					SET flag = 1;
				END IF;
			END IF;
		END IF;
	ELSE
		set flag=1;
    END IF;
    
    IF (flag <=> 0) THEN
		signal sqlstate '45000' set message_text = 'Cannot set description as from or to accounts are not the same';
	END IF;
END
""")
# $$
# DELIMITER ;