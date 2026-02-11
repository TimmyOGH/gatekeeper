from flask import Blueprint, render_template, request, flash, redirect, url_for, current_app
from .password import hash_password, verify_password
from .models import User
from . import db
import re
import jwt
import datetime
from functools import wraps

# Create Blueprint for auth routes
auth = Blueprint('auth', __name__)

# JWT Algorithm
JWT_ALGORITHM = 'HS256'

nameRegex = r"^(?=.*\s)[a-zA-Z\s]{2,50}$"
emailRegex = r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
pwRegex = r"^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$"

# JWT Token Generation Function
def generate_jwt_token(uid, name):
    payload = {
        'uid': uid,
        'name': name,
        # Time of Token Creation
        'iat': datetime.datetime.utcnow(),
        # Expiry Time of Token
        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24),
    }
    # Encode Payload Into the Token using HS256 Algorithm
    token = jwt.encode(payload, current_app.config['SECRET_KEY'], algorithm=JWT_ALGORITHM)

    return token

# JWT Token Verification Decorator
def token_required(f):
    # Preserves Original Function
    @wraps(f)
    def decorated(*args, **kwargs):
        # Check If Token Exists in Browser Cookies
        token = request.cookies.get('auth_token')

        if not token:
            return redirect(url_for('auth.login'))
        
        try:
            # Decode and Verify Token Signature
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=[JWT_ALGORITHM])
            
            # Check If User Exists in Database
            current_user = User.query.get(data['uid'])
            
            if not current_user:
                return redirect(url_for('auth.login'))
                
        except jwt.ExpiredSignatureError:
            return redirect(url_for('auth.login'))
        
        except jwt.InvalidTokenError:
            return redirect(url_for('auth.login'))
        
        return f(current_user, data, *args, **kwargs)
    
    return decorated

# Check w/ Patterns for Register
def validate_registration(fullName, email, password, repeatPassword):
    is_name_valid = bool(re.match(nameRegex, fullName))
    is_email_valid = bool(re.match(emailRegex, email))
    is_pw_valid = bool(re.match(pwRegex, password))
    is_pw_match = password == repeatPassword

    return is_name_valid and is_email_valid and is_pw_valid and is_pw_match

# Check w/ Patterns for Login
def validate_login(email, password):
    is_email_valid = bool(re.match(emailRegex, email))
    is_pw_valid = bool(re.match(pwRegex, password))

    return is_email_valid and is_pw_valid

# Register Route
@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        fullName = request.form.get('full name')
        email = request.form.get('email')
        password = request.form.get('password')
        repeatPassword = request.form.get('repeat password')

        # Validate Inputs 
        if validate_registration(fullName, email, password, repeatPassword):
            try:
                # Check If User Already Exists
                user_exists = User.query.filter_by(email=email).first()
                if user_exists:
                    flash('Email already registered!', category='register_error')
                else:
                    # Hash Password
                    hashed_password = hash_password(password)

                    # Create New User
                    new_user = User(
                        name=fullName,
                        email=email,
                        password=hashed_password
                    )
                
                    # Insert To Database
                    db.session.add(new_user)
                    db.session.commit()

                    flash('Registration successful!', category='register_success')

                    return redirect(url_for('auth.login'))
            
            except Exception as e:
                print(f"Registration error: {e}")
        else:
            print(f"Registration unsuccessful...")

    return render_template("register.html")

# Login Route
@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        # Validate Inputs
        if (validate_login(email, password)):
            try:
                # Check If Emails Match
                user = User.query.filter_by(email=email).first()
            
                if user and verify_password(user.password, password):
                    # Generate JWT Token
                    token = generate_jwt_token(user.uid, user.name)

                    print(token)

                    flash('Login successful!', 'login_success')

                    # Store Token in HTTP-only Cookie
                    response = redirect(url_for('views.dashboard'))
                    response.set_cookie('auth_token', token, httponly=True, secure=False)
                    
                    return response

                else:
                    flash('Incorrect email or password', 'login_error')
                
            except Exception as e:
                print(f"Login unsuccessful...: {e}")

    return render_template("login.html")

# Logout Route
@auth.route('/logout')
def logout():
    response = redirect(url_for('views.home'))
    # Delete Token from Browser Cookies
    response.set_cookie('auth_token', '', expires=0)

    flash('Logout successful!', 'logout_success')

    return response