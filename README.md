# Sankrityayana - AI Yoga Posture Correction

Sankrityayana is a real-time yoga posture assistant built for the Chanakya IKS Software Hackathon. It combines browser-side computer vision with rule-based pose scoring to give immediate correction feedback while preserving user privacy.

The webcam stream is processed in the browser using MediaPipe Pose. The backend is lightweight and handles optional analysis and session persistence.

## What This Project Does

- Tracks body landmarks in real time from webcam input.
- Evaluates selected asanas using configurable joint-angle rules.
- Displays score, pose quality, and corrective feedback instantly.
- Stores session summaries in local storage and optionally in MongoDB via FastAPI.

## Main Features

- Real-time pose detection with MediaPipe Pose.
- Weighted 0-100 scoring model with per-joint tolerance.
- Feedback panel with top actionable corrections.
- Session timer, best score, average score, and score history chart.
- Dashboard view for session history.
- Sanskrit and English pose metadata with guided cues.

## Supported Asanas

- Tadasana (Mountain Pose)
- Trikonasana (Triangle Pose)
- Vrikshasana (Tree Pose)
- Virabhadrasana I (Warrior I)
- Virabhadrasana II (Warrior II)
- Adho Mukha Svanasana (Downward Dog)
- Bhujangasana (Cobra Pose)
- Balasana (Child's Pose)

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion
- CV Runtime: MediaPipe Pose (browser)
- Backend: FastAPI, Pydantic, Motor, Uvicorn/Gunicorn
- Database: MongoDB (optional)

## Quick Start

### 1. Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend URL: http://localhost:5173

### 2. Backend

```bash
cd backend
python -m venv .venv_fresh
.venv_fresh\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

Backend URL: http://localhost:8000

## Documentation Map

- Setup Guide: docs/setup-guide.md
- Architecture: docs/architecture.md
- Algorithm Details: docs/algorithm.md
- API Reference: docs/api-reference.md
- Troubleshooting: docs/troubleshooting.md
- Development Guide: docs/development-guide.md
- Docs Index: docs/README.md
- Deployment Guide: DEPLOYMENT.md
- Frontend Guide: frontend/README.md
- Backend Guide: backend/README.md

## Project Structure

```text
Yoga Posture Correction using Computer Vision/
    backend/
        main.py
        routes/
        models/
        db/
        utils/
    frontend/
        src/
            components/
            pages/
            utils/
    docs/
        setup-guide.md
        architecture.md
        algorithm.md
        api-reference.md
        troubleshooting.md
```

## Deployment

Recommended production split:

- Frontend on Vercel
- Backend on Render

See DEPLOYMENT.md for complete, step-by-step deployment instructions.

## Notes

- MongoDB is optional for development. The frontend still keeps session data in local storage.
- If backend persistence is required, verify API payload field naming against backend schema in docs/api-reference.md.
