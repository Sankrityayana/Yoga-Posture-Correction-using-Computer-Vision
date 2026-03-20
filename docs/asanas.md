# Sankrityayana: Asana Dictionary & Scoring Guide

This guide details the **18 Classical Asanas** supported by the Sankrityayana AI Coach. 

The application utilizes Google's **MediaPipe Pose** model (33 3D keypoints) and evaluates positions using a custom vector-angle algorithm (`angleCalculator.js`) verified against Indian Knowledge Systems (IKS) classical alignment principles.

---

## The 18 Asanas

| # | Sanskrit Name | English Term | Difficulty | Core Benefit |
|:-:|---------------|--------------|------------|--------------|
| 1 | ताडासन (Tadasana) | Mountain Pose | Beginner | Foundation, Posture |
| 2 | त्रिकोणासन (Trikonasana) | Triangle Pose | Beginner | Stretches hips, hamstrings |
| 3 | वृक्षासन (Vrikshasana) | Tree Pose | Beginner | Balance, ankle strength |
| 4 | वीरभद्रासन १ (Virabhadrasana I) | Warrior I | Intermediate | Strength, Chest opening |
| 5 | वीरभद्रासन २ (Virabhadrasana II)| Warrior II | Intermediate | Focus, leg stabilization |
| 6 | अधोमुखश्वानासन (Adho Mukha Svanasana)| Downward Dog | Beginner | Full body stretch |
| 7 | भुजङ्गासन (Bhujangasana) | Cobra Pose | Beginner | Spine strength, lower back |
| 8 | बालासन (Balasana) | Child's Pose | Beginner | Surrender, rest |
| 9 | उत्कटासन (Utkatasana) | Chair Pose | Beginner | Thigh/Core strength |
| 10 | चतुरङ्गदण्डासन (Chaturanga Dandasana)| Four-Limbed Staff| Intermediate | Arm/Core power |
| 11 | ऊर्ध्वमुखश्वानासन (Urdhva Mukha Svanasana)| Upward Dog | Beginner | Massive chest stretch |
| 12 | नावासन (Navasana) | Boat Pose | Intermediate | Abdominal endurance |
| 13 | पश्चिमोत्तानासन (Paschimottanasana) | Seated Forward Bend| Beginner | Hamstring/Spine release |
| 14 | सेतुबन्धसर्वाङ्गासन (Setu Bandhasana) | Bridge Pose | Beginner | Gentle inversion/backbend|
| 15 | अञ्जनेयासन (Anjaneyasana) | Crescent Lunge | Beginner | Hip flexor opening |
| 16 | मालासन (Malasana) | Garland Pose | Beginner | Groin release, digestion |
| 17 | अर्धमत्स्येन्द्रासन (Ardha Matsyendrasana)| Half Lord of the Fishes| Intermediate | Spinal twist/detox |
| 18 | उत्थितपार्श्वकोणासन (Utthita Parsvakonasana)| Extended Side Angle| Intermediate | Side flank extension |

---

## AI Evaluation Mechanics

Every frame processed by MediaPipe feeds into `poseEvaluator.js`. The AI checks specific joint angles (in degrees) against "ideal" targets defined in `idealPoses.js`. 

Here is how a pose is mathematically scored:

1. **Calculate Joint Angle**: Given 3 points (e.g., Hip [23], Knee [25], Ankle [27]), dot-product math calculates the 2D interior angle.
2. **Tolerance Checking**: An angle of 170° might have an ideal target of 180° with a tolerance of ±15°. Since 170° is within the tolerance boundary, it yields a perfect score for that joint.
3. **Weighting Mechanism**: Some joints are "critical" to an asana. For example, in **Tree Pose (Vrikshasana)**, keeping the standing leg perfectly straight (weight `2.5`) is statistically more important than arm elevation (weight `1.5`).
4. **Actionable Feedback**: If an angle falls outside the tolerance, specific corrective feedback strings trigger recursively (e.g. `feedbackHigh: "Keep your standing leg straight and strong"`, `feedbackLow: "Micro-bend the standing knee — do not lock it"`).

### Example Evaluation: Trikonasana (Triangle Pose)

- **Front Knee Angle Targets**:
  - Points: `Right Hip (24)`, `Right Knee (26)`, `Right Ankle (28)`
  - Ideal Angle: `175°` (Almost totally straight)
  - Tolerance: `±10°`
  - *Correction*: "Keep your front leg straight — do not bend the knee."
- **Hip Tilt Alignment**:
  - Points: `Left Shoulder (11)`, `Left Hip (23)`, `Right Hip (24)`
  - Ideal Angle: `100°` (Slightly past perpendicular as the torso tilts parallel over the front leg)
  - Tolerance: `±15°`
  - Weight: `2.5` (Critical for true Trikonasana)
  - *Correction*: "Tilt from your hip — do not crunch the side."
