import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { FileText, Github, Linkedin, Mail, Lock, ArrowRight, Loader } from 'lucide-react';

export const Login: React.FC = () => {
  const { login } = useAuth();
  const { addToast } = useResume();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};
    if (!email) {
      nextErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 4) {
      nextErrors.password = 'Password must be at least 4 characters long';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      // Simulate network wait
      await new Promise((resolve) => setTimeout(resolve, 800));
      const success = await login(email, password);
      if (success) {
        addToast('Welcome back, Ahmad!', 'success');
        navigate('/dashboard');
      } else {
        addToast('Invalid login credentials provided', 'error');
      }
    } catch (err) {
      addToast('An error occurred during authentication', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialMock = (platform: string) => {
    addToast(`Authenticating with ${platform} account...`, 'info');
    setTimeout(async () => {
      await login('ahmad@example.com', 'password');
      addToast(`Connected with ${platform} as Ahmad Khan!`, 'success');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12 bg-gradient-to-br from-indigo-50/40 via-[#F8F9FF] to-violet-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="w-full max-w-md glass-card rounded-2xl shadow-xl overflow-hidden p-8 space-y-6">
        
        {/* Logo and title */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="bg-indigo-600 dark:bg-violet-600 text-white p-2 rounded-xl">
              <FileText className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-slate-950 dark:text-white">
              Craft<span className="text-indigo-600 dark:text-indigo-400">CV</span>
            </span>
          </Link>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-2">Welcome Back</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to modify your high-fidelity resume documents.
          </p>
        </div>

        {/* Inputs forms */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                  errors.email ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>
            {errors.email && <p className="text-[10px] text-rose-500 font-medium pl-1">{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
              <button 
                type="button" 
                onClick={() => addToast('Reset link sent to input address', 'info')}
                className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-455 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                  errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>
            {errors.password && <p className="text-[10px] text-rose-500 font-medium pl-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
          >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : 'Login'}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-[#F8F9FF] dark:bg-slate-950 px-2 rounded-md">or</span>
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
        </div>

        {/* Social signups */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleSocialMock('LinkedIn')}
            className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer transition-colors"
          >
            <Linkedin className="h-4 w-4 text-[#0A66C2]" />
            LinkedIn
          </button>
          <button
            onClick={() => handleSocialMock('GitHub')}
            className="flex items-center justify-center gap-2 py-2.5 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer transition-colors"
          >
            <Github className="h-4 w-4 text-slate-900 dark:text-white" />
            GitHub
          </button>
        </div>

        {/* Navigation bottom toggle */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          New to CraftCV?{' '}
          <Link to="/signup" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
};
