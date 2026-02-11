from flask import Blueprint, render_template, request
from .auth import token_required
from datetime import datetime

# Create Blueprint for Views Routes
views = Blueprint('views', __name__)

# Home Route
@views.route('/')
def home():
    return render_template("home.html")

# Dashboard Route
@views.route('/dashboard')
@token_required
def dashboard(current_user, token_data):
    # Get Token From Cookies
    token = request.cookies.get('auth_token')

    # Convert Timestamps to Readable Format
    issued_at = datetime.fromtimestamp(token_data['iat']).strftime('%Y-%m-%d %H:%M:%S')
    expires_at = datetime.fromtimestamp(token_data['exp']).strftime('%Y-%m-%d %H:%M:%S')

    # Extract Algorithm and Signature From Token
    token_parts = token.split('.')
    header = token_parts[0]
    signature = token_parts[2]

    # Decode Header
    import base64
    import json

    header_decoded = json.loads(base64.b64decode(header + '==').decode('utf-8'))
    token_type = header_decoded.get('typ', 'JWT')
    algorithm = header_decoded.get('alg', 'HS256')
    
    # Current date for Dashboard
    current_date = datetime.now()
    formatted = current_date.strftime("%d / %m / %Y")
    
    return render_template("dashboard.html", 
                           user=current_user, 
                           date=formatted,
                           token=token,
                           token_type=token_type,
                           algorithm=algorithm,
                           issued_at=issued_at, 
                           expires_at=expires_at,
                           signature=signature)