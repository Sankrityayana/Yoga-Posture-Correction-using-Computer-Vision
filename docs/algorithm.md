# Asana Evaluation Algorithm

This document outlines the computer vision logic governing Sankrityayana's real-time postural evaluation.

## 1. Landmark Extraction

We utilize the **MediaPipe Pose Engine** which extracts 33 standardized body keypoints per video frame. Keypoints include nose, shoulders, elbows, wrists, hips, knees, and ankles.
Each point returned contains `(x, y, z)` spatial coordinates and a visibility confidence threshold.

## 2. Mathematical Foundation: The Angle Heuristic

Our evaluation mechanism relies heavily on the geometric angles between joints rather than raw spatial positions. This makes the AI invariant to user scale (how close they are to the camera), bounding box cropping, and camera orientation.

### Angle Calculation Formula

To find the angle $ \theta $ at joint $B$ formed by the segments $AB$ and $BC$, we use the Arc Tangent algorithm:

```python
radians = math.atan2(c_y - b_y, c_x - b_x) - math.atan2(a_y - b_y, a_x - b_x)
angle = abs(radians * 180.0 / math.pi)
if angle > 180.0:
    angle = 360 - angle
```

## 3. Heuristic Scoring

For each configured Asana (e.g., Tadasana, Vrikshasana), defined critical angles are mapped:

- **Tadasana (Mountain Pose):** Evaluates if the spine, knees, and ankles are fundamentally straight (180° variance checks).
- **Vrikshasana (Tree Pose):** Computes the angle of the bent resting knee and the straight stabilizing leg, ensuring hands are raised symmetrically.

**Scoring Normalization:**
An absolute deviation mapped penalty is applied. If a user's elbow angle is 150° but the target is 180°, the 30° deviation reduces the score. Once the cumulative deviation across all tracked joints surpasses the failure threshold, the score scales dynamically from 100 to 0.

## 4. UI Skeleton Overlay

The `poseDetector.js` module draws a connected skeleton tree using `canvas.getContext('2d')`.

- Joints with `visibility < 0.3` are ignored to prevent skeleton flickering.
- Confident posture (Score > 75) glows Green.
- Warning posture (Score > 50) glows Orange.
- Critical posture (Score < 50) glows Red.
