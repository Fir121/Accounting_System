﻿# Accounting System

## Setup Instructions

### Backend

The backend is built using Flask and a MySQL connection, you need to have `Python=3.10`, `flask`, `flask-cors` and `MySQL` installed before we begin.

Commands to begin Flask web server:

```bash
cd Backend
```

To setup your MySQL database, create a database named `accounting`, create a python file in the Backend directory named `passwords.py` containing the following:
```python
mysqlpass = "yourpasswordhere"
```
Now run the `mysql_creation.py` file, in case you run into errors while it tries to create a view or trigger, you must manually add these directly from the MySQL command line or workbench. On some MySQL versions you may come across an error `x view not found`, in that case check the capitalisations.

``` bash
py -3.10 flask_app.py # use the appropriate command for your system such as python flask_app.py, python3 flask_app.py etc.
```

Your flask server is up and running at localhost:5000, you will not see anything when you visit since this is just an API for the backend.

### Frontend

The frontend is built using react, you need `npm` installed to use react.

```bash
cd Frontend
npm install
npm run dev
```

The website is now running at localhost:5173 you may try it out!
