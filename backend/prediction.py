"""Placeholder ML prediction pipeline.

The backend README describes this module as an existing, pre-trained
TF-IDF + MultinomialNB pipeline that should be reused as-is. That file was
not present in this checkout, so this trains a small pipeline on a built-in
sample dataset and caches it to disk. Replace with the real trained
vectorizer/model to restore the original behavior.
"""
from pathlib import Path
from typing import Any, Dict, Optional, Tuple

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

BASE_DIR = Path(__file__).resolve().parent
DEFAULT_VECTORIZER_PATH = BASE_DIR / "vectorizer.joblib"
DEFAULT_MODEL_PATH = BASE_DIR / "model.joblib"

CONFIDENCE_THRESHOLD = 0.6

CATEGORY_PRIORITY = {
    "Billing": "High",
    "Technical Support": "High",
    "Account Management": "Medium",
    "Feature Request": "Low",
    "General Inquiry": "Low",
}

TRAINING_DATA = [
    ("I was charged twice for my subscription this month", "Billing"),
    ("Please refund the duplicate invoice you sent me", "Billing"),
    ("My credit card payment failed but I was still billed", "Billing"),
    ("Can you explain the charges on my latest invoice", "Billing"),
    ("I need a receipt for my last payment", "Billing"),
    ("The app crashes every time I open the dashboard", "Technical Support"),
    ("I'm getting a 500 error when I try to upload a file", "Technical Support"),
    ("The website is down and I cannot log in", "Technical Support"),
    ("There is a bug in the export feature that corrupts my data", "Technical Support"),
    ("The API is returning timeouts for every request", "Technical Support"),
    ("I forgot my password and the reset email never arrives", "Account Management"),
    ("Please update the email address on my account", "Account Management"),
    ("How do I delete my account permanently", "Account Management"),
    ("I want to change my username", "Account Management"),
    ("Can you merge my two accounts into one", "Account Management"),
    ("It would be great if you added dark mode to the app", "Feature Request"),
    ("Please add support for exporting reports as PDF", "Feature Request"),
    ("Can you build an integration with Slack", "Feature Request"),
    ("I would like a bulk import feature for tickets", "Feature Request"),
    ("Adding keyboard shortcuts would improve the workflow", "Feature Request"),
    ("What are your support hours", "General Inquiry"),
    ("Do you offer discounts for annual plans", "General Inquiry"),
    ("Where can I find your terms of service", "General Inquiry"),
    ("How does your product compare to competitors", "General Inquiry"),
    ("I just wanted to say thanks for the great support", "General Inquiry"),
]


def _train_pipeline() -> Tuple[TfidfVectorizer, MultinomialNB]:
    texts, labels = zip(*TRAINING_DATA)
    vectorizer = TfidfVectorizer(stop_words="english")
    X = vectorizer.fit_transform(texts)
    model = MultinomialNB()
    model.fit(X, labels)
    return vectorizer, model


def load_pipeline(
    *, vectorizer_path: Optional[str] = None, model_path: Optional[str] = None
) -> Tuple[TfidfVectorizer, MultinomialNB]:
    vec_path = Path(vectorizer_path) if vectorizer_path else DEFAULT_VECTORIZER_PATH
    mdl_path = Path(model_path) if model_path else DEFAULT_MODEL_PATH

    if vec_path.exists() and mdl_path.exists():
        return joblib.load(vec_path), joblib.load(mdl_path)

    vectorizer, model = _train_pipeline()
    vec_path.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(vectorizer, vec_path)
    joblib.dump(model, mdl_path)
    return vectorizer, model


def predict_ticket(
    text: str, *, vectorizer: TfidfVectorizer, model: MultinomialNB
) -> Dict[str, Any]:
    X = vectorizer.transform([text])
    probs = model.predict_proba(X)[0]
    best_idx = probs.argmax()
    category = model.classes_[best_idx]
    confidence = float(probs[best_idx])

    return {
        "predicted_category": category,
        "confidence_score": confidence,
        "priority": CATEGORY_PRIORITY.get(category, "Medium"),
        "review_status": "Auto-Classified" if confidence >= CONFIDENCE_THRESHOLD else "Needs Review",
    }
