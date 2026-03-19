# Initialization & Setup Guide

Welcome to the Sankrityayana deployment guide! Follow these steps closely to set up both environments seamlessly.

## 1. Database Prerequisite
- You need a MongoDB instance running locally on `mongodb://localhost:27017` or a cloud MongoDB Atlas string.

## 2. Frontend Setup (React/Vite)
Open your terminal in the target `frontend` folder.

```bash
cd frontend
```

### Install Dependencies
```bash
npm install
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

```bash
cd backend
```

### Virtual Environment Setup
It is highly recommended you initialize a localized Python environment via `venv`.
```bash
python -m venv .venv_fresh
.venv_fresh\Scripts\activate  # On Windows
```

### Install Requirements
```bash
pip install -r requirements.txt
```

### Environment Configuration
Create a `.env` file inside the `backend` directory providing MongoDB specifics and strict CORS maps:
```env
MONGO_URI="mongodb://localhost:27017"
CORS_ORIGINS="http://localhost:5173"
```

### Start Development Server
```bash
python -m uvicorn main:app --reload --port 8000
```

### Start Production Server (WSGI)
When preparing for cloud deployment (e.g., DigitalOcean, AWS), utilize Gunicorn with Uvicorn workers to distribute load:
```bash
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8000
```
