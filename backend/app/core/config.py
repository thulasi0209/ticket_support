from pathlib import Path
import os
from typing import List


class Settings:
    PROJECT_NAME: str = os.getenv("PROJECT_NAME", "AI Support Ticket API")
    API_V1_STR: str = os.getenv("API_V1_STR", "/api/v1")
    SQLITE_PATH: str = os.getenv("SQLITE_PATH", str(Path(__file__).resolve().parents[3] / "support_tickets.db"))
    CORS_ORIGINS: List[str] = os.getenv("CORS_ORIGINS", "http://localhost:5173").split(',')
    CORS_ORIGIN_REGEX: str = os.getenv("CORS_ORIGIN_REGEX", "")
    MODEL_CONFIDENCE_THRESHOLD: float = float(os.getenv("MODEL_CONFIDENCE_THRESHOLD", "0.6"))


settings = Settings()
