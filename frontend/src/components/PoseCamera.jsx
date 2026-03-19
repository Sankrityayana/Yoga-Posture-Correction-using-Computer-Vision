import { useEffect, useRef, useState } from 'react';
import { initPoseDetector, drawSkeleton } from '../utils/poseDetector.js';
import { evaluatePose } from '../utils/poseEvaluator.js';

export default function PoseCamera({ poseDefinition, onResult, isActive }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const poseRef = useRef(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isActive) return;
    let cancelled = false;

    async function setup() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
        if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        const pose = await initPoseDetector((results) => {
          if (!canvasRef.current || !videoRef.current) return;
          const ctx = canvasRef.current.getContext('2d');
          const w = canvasRef.current.width;
          const h = canvasRef.current.height;

          ctx.clearRect(0, 0, w, h);

          if (results.poseLandmarks) {
            const evaluation = evaluatePose(results.poseLandmarks, poseDefinition);
            drawSkeleton(ctx, results.poseLandmarks, evaluation.score, w, h);
            if (onResult) onResult(evaluation);
          }
        });

        poseRef.current = pose;
        if (cancelled) { pose.close(); return; }
        setCameraReady(true);

        // Send frames to MediaPipe
        async function sendFrame() {
          if (cancelled || !videoRef.current || !poseRef.current) return;
          if (videoRef.current.readyState >= 2) {
            await poseRef.current.send({ image: videoRef.current });
          }
          animFrameRef.current = requestAnimationFrame(sendFrame);
        }
        sendFrame();
      } catch (err) {
        console.error(err);
        setError('Camera access denied. Please allow webcam access and refresh.');
      }
    }

    setup();

    return () => {
      cancelled = true;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (poseRef.current) poseRef.current.close();
      setCameraReady(false);
    };
  }, [isActive, poseDefinition]);

  return (
    <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {!isActive && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-950 z-10">
          <div className="text-6xl mb-4 animate-float">🧘</div>
          <p className="text-white/60 text-sm">Press Start to activate camera</p>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/80 z-20 p-6">
          <div className="text-4xl mb-3">⚠️</div>
          <p className="text-red-300 text-center text-sm">{error}</p>
        </div>
      )}

      {/* Flip video horizontally for mirror effect */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        style={{ transform: 'scaleX(-1)' }}
        muted
        playsInline
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ transform: 'scaleX(-1)' }}
        width={640}
        height={480}
      />

      {isActive && !cameraReady && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-saffron-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-white/70 text-sm">Loading AI model...</p>
          </div>
        </div>
      )}

      {/* Live indicator */}
      {cameraReady && (
        <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur rounded-full px-3 py-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-xs font-medium">LIVE</span>
        </div>
      )}
    </div>
  );
}
