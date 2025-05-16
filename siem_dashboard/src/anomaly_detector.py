from sklearn.ensemble import IsolationForest
import pandas as pd

def detect_anomalies(df):
    """Detect anomalies in log data using Isolation Forest."""
    # Features for anomaly detection
    features = df[['bytes_transferred', 'hour']].copy()
    
    # Initialize and fit model
    model = IsolationForest(contamination=0.1, random_state=42)
    model.fit(features)
    
    # Predict anomalies (-1 for anomalies, 1 for normal)
    df['anomaly'] = model.predict(features)
    df['anomaly'] = df['anomaly'].map({1: 'Normal', -1: 'Anomaly'})
    
    return df