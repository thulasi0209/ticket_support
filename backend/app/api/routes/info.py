from fastapi import APIRouter
from ...services.ml_service import ml_service
from ...core.config import settings
from fastapi import HTTPException

router = APIRouter()


@router.get('/model-info')
def model_info():
    if not ml_service.loaded:
        try:
            ml_service.load()
        except Exception as e:
            raise HTTPException(status_code=500, detail='Model load failed')
    info = {
        'model_name': 'Support Ticket Classifier',
        'algorithm': 'Multinomial Naive Bayes',
        'training_date': None,
        'training_samples': None,
        'vocabulary_size': len(ml_service.vectorizer.get_feature_names_out()) if ml_service.vectorizer else None,
        'supported_categories': list(ml_service.model.classes_) if ml_service.model else [],
        'confidence_threshold': settings.MODEL_CONFIDENCE_THRESHOLD,
    }
    return info


@router.get('/analytics')
def analytics():
    # lightweight analytics placeholder; use DB for real data
    return {'total': None, 'categories': {}, 'trend': []}


@router.get('/health')
def health():
    return {'status': 'ok', 'version': '1.0.0', 'model_loaded': ml_service.loaded}
