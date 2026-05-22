import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useResume } from '../../context/ResumeContext';
import { FileText, Sun, Moon, Bell, LogOut, Menu, X, Briefcase, Plus, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { addToast } = useResume();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  
  // Theme dark mode toggle state
  const [themeValue, setThemeValue] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('craftcv_theme');
    if (saved) return saved as 'light' | 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (themeValue === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('craftcv_theme', themeValue);
  }, [themeValue]);

  const toggleTheme = () => {
    setThemeValue(themeValue === 'light' ? 'dark' : 'light');
    addToast(`Switched to ${themeValue === 'light' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  const handleLogout = () => {
    logout();
    addToast('Logged out successfully', 'info');
    navigate('/');
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const isDashboardRoute = 
    location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/editor') || 
    location.pathname.startsWith('/cover-letter') || 
    location.pathname.startsWith('/job-tracker') || 
    location.pathname.startsWith('/templates');

  const links = isDashboardRoute && isAuthenticated ? [
    { label: 'Resumes', path: '/dashboard' },
    { label: 'Cover Letters', path: '/dashboard?tab=cover-letters' },
    { label: 'Job Tracker', path: '/job-tracker' },
    { label: 'Templates', path: '/templates' }
  ] : [
    { label: 'Templates', path: '/templates' },
    { label: 'Features', path: '/#features' },
    { label: 'Pricing', path: '/pricing' }
  ];

  const handleNavClick = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path.startsWith('/#')) {
      const el = document.getElementById(path.substring(2));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          const mainEl = document.getElementById(path.substring(2));
          mainEl?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    } else if (path.includes('?tab=')) {
      navigate('/dashboard');
      // Tab change is handled by query param parsing in dashboard
    } else {
      navigate(path);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo left */}
        <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <div className="bg-indigo-600 dark:bg-violet-600 text-white p-2 rounded-xl shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-all">
            <FileText className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white bg-clip-text">
            Craft<span className="text-indigo-600 dark:text-indigo-400">CV</span>
          </span>
        </Link>

        {/* Desktop navigation links */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path || 
              (link.path.includes('cover-letters') && location.search.includes('cover-letters'));
            return (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.path)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right tools and actions */}
        <div className="hidden md:flex items-center gap-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {themeValue === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          {/* Conditional items based on authentications status */}
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* Notification icon */}
              <button 
                onClick={() => addToast('No new notifications', 'info')}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors relative cursor-pointer"
              >
                <Bell className="h-4 w-4" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <img
                    src={user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50'}
                    className="h-8 w-8 rounded-full object-cover"
                    alt={user.fullName}
                    referrerPolicy="no-referrer"
                  />
                </button>

                {isProfileDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setIsProfileDropdownOpen(false)} 
                    />
                    <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl py-2 z-20">
                      <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/80">
                        <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user.fullName}</p>
                        <p className="text-xs text-slate-400 truncate">{user.email}</p>
                      </div>
                      
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        <User className="h-4 w-4" />
                        Go to Dashboard
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left"
                      >
                        <LogOut className="h-4 w-4" />
                        Log Out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 mr-1 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {themeValue === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all p-4 flex flex-col gap-2">
          {links.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.path)}
              className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {link.label}
            </button>
          ))}
          
          {isAuthenticated && user ? (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 flex flex-col gap-2">
              <div className="px-4 py-2">
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user.fullName}</p>
                <p className="text-xs text-slate-400">{user.email}</p>
              </div>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User className="h-4 w-4" />
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left"
              >
                <LogOut className="h-4 w-4" />
                Log Out
              </button>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-2 flex flex-col gap-2">
              <Link
                to="/login"
                className="text-center px-4 py-2.5 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Started Free
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
