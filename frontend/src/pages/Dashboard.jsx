import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { POSES } from '../utils/idealPoses.js';
import { scoreToColor } from '../utils/poseEvaluator.js';

const SESSION_KEY = 'yoga_sessions';

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

function formatDuration(s) {
  if (!s) return '—';
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
}

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(SESSION_KEY) || '[]');
    setSessions(data);
  }, []);

  const totalSessions = sessions.length;
  const avgScore = sessions.length
    ? Math.round(sessions.reduce((s, x) => s + x.score, 0) / sessions.length)
    : 0;
  const bestScore = sessions.length ? Math.max(...sessions.map((s) => s.bestScore || s.score)) : 0;
  const totalMinutes = sessions.length
    ? Math.round(sessions.reduce((s, x) => s + (x.duration || 0), 0) / 60)
    : 0;

  // Pose distribution
  const poseCount = {};
  sessions.forEach((s) => {
    poseCount[s.poseName] = (poseCount[s.poseName] || 0) + 1;
  });
  const poseData = Object.entries(poseCount).map(([name, count]) => ({ name: name.split(' ')[0], count }));

  // Last 10 sessions for chart
  const chartData = [...sessions].slice(0, 10).reverse().map((s, i) => ({
    name: formatDate(s.timestamp),
    score: s.score,
    best: s.bestScore || s.score,
  }));

  const clearHistory = () => {
    if (confirm('Clear all session history?')) {
      localStorage.removeItem(SESSION_KEY);
      setSessions([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-iks text-white pt-24 pb-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Dashboard</h1>
            <p className="text-white/40 text-sm mt-1">Track your yoga journey</p>
          </div>
          <Link
            to="/poses"
            className="px-4 py-2 bg-gradient-to-r from-saffron-500 to-orange-500 rounded-xl font-bold text-sm text-white shadow-lg hover:scale-105 transition"
          >
            + New Session
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Sessions', value: totalSessions, icon: '🧘', color: '#f97316' },
            { label: 'Avg Score', value: avgScore || '—', icon: '📊', color: '#6d28d9' },
            { label: 'Best Score', value: bestScore || '—', icon: '🏆', color: '#d97706' },
            { label: 'Minutes Practiced', value: totalMinutes, icon: '⏱', color: '#0d9488' },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl border bg-white/5 border-white/10"
              style={{ borderColor: `${stat.color}30` }}
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🧘</div>
            <h2 className="text-white/60 text-xl font-semibold mb-2">No sessions yet</h2>
            <p className="text-white/30 text-sm mb-6">Start your first practice session to see your progress here.</p>
            <Link
              to="/poses"
              className="inline-block px-6 py-3 bg-gradient-to-r from-saffron-500 to-orange-500 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition"
            >
              Start Practicing
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Score Chart */}
            {chartData.length > 1 && (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <h2 className="text-white font-bold mb-4">Score History (Last 10 Sessions)</h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={chartData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                    <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e1b4b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }}
                    />
                    <Bar dataKey="score" name="Avg Score" fill="#f97316" radius={[4, 4, 0, 0]} opacity={0.8} />
                    <Bar dataKey="best" name="Best Score" fill="#10b981" radius={[4, 4, 0, 0]} opacity={0.6} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Session Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <h2 className="text-white font-bold">Session History</h2>
                <button onClick={clearHistory} className="text-red-400/60 text-xs hover:text-red-400 transition">
                  Clear History
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left p-4 text-white/30 font-medium text-xs">Pose</th>
                      <th className="text-left p-4 text-white/30 font-medium text-xs">Avg Score</th>
                      <th className="text-left p-4 text-white/30 font-medium text-xs">Best</th>
                      <th className="text-left p-4 text-white/30 font-medium text-xs">Duration</th>
                      <th className="text-left p-4 text-white/30 font-medium text-xs">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((s) => {
                      const pose = POSES[s.poseId];
                      return (
                        <tr key={s.id} className="border-b border-white/5 hover:bg-white/3 transition">
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ backgroundColor: pose?.color || '#f97316' }}
                              />
                              <div>
                                <div className="text-white text-sm font-medium">{s.poseName}</div>
                                <div className="text-white/30 text-xs">{pose?.sanskrit || ''}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className="font-bold text-sm"
                              style={{ color: scoreToColor(s.score) }}
                            >
                              {s.score}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="text-green-400 font-semibold text-sm">{s.bestScore || s.score}</span>
                          </td>
                          <td className="p-4 text-white/50">
                            {formatDuration(s.duration)}
                          </td>
                          <td className="p-4 text-white/40 text-xs">{formatDate(s.timestamp)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
