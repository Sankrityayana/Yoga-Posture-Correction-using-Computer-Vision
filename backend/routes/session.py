import uuid
from datetime import datetime
from fastapi import APIRouter, HTTPException
from models.schemas import SaveSessionRequest
from db.database import get_sessions_collection

router = APIRouter()


@router.post("/save-session")
async def save_session(session: SaveSessionRequest):
    """Save a completed yoga session to MongoDB."""
    try:
        collection = await get_sessions_collection()
        doc = {
            "session_id": str(uuid.uuid4()),
            "pose_name": session.pose_name,
            "pose_id": session.pose_id,
            "score": session.score,
            "best_score": session.best_score or session.score,
            "duration": session.duration or 0,
            "timestamp": session.timestamp or datetime.utcnow().isoformat(),
        }
        await collection.insert_one(doc)
        return {"status": "saved", "session_id": doc["session_id"]}
    except Exception as e:
        # Non-critical — frontend stores in localStorage anyway
        return {"status": "saved_locally", "note": str(e)}


@router.get("/history/{user_id}")
async def get_history(user_id: str = "default", limit: int = 50):
    """Retrieve session history for a user."""
    try:
        collection = await get_sessions_collection()
        cursor = collection.find({}, {"_id": 0}).sort("timestamp", -1).limit(limit)
        sessions = await cursor.to_list(length=limit)
        return {"sessions": sessions, "count": len(sessions)}
    except Exception as e:
        return {"sessions": [], "count": 0, "note": str(e)}


@router.get("/history")
async def get_all_history(limit: int = 50):
    """Retrieve all sessions."""
    return await get_history(limit=limit)
