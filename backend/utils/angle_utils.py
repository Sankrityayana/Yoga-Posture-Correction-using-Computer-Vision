"""
Angle calculation utilities (Python port matching frontend angleCalculator.js).
Used for server-side pose verification.
"""
import math
from typing import Optional


def calculate_angle(ax, ay, bx, by, cx, cy, av=1.0, bv=1.0, cv=1.0) -> Optional[float]:
    """Calculate angle at point B formed by vectors B->A and B->C."""
    if av < 0.3 or bv < 0.3 or cv < 0.3:
        return None

    BAx, BAy = ax - bx, ay - by
    BCx, BCy = cx - bx, cy - by

    dot = BAx * BCx + BAy * BCy
    mag_BA = math.sqrt(BAx**2 + BAy**2)
    mag_BC = math.sqrt(BCx**2 + BCy**2)

    if mag_BA == 0 or mag_BC == 0:
        return None

    cos_angle = max(-1.0, min(1.0, dot / (mag_BA * mag_BC)))
    return round(math.degrees(math.acos(cos_angle)), 1)


IDEAL_POSES = {
    "tadasana": {
        "joints": [
            {"name": "Left Knee", "points": [23, 25, 27], "ideal": 175, "tolerance": 10, "weight": 1.5,
             "feedbackHigh": "Straighten your left leg", "feedbackLow": "Release over-extension in left knee"},
            {"name": "Right Knee", "points": [24, 26, 28], "ideal": 175, "tolerance": 10, "weight": 1.5,
             "feedbackHigh": "Straighten your right leg", "feedbackLow": "Release over-extension in right knee"},
            {"name": "Left Hip", "points": [11, 23, 25], "ideal": 175, "tolerance": 10, "weight": 2.0,
             "feedbackHigh": "Stand tall — avoid bending at the hip", "feedbackLow": "Do not lean backward"},
            {"name": "Right Hip", "points": [12, 24, 26], "ideal": 175, "tolerance": 10, "weight": 2.0,
             "feedbackHigh": "Stand tall — avoid bending at the hip", "feedbackLow": "Do not lean backward"},
        ]
    },
    "warrior2": {
        "joints": [
            {"name": "Front Knee", "points": [24, 26, 28], "ideal": 90, "tolerance": 15, "weight": 2.5,
             "feedbackHigh": "Bend your front knee deeper — aim for 90°", "feedbackLow": "Straighten the front knee slightly"},
            {"name": "Back Knee", "points": [23, 25, 27], "ideal": 175, "tolerance": 10, "weight": 2.0,
             "feedbackHigh": "Keep your back leg straight and strong", "feedbackLow": "Ease up on the back leg"},
        ]
    },
}


def evaluate_keypoints(landmarks, pose_id: str):
    """Server-side pose evaluation."""
    pose_def = IDEAL_POSES.get(pose_id)
    if not pose_def or not landmarks:
        return {"score": 0, "feedback": [], "joint_results": []}

    joint_results = []
    for joint in pose_def["joints"]:
        i1, i2, i3 = joint["points"]
        if i1 >= len(landmarks) or i2 >= len(landmarks) or i3 >= len(landmarks):
            continue
        a, b, c = landmarks[i1], landmarks[i2], landmarks[i3]
        angle = calculate_angle(
            a.x, a.y, b.x, b.y, c.x, c.y,
            a.visibility, b.visibility, c.visibility,
        )
        if angle is None:
            continue
        deviation = abs(angle - joint["ideal"])
        excess = max(0, deviation - joint["tolerance"] / 2)
        score = max(0, round(100 - excess * 2.5))
        feedback = None
        if deviation > joint["tolerance"]:
            feedback = joint["feedbackHigh"] if angle > joint["ideal"] else joint["feedbackLow"]
        joint_results.append({
            "name": joint["name"], "angle": angle, "ideal": joint["ideal"],
            "deviation": deviation, "score": score, "feedback": feedback,
            "weight": joint["weight"],
        })

    if not joint_results:
        return {"score": 0, "feedback": ["Could not detect joints — reposition camera"], "joint_results": []}

    total_w = sum(j["weight"] for j in joint_results)
    final_score = round(sum(j["score"] * j["weight"] for j in joint_results) / total_w)
    feedback = [j["feedback"] for j in sorted(joint_results, key=lambda j: j["score"])
                if j["feedback"]][:3]

    return {"score": final_score, "feedback": feedback, "joint_results": joint_results}
