import psycopg2
import psycopg2.extras
import os


def get_db_connection():
     return psycopg2.connect(os.environ["DATABASE_URL"])



