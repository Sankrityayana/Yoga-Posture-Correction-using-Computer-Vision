from pydantic import BaseModel
from typing import List, Optional, Any
from datetime import datetime


class Landmark(BaseModel):
    x: float
    y: float
    z: float = 0.0
    visibility: float = 1.0


class AnalyzePoseRequest(BaseModel):
    pose_id: str
    landmarks: List[Landmark]


class JointResult(BaseModel):
    name: str
    angle: Optional[float]
    ideal: float
    deviation: Optional[float]
    score: Optional[float]
    feedback: Optional[str]


class AnalyzePoseResponse(BaseModel):
    score: int
    is_good_pose: bool
    feedback: List[str]
    joint_results: List[JointResult]
    message: str


class SaveSessionRequest(BaseModel):
    id: Optional[Any] = None
    pose_name: str
    pose_id: str
    score: int
    best_score: Optional[int] = None
    duration: Optional[int] = None
    timestamp: Optional[str] = None


class SessionResponse(BaseModel):
    session_id: str
    pose_name: str
    pose_id: str
    score: int
    best_score: Optional[int]
    duration: Optional[int]
    timestamp: str
