import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  { icon: '🎯', title: 'Real-Time Detection', desc: 'MediaPipe AI tracks 33 body keypoints at 30fps' },
  { icon: '📐', title: 'Angle Analysis', desc: 'Calculates joint angles & detects deviations instantly' },
  { icon: '📊', title: 'Pose Score', desc: 'Weighted 0–100 score for every joint in real-time' },
  { icon: '🔔', title: 'Instant Corrections', desc: 'Specific guidance for each body part in Sanskrit + English' },
  { icon: '📈', title: 'Progress Tracking', desc: 'Session history, streak & improvement over time' },
  { icon: '🇮🇳', title: 'IKS Foundation', desc: 'Based on classical Yoga scriptures & alignment rules' },
];

const poses = [
  { name: 'Tadasana', emoji: '🧍', color: '#f97316' },
  { name: 'Trikonasana', emoji: '🔺', color: '#6d28d9' },
  { name: 'Vrikshasana', emoji: '🌲', color: '#0d9488' },
  { name: 'Warrior II', emoji: '⚔️', color: '#d97706' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-iks text-white overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-saffron-500/10 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-purple-600/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-3/4 left-1/2 w-64 h-64 rounded-full bg-teal-600/10 blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-24">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Sanskrit badge */}
            <div className="inline-flex items-center gap-2 bg-saffron-500/10 border border-saffron-500/30 rounded-full px-4 py-2 mb-6">
              <span className="text-saffron-400 text-sm">🪷</span>
              <span className="text-saffron-300 text-sm font-medium">Based on Indian Knowledge Systems (IKS)</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-saffron-300 via-saffron-400 to-orange-300 bg-clip-text text-transparent">
                AI Yoga Coach
              </span>
              <br />
              <span className="text-white/90">in Real-Time</span>
            </h1>

            <p className="text-xl text-white/60 max-w-2xl mx-auto mb-4 leading-relaxed">
              Your personal Sanskrit-powered trainer using Computer Vision. 
              Get instant pose corrections, joint angle analysis, and progress tracking — all in your browser.
            </p>

            {/* Sanskrit quote */}
            <p className="text-saffron-400/70 text-sm italic mb-10 font-serif">
              "योगश्चित्तवृत्तिनिरोधः" — Yoga is the cessation of the fluctuations of the mind.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/poses"
                className="px-8 py-4 bg-gradient-to-r from-saffron-500 to-orange-500 rounded-2xl font-bold text-white text-lg shadow-xl shadow-saffron-500/30 hover:shadow-saffron-500/50 hover:scale-105 transition-all duration-300"
              >
                🧘 Start Practicing
              </Link>
              <Link
                to="/dashboard"
                className="px-8 py-4 bg-white/5 border border-white/15 rounded-2xl font-semibold text-white text-lg hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                📊 View Dashboard
              </Link>
            </div>
          </motion.div>

          {/* Floating pose preview cards */}
          <motion.div
            className="mt-16 flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {poses.map((p, i) => (
              <motion.div
                key={p.name}
                className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 backdrop-blur"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, delay: i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="text-xl">{p.emoji}</span>
                <span className="text-white/70 text-sm font-medium">{p.name}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: '33', label: 'Body Keypoints' },
              { value: '8', label: 'Yoga Asanas' },
              { value: '30fps', label: 'Realtime Analysis' },
              { value: '0–100', label: 'Pose Score' },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-white/5 border border-white/10 rounded-2xl">
                <div className="text-3xl font-bold text-saffron-400">{stat.value}</div>
                <div className="text-white/50 text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Why Sankrityayana?
            </h2>
            <p className="text-white/50 text-lg">Ancient wisdom, modern AI</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-saffron-500/30 hover:bg-white/8 transition-all group"
              >
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="text-white font-bold mb-2">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 px-6 bg-black/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-2">How It Works</h2>
          <p className="text-white/40 mb-12">Four simple steps to perfect your asana</p>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🎯', label: 'Choose Pose', desc: 'Select from 8 classical asanas' },
              { step: '02', icon: '📸', label: 'Open Webcam', desc: 'AI detects your body instantly' },
              { step: '03', icon: '🦴', label: 'Track Joints', desc: '33 keypoints analyzed in real-time' },
              { step: '04', icon: '✅', label: 'Get Score', desc: 'Instant corrections + progress saved' },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-2xl bg-saffron-500/20 border border-saffron-500/30 flex items-center justify-center text-2xl mb-3">
                  {s.icon}
                </div>
                <div className="text-saffron-500 text-xs font-bold mb-1">{s.step}</div>
                <div className="text-white font-semibold text-sm mb-1">{s.label}</div>
                <div className="text-white/40 text-xs text-center">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 border-t border-white/5 text-center">
        <p className="text-white/30 text-sm">
          🪷 Sankrityayana — Built for Chanakya IKS Software Hackathon · Powered by MediaPipe + React
        </p>
        <p className="text-saffron-500/40 text-xs mt-1 font-serif">
          सर्वे भवन्तु सुखिनः — May all beings be happy
        </p>
      </footer>
    </div>
  );
}
