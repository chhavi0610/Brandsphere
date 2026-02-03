from sqlalchemy import create_engine
import psycopg2


def connection():
    
    try:
        DB_URL = "postgresql+psycopg2://postgres:Chhavi@123/localhost:5432/brandsphere"
        engine = create_engine(DB_URL)

        with engine.connect() as connection:
          print("Connection successful!")
          query = "SELECT * FROM my_table LIMIT 5;"
          results_df = pd.read_sql_query(query, connection)
          print(results_df)
    except Exception as e:
        print(f"ERROR OCCURED{e}")




if __name__ == "__main__":
    connection()