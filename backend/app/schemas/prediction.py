from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class PredictRequest(BaseModel):
    customer_name: str = Field(..., min_length=1)
    customer_email: EmailStr
    subject: str = Field(..., min_length=1)
    description: str = Field(..., min_length=1)


class PredictResponse(BaseModel):
    ticket_id: int
    customer_name: str
    customer_email: EmailStr
    predicted_category: str
    confidence: float
    priority: str
    review_status: str
    timestamp: datetime


class HistoryItem(BaseModel):
    id: int
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: Optional[str]
    predicted_category: str
    confidence: float
    priority: str
    review_status: str
    created_at: datetime

    class Config:
        from_attributes = True
