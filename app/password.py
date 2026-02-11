from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

# Create Hasher Instance
ph = PasswordHasher(
    # Number of Iterations
    time_cost=3,
    # Memory Usage (64MB)
    memory_cost=65536,
    # Number of Parallel Threads
    parallelism=1,
    # Hash Length
    hash_len=32,
    # Salt Length
    salt_len=16
)

# Hash Password using Argon2
def hash_password(password):
    return ph.hash(password)

# Verify Password
def verify_password(password_hash, password):
    try:
        return ph.verify(password_hash, password)
    
    except VerifyMismatchError:
        return False
    
    except Exception:
        return False