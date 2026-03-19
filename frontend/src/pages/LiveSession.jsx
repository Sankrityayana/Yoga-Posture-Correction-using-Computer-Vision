import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PoseCamera from '../components/PoseCamera.jsx';
import FeedbackPanel from '../components/FeedbackPanel.jsx';
import ScoreMeter from '../components/ScoreMeter.jsx';
import PoseGuide from '../components/PoseGuide.jsx';
import { POSES } from '../utils/idealPoses.js';
import { scoreToMessage } from '../utils/poseEvaluator.js';
import axios from 'axios';

const SESSION_KEY = 'yoga_sessions';

export default function LiveSession() {
  const location = useLocation();
  const navigate = useNavigate();
  const pose = location.state?.pose || POSES.tadasana;

  const [isActive, setIsActive] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState([]);
  const [isGoodPose, setIsGoodPose] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [scores, setScores] = useState([]);
  const [sessionDone, setSessionDone] = useState(false);
  const timerRef = useRef(null);
  const bestScoreRef = useRef(0);

  // Session timer
  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => setSessionTime((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isActive]);

  const handleResult = useCallback(
    (evaluation) => {
      setScore(evaluation.score);
      setFeedback(evaluation.feedback);
      setIsGoodPose(evaluation.isGoodPose);
      setScores((prev) => {
        const updated = [...prev.slice(-29), evaluation.score];
        return updated;
      });
      if (evaluation.score > bestScoreRef.current) {
        bestScoreRef.current = evaluation.score;
      }
    },
    []
  );

  const formatTime = (s) => {
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  };

  const handleEndSession = () => {
    setIsActive(false);
    const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    const session = {
      id: Date.now(),
      poseName: pose.name,
      poseId: pose.id,
      score: avgScore,
      bestScore: bestScoreRef.current,
      duration: sessionTime,
      timestamp: new Date().toISOString(),
    };
    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem(SESSION_KEY) || '[]');
    localStorage.setItem(SESSION_KEY, JSON.stringify([session, ...existing]));
    // Try backend save (non-blocking)
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    axios.post(`${apiUrl}/save-session`, session).catch(() => {});
    setSessionDone(true);
  };

  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <div className="min-h-screen bg-gradient-iks text-white pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">{pose.name}</h1>
            <p className="text-saffron-400 text-sm">{pose.sanskrit} • {pose.english}</p>
          </div>
          <div className="flex items-center gap-3">
            {isActive && (
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-white font-mono">{formatTime(sessionTime)}</span>
              </div>
            )}
            {!sessionDone && (
              <button
                onClick={() => (isActive ? handleEndSession() : setIsActive(true))}
                className={`px-5 py-2 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30'
                    : 'bg-gradient-to-r from-saffron-500 to-orange-500 text-white shadow-lg shadow-saffron-500/30 hover:scale-105'
                }`}
              >
                {isActive ? '⏹ End Session' : '▶ Start Session'}
              </button>
            )}
          </div>
        </div>

        {/* Session Complete Banner */}
        <AnimatePresence>
          {sessionDone && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-5 bg-green-500/10 border border-green-500/30 rounded-2xl text-center"
            >
              <div className="text-4xl mb-2">🙏</div>
              <h2 className="text-white font-bold text-xl mb-1">Session Complete!</h2>
              <p className="text-green-300 mb-4">
                Average Score: <strong>{avgScore}/100</strong> · Best: <strong>{bestScoreRef.current}/100</strong> · Time: <strong>{formatTime(sessionTime)}</strong>
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setSessionDone(false); setSessionTime(0); setScores([]); bestScoreRef.current = 0; }}
                  className="px-4 py-2 bg-saffron-500/20 border border-saffron-500/30 text-saffron-300 rounded-xl text-sm font-medium hover:bg-saffron-500/30 transition"
                >
                  Practice Again
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl text-sm font-medium hover:bg-white/15 transition"
                >
                  View Dashboard →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main layout: Camera left, Controls right */}
        <div className="grid lg:grid-cols-5 gap-5">
          {/* Camera (3/5) */}
          <div className="lg:col-span-3 space-y-4">
            <PoseCamera
              poseDefinition={pose}
              onResult={handleResult}
              isActive={isActive}
            />

            {/* Live score history mini-chart */}
            {scores.length > 1 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
                <p className="text-white/40 text-xs mb-2">Live Score History</p>
                <div className="flex items-end gap-0.5 h-16">
                  {scores.map((s, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm transition-all duration-200"
                      style={{
                        height: `${s}%`,
                        backgroundColor:
                          s >= 75 ? '#10b981' : s >= 50 ? '#f59e0b' : '#ef4444',
                        opacity: 0.6 + (i / scores.length) * 0.4,
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Panel (2/5) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Score Meter */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center">
              <ScoreMeter score={score} />
              <p className="text-white/50 text-sm mt-3 text-center">{scoreToMessage(score)}</p>
              {isActive && (
                <div className="mt-3 flex gap-4 text-center">
                  <div>
                    <div className="text-white/30 text-xs">Avg</div>
                    <div className="text-saffron-400 font-bold">{avgScore}</div>
                  </div>
                  <div>
                    <div className="text-white/30 text-xs">Best</div>
                    <div className="text-green-400 font-bold">{bestScoreRef.current}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Feedback Panel */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">Corrections</h3>
              <FeedbackPanel feedback={feedback} score={score} isGoodPose={isGoodPose} />
            </div>

            {/* Pose Guide */}
            <PoseGuide pose={pose} />
          </div>
        </div>
      </div>
    </div>
  );
}
