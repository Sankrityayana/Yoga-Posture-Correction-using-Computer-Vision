import { motion } from 'framer-motion';

const JOINT_GUIDES = {
  tadasana: [
    { label: 'Spine', value: 'Straight', tip: 'Stack head over hips' },
    { label: 'Knees', value: '175°', tip: 'Soft, not locked' },
    { label: 'Arms', value: 'At sides', tip: 'Palms facing forward' },
  ],
  trikonasana: [
    { label: 'Front Leg', value: 'Straight', tip: 'Knee over ankle' },
    { label: 'Hip Tilt', value: '100°', tip: 'Open hips fully' },
    { label: 'Arms', value: 'Extended', tip: 'One up, one down' },
  ],
  warrior1: [
    { label: 'Front Knee', value: '90°', tip: 'Over the ankle' },
    { label: 'Back Leg', value: 'Straight', tip: 'Heel grounded at 45°' },
    { label: 'Arms', value: 'Overhead', tip: 'Reach high, look up' },
  ],
  warrior2: [
    { label: 'Front Knee', value: '90°', tip: 'Over the ankle' },
    { label: 'Arms', value: 'Parallel', tip: 'Level with shoulders' },
    { label: 'Hips', value: 'Open', tip: 'Face to the side' },
  ],
  vrikshasana: [
    { label: 'Standing Leg', value: 'Straight', tip: 'Rooted and firm' },
    { label: 'Raised Foot', value: 'Inner thigh', tip: 'Avoid pressing knee' },
    { label: 'Arms', value: 'Overhead', tip: 'Palms together' },
  ],
  downwarddog: [
    { label: 'Arms', value: '165°', tip: 'Fully extended' },
    { label: 'Hips', value: 'High', tip: 'Sharp V-shape' },
    { label: 'Heels', value: 'Down', tip: 'Press toward floor' },
  ],
  bhujangasana: [
    { label: 'Elbows', value: '140°', tip: 'Slight bend' },
    { label: 'Chest', value: 'Lifted', tip: 'Open your heart' },
    { label: 'Hips', value: 'On floor', tip: 'Keep grounded' },
  ],
  balasana: [
    { label: 'Knees', value: '40°', tip: 'Hips to heels' },
    { label: 'Arms', value: 'Extended', tip: 'Reach forward' },
    { label: 'Forehead', value: 'On mat', tip: 'Release all tension' },
  ],
};

export default function PoseGuide({ pose }) {
  if (!pose) return null;
  const guides = JOINT_GUIDES[pose.id] || [];

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
      {/* Pose Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-bold text-base">{pose.name}</h3>
          <p className="text-saffron-400 text-xs font-medium">{pose.sanskrit}</p>
          <p className="text-white/40 text-xs mt-0.5">{pose.english}</p>
        </div>
        <span
          className="text-xs px-2 py-1 rounded-full font-medium"
          style={{
            backgroundColor: `${pose.color}20`,
            color: pose.color,
            border: `1px solid ${pose.color}40`,
          }}
        >
          {pose.difficulty}
        </span>
      </div>

      {/* Description */}
      <p className="text-white/50 text-xs mb-3 leading-relaxed">{pose.description}</p>

      {/* Target Joint Angles */}
      <div className="mb-3">
        <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Target Alignment</p>
        <div className="space-y-2">
          {guides.map((g) => (
            <div key={g.label} className="flex items-center justify-between">
              <span className="text-white/60 text-xs">{g.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-saffron-400 text-xs font-semibold">{g.value}</span>
                <span className="text-white/30 text-xs">— {g.tip}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-step guidance */}
      <div>
        <p className="text-white/30 text-xs uppercase tracking-wider mb-2">Step-by-Step</p>
        <ol className="space-y-1">
          {pose.guidance.map((step, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-saffron-500 text-xs font-bold mt-0.5">{i + 1}.</span>
              <span className="text-white/60 text-xs">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
