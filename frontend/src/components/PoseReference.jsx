import { motion } from 'framer-motion';

export default function PoseReference({ pose }) {
  if (!pose) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5"
    >
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-white/60 text-xs uppercase tracking-wider font-semibold">
          ▶️ How to do {pose.name}
        </h3>
        <p className="text-white/40 text-xs mt-0.5">{pose.sanskrit} — Tutorial Video</p>
      </div>

      {/* YouTube Embed */}
      <div className="relative w-full rounded-xl overflow-hidden bg-black/20" style={{ paddingBottom: '42%' }}>
        <iframe
          className="absolute inset-0 w-full h-full border-0"
          src={pose.youtubeUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
          title={`${pose.name} Tutorial`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </motion.div>
  );
}
