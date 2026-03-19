import { Pose, POSE_CONNECTIONS } from '@mediapipe/pose';

let poseInstance = null;
let onResultsCallback = null;

/**
 * Initializes MediaPipe Pose.
 * @param {Function} onResults - callback receiving { poseLandmarks }
 */
export async function initPoseDetector(onResults) {
  onResultsCallback = onResults;

  poseInstance = new Pose({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`,
  });

  poseInstance.setOptions({
    modelComplexity: 1,
    smoothLandmarks: true,
    enableSegmentation: false,
    smoothSegmentation: false,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  poseInstance.onResults((results) => {
    if (onResultsCallback) onResultsCallback(results);
  });

  await poseInstance.initialize();
  return poseInstance;
}

export function getPoseInstance() {
  return poseInstance;
}

export function closePoseDetector() {
  if (poseInstance) {
    poseInstance.close();
    poseInstance = null;
  }
}

export { POSE_CONNECTIONS };

/**
 * Draws a skeleton overlay on a canvas using MediaPipe landmarks.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Array} landmarks
 * @param {number} score
 */
export function drawSkeleton(ctx, landmarks, score, canvasWidth, canvasHeight) {
  if (!landmarks || !ctx) return;

  const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';
  const glowColor = score >= 75 ? 'rgba(16, 185, 129, 0.3)' : score >= 50 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(239, 68, 68, 0.3)';

  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // Define connections to draw
  const connections = POSE_CONNECTIONS || [
    [11, 12], [11, 13], [13, 15], [12, 14], [14, 16],
    [11, 23], [12, 24], [23, 24], [23, 25], [24, 26],
    [25, 27], [26, 28], [27, 29], [28, 30], [29, 31], [30, 32],
  ];

  // Draw connection lines with glow
  connections.forEach(([start, end]) => {
    const s = landmarks[start];
    const e = landmarks[end];
    if (!s || !e) return;
    if ((s.visibility || 0) < 0.3 || (e.visibility || 0) < 0.3) return;

    const sx = s.x * canvasWidth;
    const sy = s.y * canvasHeight;
    const ex = e.x * canvasWidth;
    const ey = e.y * canvasHeight;

    // Glow effect
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = glowColor;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Main line
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  // Draw keypoint circles
  landmarks.forEach((lm, idx) => {
    if (!lm || (lm.visibility || 0) < 0.3) return;
    // Only draw important joints
    const importantJoints = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
    if (!importantJoints.includes(idx)) return;

    const x = lm.x * canvasWidth;
    const y = lm.y * canvasHeight;

    // Outer glow circle
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = glowColor;
    ctx.fill();

    // Inner circle
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}
