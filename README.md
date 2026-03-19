# 🪷 Sankrityayana — AI Yoga Posture Correction

> **Chanakya IKS Software Hackathon** · Computer Vision + Indian Knowledge Systems

A real-time AI yoga coach that uses your webcam and MediaPipe to detect body keypoints, calculate joint angles, and give instant posture corrections — based on classical yoga principles.

---

## 🚀 Quick Start

### Frontend (React + Vite + MediaPipe)

```bash
cd frontend
npm install
npm run dev
```
Open: **http://localhost:5173**

### Backend (FastAPI + MongoDB)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
API Docs: **http://localhost:8000/docs**

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

## 🧘 Supported Asanas (8 Poses)

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

---

## 🏗️ Architecture

```
Webcam → MediaPipe (browser, CDN)
         ↓ 33 Keypoints
         ↓ Angle Calculation (dot-product)
         ↓ Pose Evaluator (weighted scoring)
         ↓ React UI (canvas overlay + feedback)
         ↓ FastAPI (optional session storage)
         ↓ MongoDB
```

---

## 🗄️ Tech Stack

- **Frontend**: React 18 + Vite + TailwindCSS + Framer Motion
- **AI/ML**: `@mediapipe/pose` (browser inference, CDN)
- **Backend**: FastAPI (Python) + Motor (async MongoDB)
- **Database**: MongoDB
- **Charts**: Recharts

---

## 📁 Project Structure

```
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

---

*"योगश्चित्तवृत्तिनिरोधः" — Yoga is the cessation of the fluctuations of the mind.*
