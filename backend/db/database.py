import os
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "yoga_posture_db")

_client = None


async def get_db():
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(MONGO_URL, serverSelectionTimeoutMS=3000)
    return _client[DB_NAME]


async def get_sessions_collection():
    db = await get_db()
    return db["sessions"]


async def get_users_collection():
    db = await get_db()
    return db["users"]
