import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .api.api import api_router
from .database.session import engine
from .models.prediction import Base
from .services.ml_service import ml_service
import logging

logger = logging.getLogger('uvicorn.error')

app = FastAPI(title=settings.PROJECT_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_origin_regex=settings.CORS_ORIGIN_REGEX or None,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event('startup')
def on_startup():
    # create tables
    Base.metadata.create_all(bind=engine)
    # load the ML model once
    try:
        ml_service.load()
    except Exception as exc:
        logger.exception('Failed to load ML pipeline during startup')


@app.middleware('http')
async def log_requests(request: Request, call_next):
    start = time.time()
    response = await call_next(request)
    process_time = (time.time() - start) * 1000.0
    logger.info(f"{request.method} {request.url.path} completed_in={process_time:.2f}ms status_code={response.status_code}")
    return response


app.include_router(api_router, prefix=settings.API_V1_STR)
