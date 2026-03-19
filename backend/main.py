from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.pose import router as pose_router
from routes.session import router as session_router

app = FastAPI(
    title="Sankrityayana — Yoga Posture Correction API",
    description="AI-powered yoga posture correction backend using rule-based joint angle evaluation.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pose_router, tags=["Pose Analysis"])
app.include_router(session_router, tags=["Sessions"])


@app.get("/")
def root():
    return {
        "message": "🪷 Sankrityayana Yoga API is running",
        "docs": "/docs",
    }


@app.get("/health")
def health():
    return {"status": "ok", "service": "yoga-posture-correction"}
