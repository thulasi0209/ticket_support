# AI Support Ticket Classification System

An AI-powered system that classifies incoming support tickets into categories (Billing, Technical Support, Account Management, Feature Request, General Inquiry), assigns a priority, and flags low-confidence predictions for human review. Built with a FastAPI backend (TF-IDF + MultinomialNB classifier) and a React frontend.

Live demo: https://ticket-support-6brx.vercel.app?_vercel_share=RImonRwkf028EAVnrUkfeMogXa2xa4Cu

## Project structure

```
.
├─ backend/     FastAPI service, ML prediction pipeline, SQLite storage
├─ frontend/    Vite + React client
└─ pyproject.toml
```

See [backend/README.md](backend/README.md) and [frontend/README.md](frontend/README.md) for service-specific details.

## Features

- Single ticket prediction with predicted category, confidence score, and priority
- Batch CSV prediction
- Prediction history with pagination
- Automatic "Needs Review" flagging for low-confidence predictions
- Model info and health endpoints

## Tech stack

**Backend:** Python 3.13, FastAPI, Uvicorn, SQLAlchemy (SQLite), Pydantic, scikit-learn, joblib, pandas

**Frontend:** React 19, Vite, Tailwind CSS, Material UI, Framer Motion, Recharts, Axios, React Hook Form, React Hot Toast

## Getting started

### Backend

```bash
python -m venv .venv
source .venv/bin/activate        # Windows: .venv\Scripts\activate
pip install -r backend/requirements.txt
uvicorn backend.app.main:app --reload --port 8000
```

API docs available at `http://localhost:8000/docs` once running.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env` with `VITE_API_URL=http://localhost:8000` to point the client at a local backend.

## Deployment

- **Backend:** Render (see `backend/render.yaml`)
- **Frontend:** Vercel

## License

MIT
