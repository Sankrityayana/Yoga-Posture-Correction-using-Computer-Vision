import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PoseReference({ pose }) {
  const [showVideo, setShowVideo] = useState(false);

  if (!pose) return null;

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 h-full flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <h3 className="text-white/60 text-xs uppercase tracking-wider font-semibold">Reference Pose</h3>
      </div>

      {/* Image/Video Container */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black/20 mb-3 shrink-0">
        <AnimatePresence mode="wait">
          {!showVideo ? (
            <motion.div
              key="image"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <img
                src={pose.referenceImage || 'https://via.placeholder.com/400x500?text=Pose+Reference'}
                alt={`${pose.name} reference`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x500?text=Pose+Reference';
                }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              <iframe
                className="w-full h-full border-0"
                src={pose.youtubeUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
                title={`${pose.name} Tutorial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => setShowVideo(!showVideo)}
          className="absolute bottom-2 right-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 border border-white/20 hover:border-white/40"
          title={showVideo ? 'Show image' : 'Show tutorial video'}
        >
          {showVideo ? '📷 Image' : '▶️ Video'}
        </button>
      </div>

      {/* Pose Info */}
      <div className="space-y-2 text-sm">
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">Sanskrit</p>
          <p className="text-saffron-400 font-semibold">{pose.sanskrit}</p>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">English</p>
          <p className="text-white font-medium">{pose.english}</p>
        </div>
        <div>
          <p className="text-white/40 text-xs uppercase tracking-wider">Difficulty</p>
          <div className="flex items-center gap-1">
            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
              pose.difficulty === 'Beginner'
                ? 'bg-green-500/20 text-green-300'
                : pose.difficulty === 'Intermediate'
                ? 'bg-yellow-500/20 text-yellow-300'
                : 'bg-red-500/20 text-red-300'
            }`}>
              {pose.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Benefits */}
      {pose.benefits && pose.benefits.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-2">Benefits</p>
          <ul className="space-y-1">
            {pose.benefits.slice(0, 3).map((benefit, i) => (
              <li key={i} className="text-white/70 text-xs flex items-start gap-2">
                <span className="text-saffron-400 mt-0.5">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
