import psycopg2


DB_CONFIG = {
    "host": "localhost",
    "database": "brandsphere",  
    "user": "postgres",  
    "password": "Chhavi@123"
}

def get_db_connection():
    try:
        conn = psycopg2.connect(**DB_CONFIG)
        print(" DB connection successful")
        return conn
    except Exception as e:
        print(" DB connection failed:", e)
        raise e  



get_db_connection()