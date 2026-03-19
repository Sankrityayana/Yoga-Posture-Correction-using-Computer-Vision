import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { POSE_LIST } from '../utils/idealPoses.js';

export default function PoseSelect() {
  const navigate = useNavigate();

  const handleSelect = (pose) => {
    navigate('/session', { state: { pose } });
  };

  return (
    <div className="min-h-screen bg-gradient-iks text-white pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-saffron-500/10 border border-saffron-500/30 text-saffron-400 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            🧘 Select Your Asana
          </span>
          <h1 className="text-4xl font-bold text-white mb-3">Choose a Yoga Pose</h1>
          <p className="text-white/50">
            Select from 8 classical asanas grounded in Indian tradition
          </p>
        </div>

        {/* Pose Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {POSE_LIST.map((pose, idx) => (
            <motion.button
              key={pose.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => handleSelect(pose)}
              className="group relative text-left p-5 rounded-2xl border transition-all duration-300 hover:scale-105 cursor-pointer"
              style={{
                backgroundColor: `${pose.color}08`,
                borderColor: `${pose.color}30`,
              }}
            >
              {/* Glow hover overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 30px ${pose.color}20` }}
              />

              {/* Difficulty badge */}
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full mb-3 inline-block"
                style={{ backgroundColor: `${pose.color}20`, color: pose.color }}
              >
                {pose.difficulty}
              </span>

              {/* Pose names */}
              <h3 className="text-white font-bold text-base mb-0.5">{pose.name}</h3>
              <p
                className="text-sm font-medium mb-0.5"
                style={{ color: pose.color }}
              >
                {pose.sanskrit}
              </p>
              <p className="text-white/40 text-xs mb-3">{pose.english}</p>

              {/* Description */}
              <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
                {pose.description}
              </p>

              {/* Benefits */}
              <div className="space-y-1 mb-4">
                {pose.benefits.slice(0, 2).map((b) => (
                  <div key={b} className="flex items-center gap-1.5">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ backgroundColor: pose.color }}
                    />
                    <span className="text-white/40 text-xs">{b}</span>
                  </div>
                ))}
              </div>

              {/* Start Button */}
              <div
                className="w-full py-2 rounded-xl text-center text-xs font-bold transition-all duration-200"
                style={{
                  backgroundColor: `${pose.color}20`,
                  color: pose.color,
                  border: `1px solid ${pose.color}40`,
                }}
              >
                Start Practice →
              </div>

              {/* Joint count */}
              <div className="absolute top-3 right-3 text-white/20 text-xs">
                {pose.joints.length} joints
              </div>
            </motion.button>
          ))}
        </div>

        {/* Quick tip */}
        <div className="mt-10 text-center p-4 bg-white/3 border border-white/8 rounded-2xl">
          <p className="text-white/40 text-sm">
            💡 <strong className="text-white/60">Tip:</strong> Ensure good lighting and stand 6–8 feet from your camera for best detection accuracy.
          </p>
        </div>
      </div>
    </div>
  );
}
