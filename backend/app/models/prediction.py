from sqlalchemy import Column, DateTime, Float, Integer, String, func
from sqlalchemy.orm import declarative_base

from ..database.base import metadata

Base = declarative_base(metadata=metadata)


class PredictionHistory(Base):
    __tablename__ = "prediction_history"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String, nullable=False)
    customer_email = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    description = Column(String, nullable=True)
    predicted_category = Column(String, nullable=False)
    confidence = Column(Float, nullable=False)
    priority = Column(String, nullable=False)
    review_status = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
