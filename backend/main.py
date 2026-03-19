import os
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routes.pose import router as pose_router
from routes.session import router as session_router

app = FastAPI(
    title="Sankrityayana — Yoga Posture Correction API",
    description="AI-powered yoga posture correction backend using rule-based joint angle evaluation.",
    version="1.0.0",
)

CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"message": "Internal Server Error", "detail": str(exc)},
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
