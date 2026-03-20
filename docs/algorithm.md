# Pose Evaluation Algorithm

This document explains how Sankrityayana computes posture quality from webcam landmarks.

## 1. Landmark Extraction

We utilize the **MediaPipe Pose Engine** which extracts 33 standardized body keypoints per video frame. Keypoints include nose, shoulders, elbows, wrists, hips, knees, and ankles.
Each point returned contains `(x, y, z)` spatial coordinates and a visibility confidence threshold.

## 2. Mathematical Foundation: The Angle Heuristic

Our evaluation mechanism relies heavily on the geometric angles between joints rather than raw spatial positions. This makes the AI invariant to user scale (how close they are to the camera), bounding box cropping, and camera orientation.

### Angle Calculation Formula

To find the angle $ \theta $ at joint $B$ formed by the segments $AB$ and $BC$, we use the Arc Tangent algorithm:

Each scored joint is defined by three landmark indices A-B-C where B is the vertex.

## 3. Heuristic Scoring

For each configured Asana (e.g., Tadasana, Vrikshasana), defined critical angles are mapped:

- **Tadasana (Mountain Pose):** Evaluates if the spine, knees, and ankles are fundamentally straight (180° variance checks).
- **Vrikshasana (Tree Pose):** Computes the angle of the bent resting knee and the straight stabilizing leg, ensuring hands are raised symmetrically.

$$
\vec{BA} = A - B, \quad \vec{BC} = C - B
$$

Angle in degrees:

$$
	heta = \left|\operatorname{atan2}(y_C - y_B, x_C - x_B) - \operatorname{atan2}(y_A - y_B, x_A - x_B)\right| \times \frac{180}{\pi}
$$

Normalization:

$$
	heta = 360 - \theta \quad \text{if } \theta > 180
$$

## 3) Pose Definition

Each asana in frontend/src/utils/idealPoses.js defines:

- Joint name
- Landmark triplet points
- Ideal angle
- Tolerance window
- Weight in final score
- High/low correction messages

This lets each pose encode different biomechanics while reusing one scorer.

## 4) Per-Joint Scoring

For each visible joint:

- Compute deviation from ideal.
- Convert deviation into a bounded joint score.
- Select correction message when outside tolerance.

Invisible or invalid joints are excluded from weighted average.

## 5) Final Score

If visible joints are present:

$$
	ext{FinalScore} = \mathrm{round}\left(\frac{\sum (\text{JointScore}_i \cdot \text{Weight}_i)}{\sum \text{Weight}_i}\right)
$$

If no visible joints are available:

- Final score is 0
- Feedback prompts user to position body fully in frame

## 6) Feedback Extraction

- Joint feedback candidates are sorted by lowest score first.
- Top three corrections are shown.
- If score is strong and no corrections exist, a positive reinforcement message is returned.

## 7) Visual Feedback Layer

Skeleton overlay is rendered on canvas:

- Green for score >= 75
- Amber for score >= 50
- Red for score < 50

Only important landmarks are drawn for clarity.

## 8) Practical Behavior

- Fast response due to browser-side processing
- Camera distance and person scale are handled better than pixel-distance heuristics
- Performance depends on webcam quality, lighting, and side-view occlusion

## 4. UI Skeleton Overlay

The `poseDetector.js` module draws a connected skeleton tree using `canvas.getContext('2d')`.

- Joints with `visibility < 0.3` are ignored to prevent skeleton flickering.
- Confident posture (Score > 75) glows Green.
- Warning posture (Score > 50) glows Orange.
- Critical posture (Score < 50) glows Red.
