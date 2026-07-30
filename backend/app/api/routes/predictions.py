from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.orm import Session
from ...schemas.prediction import PredictRequest, PredictResponse, HistoryItem
from ...services.ml_service import ml_service
from ...services.db_service import create_prediction, get_history, get_prediction, delete_prediction
from ...database.session import get_db
import pandas as pd
from io import BytesIO
from fastapi.responses import StreamingResponse

router = APIRouter()


@router.post('/predict', response_model=PredictResponse)
def predict(payload: PredictRequest, db: Session = Depends(get_db)):
    combined = f"{payload.subject.strip()} \n\n{payload.description.strip()}"
    res = ml_service.predict(combined)
    record = {
        'customer_name': payload.customer_name,
        'customer_email': payload.customer_email,
        'subject': payload.subject,
        'description': payload.description,
        'predicted_category': res['predicted_category'],
        'confidence': float(res['confidence_score']),
        'priority': res['priority'],
        'review_status': res['review_status'],
    }
    obj = create_prediction(db, payload=record)
    return {
        'ticket_id': obj.id,
        'customer_name': obj.customer_name,
        'customer_email': obj.customer_email,
        'predicted_category': obj.predicted_category,
        'confidence': obj.confidence,
        'priority': obj.priority,
        'review_status': obj.review_status,
        'timestamp': obj.created_at,
    }


@router.post('/batch-predict')
def batch_predict(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail='Only CSV files are accepted')
    content = file.file.read()
    df = pd.read_csv(BytesIO(content))
    results = []
    rows = []
    for _, row in df.iterrows():
        subj = str(row.get('subject') or '')
        body = str(row.get('body') or '')
        combined = f"{subj}\n\n{body}"
        res = ml_service.predict(combined)
        payload = {
            'customer_name': row.get('customer_name') or 'Unknown',
            'customer_email': row.get('customer_email') or 'unknown@example.com',
            'subject': subj,
            'description': body,
            'predicted_category': res['predicted_category'],
            'confidence': float(res['confidence_score']),
            'priority': res['priority'],
            'review_status': res['review_status'],
        }
        create_prediction(db, payload=payload)
        rows.append({**payload})

    out = pd.DataFrame(rows)
    buf = BytesIO()
    out.to_csv(buf, index=False)
    buf.seek(0)
    return StreamingResponse(buf, media_type='text/csv', headers={'Content-Disposition': 'attachment; filename=predictions.csv'})


@router.get('/history')
def history(page: int = 1, per_page: int = 50, db: Session = Depends(get_db)):
    skip = (page - 1) * per_page
    items = get_history(db, skip=skip, limit=per_page)
    return [HistoryItem.from_orm(i) for i in items]


@router.get('/history/{id}')
def get_one(id: int, db: Session = Depends(get_db)):
    obj = get_prediction(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail='Not found')
    return HistoryItem.from_orm(obj)


@router.delete('/history/{id}', status_code=204)
def delete_one(id: int, db: Session = Depends(get_db)):
    obj = delete_prediction(db, id)
    if not obj:
        raise HTTPException(status_code=404, detail='Not found')
    return None
