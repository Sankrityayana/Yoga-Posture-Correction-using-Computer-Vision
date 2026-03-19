import { calculateJointAngles } from './angleCalculator.js';

/**
 * Evaluates pose keypoints against an ideal pose definition.
 * Returns a score (0-100), feedback array, and per-joint results.
 */
export function evaluatePose(keypoints, poseDefinition) {
  if (!keypoints || !poseDefinition) {
    return { score: 0, feedback: [], jointResults: [], isGoodPose: false };
  }

  const jointResults = calculateJointAngles(keypoints, poseDefinition.joints);
  const visibleJoints = jointResults.filter((j) => j.visible && j.score !== null);

  if (visibleJoints.length === 0) {
    return { score: 0, feedback: ['Position yourself fully in camera view'], jointResults, isGoodPose: false };
  }

  // Weighted average score
  const totalWeight = visibleJoints.reduce((sum, j) => sum + j.weight, 0);
  const weightedScore = visibleJoints.reduce((sum, j) => sum + j.score * j.weight, 0);
  const finalScore = Math.round(totalWeight > 0 ? weightedScore / totalWeight : 0);

  // Collect feedback from joints with poor scores
  const feedback = jointResults
    .filter((j) => j.visible && j.feedback)
    .sort((a, b) => a.score - b.score) // worst first
    .slice(0, 3) // show top 3 corrections
    .map((j) => j.feedback);

  const isGoodPose = finalScore >= 75;

  if (isGoodPose && feedback.length === 0) {
    feedback.push('Excellent posture! Hold this pose and breathe deeply 🙏');
  }

  return { score: finalScore, feedback, jointResults, isGoodPose };
}

/**
 * Returns a color for a given score.
 */
export function scoreToColor(score) {
  if (score >= 80) return '#10b981'; // green
  if (score >= 60) return '#f59e0b'; // yellow
  if (score >= 40) return '#f97316'; // orange
  return '#ef4444'; // red
}

/**
 * Returns a motivational message based on score.
 */
export function scoreToMessage(score) {
  if (score >= 90) return 'Perfect! 🙏 Uttama!';
  if (score >= 75) return 'Great form! Keep it up!';
  if (score >= 60) return 'Good effort! Minor corrections needed.';
  if (score >= 40) return 'Keep practicing — you are improving!';
  return 'Getting started — follow the guidance below.';
}
