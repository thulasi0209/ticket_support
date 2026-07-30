from sqlalchemy.orm import Session
from ..models.prediction import PredictionHistory


def create_prediction(db: Session, *, payload: dict) -> PredictionHistory:
    obj = PredictionHistory(
        customer_name=payload.get('customer_name'),
        customer_email=payload.get('customer_email'),
        subject=payload.get('subject'),
        description=payload.get('description'),
        predicted_category=payload.get('predicted_category'),
        confidence=payload.get('confidence'),
        priority=payload.get('priority'),
        review_status=payload.get('review_status'),
    )
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


def get_history(db: Session, skip: int = 0, limit: int = 100):
    return db.query(PredictionHistory).order_by(PredictionHistory.created_at.desc()).offset(skip).limit(limit).all()


def get_prediction(db: Session, id: int):
    return db.query(PredictionHistory).filter(PredictionHistory.id == id).first()


def delete_prediction(db: Session, id: int):
    obj = get_prediction(db, id)
    if obj:
        db.delete(obj)
        db.commit()
    return obj
