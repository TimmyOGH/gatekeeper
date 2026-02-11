*** Steps To Run GateKeeper App ***

NOTE: This project is built with Python 3.13.5. You must have Python and pip installed on your device.

Step 1: Extract the GateKeeper project zip file.

Step 2: (Optional) Open the project in Visual Studio Code.

Step 3: Open a terminal in the project folder and run:

        pip install -r requirements.txt 
        (This will install all required libraries and dependencies.)

Step 4: Set up the database

        Option A: Import gatekeeper_dump.sql using MySQL Workbench

        Option B: Using Command Line:

        mysql -u root -p < gatekeeper_dump.sql

Step 5: Update database credentials

        Open __init__.py and update all instances of the SQLAlchemy URI with your MySQL username and password. Example:

        'mysql+pymysql://<username>:<password>@localhost/gatekeeper'
        (Several lines like this need to be updated in __init__.py)

Step 6: Run the web app

        python run.py

        Open your browser at http://127.0.0.1:5000

*** Example User Data ***

User 1:
        Name: John Doe
        Email: johndoe@gmail.com
        Password: John123!

User 2:
        Name: Sarah Doe
        Email: sarahdoe@gmail.com
        Password: Sarah123!
