import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

export default function FeedbackPanel({ feedback = [], score = 0, isGoodPose = false }) {
  return (
    <div className="flex flex-col gap-3">
      {/* Overall Status */}
      <div
        className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
          isGoodPose
            ? 'bg-green-500/10 border-green-500/30 text-green-300'
            : score > 0
            ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            : 'bg-white/5 border-white/10 text-white/40'
        }`}
      >
        {isGoodPose ? (
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
        ) : score > 0 ? (
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
        ) : (
          <Info className="w-5 h-5 flex-shrink-0" />
        )}
        <span className="text-sm font-medium">
          {score === 0
            ? 'Waiting for pose detection...'
            : isGoodPose
            ? 'Excellent posture! 🙏 Uttama!'
            : 'Adjust your pose — see corrections below'}
        </span>
      </div>

      {/* Individual Feedback Messages */}
      <div className="space-y-2">
        <AnimatePresence mode="sync">
          {feedback.length > 0 ? (
            feedback.map((msg, idx) => (
              <motion.div
                key={msg}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
              >
                <span className="text-red-400 text-lg leading-none mt-0.5">⚠</span>
                <p className="text-red-300 text-sm leading-relaxed">{msg}</p>
              </motion.div>
            ))
          ) : score > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-3 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <span className="text-green-400 text-lg">✓</span>
              <p className="text-green-300 text-sm">All joints aligned perfectly!</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
