# AI Support Ticket Backend

Production-ready FastAPI backend for the AI Support Ticket Classification System. This service exposes REST endpoints for single and batch predictions, stores prediction history in SQLite, and reuses the existing machine-learning prediction pipeline (TF-IDF + MultinomialNB).

Contents
 - `app/` — FastAPI application package (routes, services, models, schemas, database)
 - `prediction.py` — existing ML prediction pipeline (reused, not modified)
 - `support_tickets.db` — SQLite database (created at runtime)

Features
- Single ticket prediction (`/api/v1/predict`)
- Batch CSV prediction (`/api/v1/batch-predict`)
- Prediction history CRUD (`/api/v1/history`)
- Model info and health endpoints (`/api/v1/model-info`, `/api/v1/health`)
- Analytics placeholder endpoint (`/api/v1/analytics`)

Technology Stack

- Python 3.13
- FastAPI, Uvicorn
- SQLAlchemy (SQLite)
- Pydantic (schemas)
- Scikit-learn, joblib, pandas

Folder structure

```
backend/
├─ app/
│  ├─ api/
│  │  ├─ routes/
│  │  │  ├─ predictions.py
│  │  │  └─ info.py
│  │  └─ api.py
│  ├─ core/
│  │  └─ config.py
│  ├─ database/
│  │  ├─ base.py
│  │  └─ session.py
│  ├─ models/
│  │  └─ prediction.py
│  ├─ schemas/
│  │  └─ prediction.py
│  ├─ services/
│  │  ├─ ml_service.py
│  │  └─ db_service.py
│  └─ main.py
├─ requirements.txt
├─ render.yaml
├─ runtime.txt
└─ README.md
```

Installation

1. Create and activate a Python 3.13 virtual environment

```bash
python -m venv .venv
source .venv/bin/activate   # macOS / Linux
.venv\Scripts\activate     # Windows PowerShell
```

2. Install dependencies

```bash
pip install -r backend/requirements.txt
```

Environment variables

Create a `.env` in the repository root (ignored by git). Supported variables:

- `API_V1_STR` — API prefix (default `/api/v1`)
- `SQLITE_PATH` — path to SQLite DB file (default: `support_tickets.db` in repo root)
- `CORS_ORIGINS` — comma-separated allowed origins (default `http://localhost:5173`)
- `MODEL_CONFIDENCE_THRESHOLD` — confidence threshold for human review (default `0.6`)

Running locally

```bash
# from repo root
uvicorn backend.app.main:app --reload --port 8000
```

API endpoints

- POST `/api/v1/predict` — single ticket prediction
	- Request JSON: `{ customer_name, customer_email, subject, description }`
	- Response: `{ ticket_id, customer_name, customer_email, predicted_category, confidence, priority, review_status, timestamp }`

- POST `/api/v1/batch-predict` — CSV upload with columns `subject`, `body`, optional `customer_name`, `customer_email`.
	- Returns: downloadable CSV of predictions.

- GET `/api/v1/history` — list prediction history (supports `page`, `per_page` query params)
- GET `/api/v1/history/{id}` — get single history record
- DELETE `/api/v1/history/{id}` — delete a history record
- GET `/api/v1/model-info` — model metadata (vocabulary size, supported categories)
- GET `/api/v1/analytics` — analytics (placeholder)
- GET `/api/v1/health` — service health

Swagger (OpenAPI)

Once running, interactive API docs are available at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

Deployment (Render)

1. The repository includes a `render.yaml` for Render deployments.
2. Ensure `backend/requirements.txt` is referenced in the buildCommand.
3. Render start command should be: `uvicorn backend.app.main:app --host 0.0.0.0 --port $PORT`

PEP 8 and code quality

All new backend modules use typed signatures and follow PEP 8 conventions. The ML prediction pipeline (`prediction.py`) was not modified as requested.

Future improvements

- Implement robust analytics using DB aggregates
- Add authentication & RBAC for admin endpoints
- Add async DB queries using SQLModel/Databases for scale
- Add pagination, filtering and search to `/history`
- Add unit and integration tests and CI pipeline

License

This project is provided under the MIT License. Update as needed.
