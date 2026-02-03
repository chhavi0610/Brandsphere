import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics.pairwise import cosine_similarity
from database.db import get_db_connection

def get_manufacturer_recommendations(category):
    conn = get_db_connection()
    if not conn:
        return []

    df = pd.read_sql("""
        SELECT id AS manufacturer_id,
               price_range,
               rating,
               delivery_time
        FROM manufacturers
        WHERE category = %s
    """, conn, params=(category,))

    conn.close()

    if df.empty:
        return []

    scaler = MinMaxScaler()
    features = scaler.fit_transform(
        df[['price_range', 'rating', 'delivery_time']]
    )

    similarity = cosine_similarity(features)
    df['score'] = similarity.mean(axis=1)

    return df[['manufacturer_id', 'score']].to_dict(orient='records')



