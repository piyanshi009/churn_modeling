import pandas as pd
import numpy as np
import joblib

# Load model once
model = joblib.load("churn_model.pkl")

def preprocess_input(data):

    input_data = pd.DataFrame([data])

    # Feature Engineering
    input_data['balance_per_product'] = (
        input_data['Balance'] /
        input_data['NumOfProducts'].replace(0, np.nan)
    )

    input_data['balance_per_product'] = (
        input_data['balance_per_product'].fillna(0)
    )

    input_data['salary_balance_ratio'] = (
        input_data['EstimatedSalary'] /
        input_data['Balance'].replace(0, np.nan)
    )

    input_data['salary_balance_ratio'] = (
        input_data['salary_balance_ratio']
        .replace([np.inf, -np.inf], np.nan)
        .fillna(0)
    )

    bins = [0, 25, 35, 45, 55, 65, 100]
    labels = ['<25', '25-34', '35-44', '45-54', '55-64', '65+']

    input_data['age_group'] = pd.cut(
        input_data['Age'],
        bins=bins,
        labels=labels
    )

    input_data['tenure_bucket'] = pd.cut(
        input_data['Tenure'],
        bins=[-1, 0, 2, 5, 10, 100],
        labels=['0', '1-2', '3-5', '6-10', '10+']
    )

    input_data['high_balance'] = (
        input_data['Balance'] > 50000
    ).astype(int)

    return input_data


def predict_churn(data):

    processed_data = preprocess_input(data)

    prediction = int(model.predict(processed_data)[0])

    probability = float(
        model.predict_proba(processed_data)[0][1]
    )

    return prediction, probability