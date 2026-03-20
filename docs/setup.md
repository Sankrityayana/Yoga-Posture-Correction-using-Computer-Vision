# Setup & Deployment Guide

This document provides step-by-step instructions to get **Sankrityayana** running locally on your machine, as well as instructions for deploying it to a production environment.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Python](https://www.python.org/) (v3.10+ recommended)
- [MongoDB](https://www.mongodb.com/) (Local installation or a MongoDB Atlas cloud URI)
- Git

---

## Local Development Setup

### 1. Frontend (React + Vite)

The frontend manages the UI, the webcam capture, and runs the MediaPipe Machine Learning model directly in the browser.

```bash
# Navigate to the frontend directory
cd frontend

# Install Node dependencies
npm install

# Create environment file
cp .env.example .env
# (Ensure VITE_API_URL is set to http://localhost:8000 in your .env)

# Start the Vite development server
npm run dev
```
Your frontend will typically be available at `http://localhost:5173`.

### 2. Backend (FastAPI + Python)

The backend handles saving user session data, histories, and high scores.

```bash
# Navigate to the backend directory
cd backend

# (Optional but recommended) Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Start the FastAPI server using Uvicorn
uvicorn main:app --reload --port 8000
```
Your backend API will run at `http://localhost:8000`. 
You can view the interactive Swagger API documentation at `http://localhost:8000/docs`.

*(Note: The app is designed to gracefully degrade. If the backend/MongoDB is offline, the frontend will fallback to `localStorage` to save your session data temporarily.)*

---

## Production Deployment

### Deploying the Frontend (e.g., Vercel / Netlify)

1. Connect your GitHub repository to Vercel/Netlify.
2. Set the **Root Directory** to `frontend`.
3. Set the **Build Command** to `npm run build`.
4. Set the **Output Directory** to `dist`.
5. **Environment Variables**: Add `VITE_API_URL` and point it to your live backend URL (e.g., `https://api.sankrityayana.com`).

### Deploying the Backend (e.g., Render / Fly.io / AWS)

1. Connect your repository to Render as a "Web Service".
2. Set the **Root Directory** to `backend`.
3. Set the **Build Command** to `pip install -r requirements.txt`.
4. Set the **Start Command** to `uvicorn main:app --host 0.0.0.0 --port $PORT`.
5. **Environment Variables**: 
   - `MONGODB_URL`: Your production MongoDB Atlas connection string.
   - `CORS_ORIGINS`: Your live frontend URL (e.g., `https://sankrityayana.vercel.app`) to prevent CORS blocking.
