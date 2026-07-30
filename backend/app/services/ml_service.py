from typing import Tuple, Dict, Any
from ...prediction import load_pipeline, predict_ticket
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import time


class MLService:
    def __init__(self):
        self.vectorizer: TfidfVectorizer | None = None
        self.model: MultinomialNB | None = None
        self.loaded = False

    def load(self, *, vectorizer_path: str | None = None, model_path: str | None = None) -> None:
        if not self.loaded:
            self.vectorizer, self.model = load_pipeline(vectorizer_path=vectorizer_path, model_path=model_path)
            self.loaded = True

    def predict(self, text: str) -> Dict[str, Any]:
        if not self.loaded:
            self.load()
        start = time.time()
        res = predict_ticket(text, vectorizer=self.vectorizer, model=self.model)
        res['prediction_time_ms'] = (time.time() - start) * 1000.0
        return res


ml_service = MLService()
