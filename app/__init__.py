import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine, text

db = SQLAlchemy()

def gatekeeper():
    # Create Database
    create_database()
    
    # Create Flask App Instance
    app = Flask(__name__)
    
    # Secret Key
    app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")

    # Use PyMySQL Driver
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:4HISGlory@localhost/gatekeeper'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)

    # Import And Register Blueprints
    from .views import views
    from .auth import auth

    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .models import User

    # Create Tables
    with app.app_context():
        db.create_all()

    return app

#  Create Database Func
def create_database():
    try:
        # Try Connecting To gatekeeper
        engine = create_engine('mysql+pymysql://root:4HISGlory@localhost/gatekeeper')

        with engine.connect() as conn:
            print("Database 'gatekeeper' Exists")

    except Exception as e:
        # If gatekeeper Doesn't Exist
        if "Unknown database" in str(e):
            print("Creating database 'gatekeeper'...")

            # Create gatekeeper
            engine = create_engine('mysql+pymysql://root:4HISGlory@localhost/')
            with engine.connect() as conn:
                conn.execute(text("CREATE DATABASE gatekeeper"))
                conn.commit()
                print("Database 'gatekeeper' created successfully")
        else:
            print(f"Error: {e}")