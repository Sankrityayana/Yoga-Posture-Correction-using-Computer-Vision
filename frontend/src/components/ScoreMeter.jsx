import { useEffect, useState } from 'react';
import { scoreToColor } from '../utils/poseEvaluator.js';

export default function ScoreMeter({ score = 0 }) {
  const [displayScore, setDisplayScore] = useState(0);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (displayScore / 100) * circumference;
  const color = scoreToColor(displayScore);

  useEffect(() => {
    // Smooth animate to new score
    const diff = score - displayScore;
    if (Math.abs(diff) < 1) return;
    const timer = setTimeout(() => {
      setDisplayScore((prev) => {
        const step = Math.sign(diff) * Math.min(Math.abs(diff), 3);
        return Math.round(prev + step);
      });
    }, 16);
    return () => clearTimeout(timer);
  }, [score, displayScore]);

  const getLabel = (s) => {
    if (s >= 90) return 'Uttama';
    if (s >= 75) return 'Excellent';
    if (s >= 60) return 'Good';
    if (s >= 40) return 'Fair';
    return 'Practice';
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 180, height: 180 }}>
        {/* Background glow */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-30 transition-all duration-500"
          style={{ backgroundColor: color }}
        />

        <svg width="180" height="180" className="relative z-10 -rotate-90">
          {/* Background ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="12"
          />
          {/* Score ring */}
          <circle
            cx="90"
            cy="90"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{ transition: 'stroke-dashoffset 0.3s ease, stroke 0.5s ease' }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          <span
            className="text-4xl font-bold transition-all duration-300"
            style={{ color }}
          >
            {displayScore}
          </span>
          <span className="text-white/50 text-xs mt-0.5">/ 100</span>
          <span
            className="text-xs font-semibold mt-1 transition-all duration-300"
            style={{ color }}
          >
            {getLabel(displayScore)}
          </span>
        </div>
      </div>

      <p className="text-white/40 text-xs mt-2">Pose Score</p>
    </div>
  );
}
