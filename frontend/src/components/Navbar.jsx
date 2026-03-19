import { Link, useLocation } from 'react-router-dom';
import { Activity, LayoutDashboard, BookOpen } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const links = [
    { to: '/', label: 'Home', icon: '🏠' },
    { to: '/poses', label: 'Poses', icon: '🧘' },
    { to: '/session', label: 'Practice', icon: '▶' },
    { to: '/dashboard', label: 'Dashboard', icon: '📊' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-saffron-400 to-saffron-600 flex items-center justify-center shadow-lg shadow-saffron-500/30 group-hover:shadow-saffron-500/60 transition-all">
            <span className="text-white text-lg">🪷</span>
          </div>
          <div>
            <span className="text-white font-bold text-sm block leading-tight">Sankrityayana</span>
            <span className="text-white/40 text-xs">AI Yoga Coach</span>
          </div>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-saffron-500/20 text-saffron-300 border border-saffron-500/30'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{link.icon}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </div>

        {/* IKS Badge */}
        <div className="hidden md:flex items-center gap-2 bg-saffron-500/10 border border-saffron-500/20 rounded-full px-3 py-1.5">
          <span className="text-saffron-400 text-xs font-semibold">🇮🇳 IKS Based</span>
        </div>
      </div>
    </nav>
  );
}
