import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { FileText, Github, Linkedin, Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';

export const Signup: React.FC = () => {
  const { signup } = useAuth();
  const { addToast } = useResume();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string; terms?: string }>({});

  const validate = () => {
    const nextErrors: { fullName?: string; email?: string; password?: string; terms?: string } = {};
    if (!fullName) {
      nextErrors.fullName = 'Full Name is required';
    }
    if (!email) {
      nextErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      nextErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters long';
    }
    if (!termsAccepted) {
      nextErrors.terms = 'You must accept the Terms and Conditions to proceed';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 800));
      const success = await signup(fullName, email, password);
      if (success) {
        addToast(`Welcome aboard, ${fullName}! Your account has been generated.`, 'success');
        navigate('/dashboard');
      } else {
        addToast('There was an issue creating your account. Try another email.', 'error');
      }
    } catch (err) {
      addToast('An error occurred. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialMock = (platform: string) => {
    addToast(`Registering via your ${platform} workspace...`, 'info');
    setTimeout(async () => {
      await signup('Ahmad Khan', 'ahmad@example.com', 'password');
      addToast(`Logged in successfully via ${platform}!`, 'success');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12 bg-gradient-to-br from-indigo-50/40 via-[#F8F9FF] to-violet-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <div className="w-full max-w-md glass-card rounded-2xl shadow-xl overflow-hidden p-8 space-y-5">
        
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white pt-2 font-display">Create Free Account</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join over 2 million applicants crafting pristine careers.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <User className="h-4 w-4" />
              </span>
              <input
                type="text"
                placeholder="Ahmad Khan"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                  errors.fullName ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>
            {errors.fullName && <p className="text-[10px] text-rose-500 font-medium pl-1">{errors.fullName}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Mail className="h-4 w-4" />
              </span>
              <input
                type="email"
                placeholder="ahmad@example.com"
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
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <Lock className="h-4 w-4" />
              </span>
              <input
                type="password"
                placeholder="Min 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full text-sm pl-10 pr-4 py-2.5 rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all ${
                  errors.password ? 'border-rose-500' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
            </div>
            {errors.password && <p className="text-[10px] text-rose-500 font-medium pl-1">{errors.password}</p>}
          </div>

          {/* Terms checkbox */}
          <div className="space-y-1">
            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                I agree to the <span className="text-indigo-600 font-semibold hover:underline">Terms of Service</span> and{' '}
                <span className="text-indigo-600 font-semibold hover:underline">Privacy Policy</span>.
              </span>
            </label>
            {errors.terms && <p className="text-[10px] text-rose-500 font-medium pl-1">{errors.terms}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 disabled:pointer-events-none"
          >
            {isLoading ? <Loader className="h-4 w-4 animate-spin" /> : 'Create Free Account'}
            {!isLoading && <ArrowRight className="h-4 w-4" />}
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
          <span className="flex-shrink mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-[#F8F9FF] dark:bg-slate-950 px-2 rounded-md">or</span>
          <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
        </div>

        {/* Social */}
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

        {/* Existing account footer link */}
        <p className="text-center text-xs text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
            Log in
          </Link>
        </p>

      </div>
    </div>
  );
};
