# Pose Evaluation Algorithm

This document explains how Sankrityayana computes posture quality from webcam landmarks.

## 1) Landmark Input

- Source: MediaPipe Pose
- Output per frame: up to 33 landmarks
- Landmark shape: x, y, z, visibility
- Low-confidence points are ignored in drawing and scoring decisions.

## 2) Joint Angle Measurement

Each scored joint is defined by three landmark indices A-B-C where B is the vertex.

For vectors:

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

