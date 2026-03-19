from fastapi import APIRouter
from models.schemas import AnalyzePoseRequest, AnalyzePoseResponse, JointResult
from utils.angle_utils import evaluate_keypoints

router = APIRouter()


@router.post("/analyze-pose", response_model=AnalyzePoseResponse)
async def analyze_pose(request: AnalyzePoseRequest):
    """
    Receive pose keypoints from the browser and return a score + feedback.
    Primary inference runs browser-side; this endpoint provides a secondary
    server-side evaluation path.
    """
    result = evaluate_keypoints(request.landmarks, request.pose_id)
    score = result["score"]
    is_good = score >= 75

    if is_good and not result["feedback"]:
        result["feedback"] = ["Excellent posture! Hold this pose and breathe deeply 🙏"]

    message = (
        "Perfect! Uttama! 🙏" if score >= 90
        else "Great form!" if score >= 75
        else "Good effort — minor corrections needed" if score >= 60
        else "Keep practicing — you are improving!"
    )

    joint_results = [
        JointResult(
            name=j["name"],
            angle=j["angle"],
            ideal=j["ideal"],
            deviation=j["deviation"],
            score=j["score"],
            feedback=j["feedback"],
        )
        for j in result["joint_results"]
    ]

    return AnalyzePoseResponse(
        score=score,
        is_good_pose=is_good,
        feedback=result["feedback"],
        joint_results=joint_results,
        message=message,
    )
