# Setup Guide

This guide covers local development setup for both frontend and backend.

## 1. Database Prerequisite

- You need a MongoDB instance running locally on `mongodb://localhost:27017` or a cloud MongoDB Atlas string.

## 2. Frontend Setup (React/Vite)

Open your terminal in the target `frontend` folder.

```bash
git clone <repo-url>
cd "Yoga Posture Correction using Computer Vision"
```

### Install Dependencies

```bash
cd frontend
npm install
cp .env.example .env
```

### Environment Configuration

Copy the `.env.example` into a local `.env` file to instruct Vite how to speak to the backend.

```bash
cp .env.example .env
```

Ensure your `.env` contains:
`VITE_API_URL="http://localhost:8000"`

### Start the Server

```bash
npm run dev
```

Navigate to `http://localhost:5173`. The system will automatically construct dynamic MediaPipe tracking using the local webcam.

## 3. Backend Setup (FastAPI)

Open a new terminal tab in the `backend` folder.

## 3) Backend Setup

### Virtual Environment Setup

It is highly recommended you initialize a localized Python environment via `venv`.

```bash
cd backend
python -m venv .venv_fresh
.venv_fresh\Scripts\activate  # On Windows
```

### Install Requirements

```bash
pip install -r requirements.txt
```

### Environment Configurations

Create a `.env` file inside the `backend` directory providing MongoDB specifics and strict CORS maps:

```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=yoga_posture_db
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### Start Development Server

```bash
uvicorn main:app --reload --port 8000
```

### Start Production Server (WSGI)

When preparing for cloud deployment (e.g., DigitalOcean, AWS), utilize Gunicorn with Uvicorn workers to distribute load:

```bash
gunicorn backend.main:app --worker-class=uvicorn.workers.UvicornWorker --timeout=120 --bind 0.0.0.0:8000
```

## 6) Common Setup Pitfalls

- Incorrect env var name: backend uses MONGO_URL, not MONGODB_URI.
- CORS misconfiguration: include exact frontend origin in CORS_ORIGINS.
- Missing HTTPS context in production can block webcam in some browser cases.

