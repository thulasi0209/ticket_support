from fastapi import APIRouter
from .routes import predictions, info

api_router = APIRouter()
api_router.include_router(predictions.router, prefix="", tags=["predictions"])
api_router.include_router(info.router, prefix="", tags=["info"])
