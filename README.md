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

1. Set up your environment variables:

```bash
cd frontend
cp .env.example .env

```

1. Install and run:

```bash
npm install
npm run dev

```

Open: **<http://localhost:5173>**

Frontend URL: http://localhost:5173

### 2. Backend

```bash
cd backend
python -m venv .venv_fresh
.venv_fresh\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API Docs: **<http://localhost:8000/docs>**

> **Note**: MongoDB is optional. Sessions are saved to localStorage even without the backend.

---

## 🧘 Features

| Feature | Description |
|---------|-------------|

| 🎯 Real-time Detection | MediaPipe tracks 33 body keypoints at 30fps |
| 🦴 Skeleton Overlay | Color-coded skeleton drawn on canvas |
| 📐 Angle Analysis | Joint angles computed via dot-product math |
| 📊 Pose Score | Weighted 0–100 score per session |
| 🔔 Instant Corrections | Specific feedback per joint |
| 📈 Dashboard | History, best scores, session charts |
| 🇮🇳 IKS Foundation | Sanskrit names + classical alignment rules |

---

## 🧘 Supported Asanas (18 Poses)

| Sanskrit | English | Difficulty |
|----------|---------|------------|

| ताडासन | Tadasana (Mountain) | Beginner |
| त्रिकोणासन | Trikonasana (Triangle) | Beginner |
| वृक्षासन | Vrikshasana (Tree) | Beginner |
| वीरभद्रासन १ | Warrior I | Intermediate |
| वीरभद्रासन २ | Warrior II | Intermediate |
| अधोमुखश्वानासन | Downward Dog | Beginner |
| भुजङ्गासन | Bhujangasana (Cobra) | Beginner |
| बालासन | Balasana (Child's) | Beginner |
| उत्कटासन | Utkatasana (Chair) | Beginner |
| चतुरङ्गदण्डासन | Chaturanga Dandasana (Four-Limbed Staff) | Intermediate |
| ऊर्ध्वमुखश्वानासन | Urdhva Mukha Svanasana (Upward Dog) | Beginner |
| नावासन | Navasana (Boat) | Intermediate |
| पश्चिमोत्तानासन | Paschimottanasana (Seated Forward Bend) | Beginner |
| सेतुबन्धसर्वाङ्गासन | Setu Bandhasana (Bridge) | Beginner |
| अञ्जनेयासन | Anjaneyasana (Crescent Lunge) | Beginner |
| मालासन | Malasana (Garland) | Beginner |
| अर्धमत्स्येन्द्रासन | Ardha Matsyendrasana (Half Twist) | Intermediate |
| उत्थितपार्श्वकोणासन | Utthita Parsvakonasana (Extended Side Angle) | Intermediate |

---

## 🏗️ Architecture

```text
Webcam → MediaPipe (browser, CDN)
         ↓ 33 Keypoints
         ↓ Angle Calculation (dot-product)
         ↓ Pose Evaluator (weighted scoring)
         ↓ React UI (canvas overlay + feedback)
         ↓ FastAPI (optional session storage)
         ↓ MongoDB
```

---

## � Deployment

Ready to deploy to production?

- **Frontend**: Vercel (recommended for React apps)
- **Backend**: Render (nice free tier for Python)

**👉 See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions**

Quick deploy summary:

1. Push code to GitHub (yoga branch)
2. Deploy frontend on Vercel (set `VITE_API_URL` env var)
3. Deploy backend on Render (set `CORS_ORIGINS` env var)
4. Test your live app!

---

## �🗄️ Tech Stack

Recommended production split:

- Frontend on Vercel
- Backend on Render

## 📁 Project Structure

```text
├── frontend/
│   ├── src/
│   │   ├── components/   # PoseCamera, FeedbackPanel, ScoreMeter, Navbar, PoseGuide
│   │   ├── pages/        # Landing, PoseSelect, LiveSession, Dashboard
│   │   └── utils/        # idealPoses, angleCalculator, poseEvaluator, poseDetector
│   └── vite.config.js
│
└── backend/
    ├── main.py
    ├── routes/           # pose.py, session.py
    ├── models/           # schemas.py
    ├── db/               # database.py
    └── utils/            # angle_utils.py
```

## Notes

- MongoDB is optional for development. The frontend still keeps session data in local storage.
- If backend persistence is required, verify API payload field naming against backend schema in docs/api-reference.md.
