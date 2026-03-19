/**
 * Calculates the angle (in degrees) at point B formed by vectors B→A and B→C.
 * Uses dot-product formula: cos(θ) = (BA · BC) / (|BA| × |BC|)
 */
export function calculateAngle(A, B, C) {
  if (!A || !B || !C) return null;
  if (A.visibility < 0.3 || B.visibility < 0.3 || C.visibility < 0.3) return null;

  const BAx = A.x - B.x;
  const BAy = A.y - B.y;
  const BCx = C.x - B.x;
  const BCy = C.y - B.y;

  const dot = BAx * BCx + BAy * BCy;
  const magBA = Math.sqrt(BAx * BAx + BAy * BAy);
  const magBC = Math.sqrt(BCx * BCx + BCy * BCy);

  if (magBA === 0 || magBC === 0) return null;

  const cosAngle = Math.max(-1, Math.min(1, dot / (magBA * magBC)));
  return Math.round((Math.acos(cosAngle) * 180) / Math.PI);
}

/**
 * Calculate all joint angles for a given pose definition using detected keypoints.
 * @param {Array} keypoints - Array of 33 MediaPipe pose landmarks
 * @param {Array} joints - Joint definitions from idealPoses.js
 * @returns {Array} Array of {name, angle, ideal, tolerance, deviation, score, feedback, weight}
 */
export function calculateJointAngles(keypoints, joints) {
  if (!keypoints || keypoints.length < 33) return [];

  return joints.map((joint) => {
    const [i1, i2, i3] = joint.points;
    const angle = calculateAngle(keypoints[i1], keypoints[i2], keypoints[i3]);

    if (angle === null) {
      return {
        name: joint.name,
        angle: null,
        ideal: joint.ideal,
        tolerance: joint.tolerance,
        deviation: null,
        score: null,
        feedback: null,
        weight: joint.weight,
        visible: false,
      };
    }

    const deviation = Math.abs(angle - joint.ideal);
    // Score: 100 if within tolerance, degrades linearly after that
    const excessDeviation = Math.max(0, deviation - joint.tolerance / 2);
    const score = Math.max(0, Math.round(100 - excessDeviation * 2.5));

    let feedback = null;
    if (deviation > joint.tolerance) {
      feedback = angle > joint.ideal ? joint.feedbackHigh : joint.feedbackLow;
    }

    return {
      name: joint.name,
      angle,
      ideal: joint.ideal,
      tolerance: joint.tolerance,
      deviation,
      score,
      feedback,
      weight: joint.weight,
      visible: true,
    };
  });
}
