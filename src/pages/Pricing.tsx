import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { Check, ArrowRight, HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

const PRICING_FAQS = [
  { q: "Can I cancel my subscription at any time?", a: "Absolutely. Standard billing cycles are monthly or annual. Cancel directly in your user settings menu under profile in one click with no onboarding blocks." },
  { q: "Are there any hidden costs? What about watermarks?", a: "None. Both Free and Pro files are generated with 100% vector scales, absolute compliance, and zero watermark overlays." },
  { q: "Do you offer discounts for educational use?", a: "Yes, students and academic clubs can write to support@craftcv.io to unlock 6 months of absolute Pro credentials for free." },
  { q: "Which formats can I exports to?", a: "We support industry standard PDF downloads, JSON state formats, and plain text backups designed to fit ATS scanner requirements." }
];

export const Pricing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addToast } = useResume();
  const [isAnnual, setIsAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const handlePlanSelection = (plan: string) => {
    addToast(`Selected the ${plan} plan setup!`, 'success');
    if (!isAuthenticated) {
      navigate('/signup');
    } else {
      navigate('/dashboard');
    }
  };

  const freeFeatures = [
    '1 Active resume document',
    'Standard ATS matching configurations',
    'Watermark-free PDF export',
    'Basic local storage storage',
    'Choose from 4 simple templates'
  ];

  const proFeatures = [
    'Unlimited active resumes',
    'Unlimited cover letters',
    'Advanced ✨ AI Assist (Tone correction & bullet suggestions)',
    '12 Premium templates with customized sliders',
    'Sync resumes to Job Tracker columns',
    'Priority customer support routes'
  ];

  const teamFeatures = [
    'Everything in Pro plan',
    'Collaborative real-time canvas shared workspace',
    'Consolidated billing statements',
    'Dedicated talent acquisition managers',
    'API access routes for employee records',
    'SLA reliability guarantee (99.9%)'
  ];

  return (
    <div className="bg-[#F8F9FF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-16 sm:py-24 px-4 sm:px-6 lg:px-8 transition-colors relative overflow-hidden">
      
      {/* Decorative glowing background elements for Frosted Glass theme */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-200/40 dark:bg-indigo-950/20 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-[15%] right-[5%] w-[450px] h-[450px] bg-purple-200/35 dark:bg-purple-950/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      
      <div className="max-w-6xl mx-auto space-y-16 relative z-10">
        
        {/* Header content */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-xl mx-auto">
            Design professional, high-fidelity applications. Start free, scale when you apply for advanced roles.
          </p>

          {/* Toggle Button */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-sm font-semibold transition-colors ${!isAnnual ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors focus:ring-1 focus:ring-indigo-500 flex items-center p-0.5 cursor-pointer"
            >
              <div
                className={`w-5 h-5 rounded-full bg-indigo-600 dark:bg-indigo-500 shadow transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${isAnnual ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>
              Annual
              <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full uppercase">
                Save 33%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: Free */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Free Plan</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Perfect to construct and download your first baseline resume.</p>
              </div>
              <div className="flex items-baseline gap-1 text-slate-950 dark:text-white">
                <span className="text-4xl font-extrabold">$0</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">/ forever</span>
              </div>
              <div className="border-t border-slate-50 dark:border-slate-700/50" />
              <ul className="space-y-3">
                {freeFeatures.map((f) => (
                  <li key={f} className="flex gap-2 items-center text-xs text-slate-600 dark:text-slate-300">
                    <Check className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8">
              <button
                onClick={() => handlePlanSelection('Free')}
                className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer active:scale-95 transition-all text-center"
              >
                Get Started Free
              </button>
            </div>
          </div>

          {/* Card 2: Pro - Purple Card Most Popular */}
          <div className="bg-gradient-to-br from-indigo-700/85 to-indigo-850/85 backdrop-blur-md text-white p-8 rounded-2xl flex flex-col justify-between shadow-xl shadow-indigo-500/20 relative transform scale-105 border-2 border-indigo-400/30">
            <div className="absolute -top-3 right-6 bg-amber-400 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
              Most Popular
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Pro Specialist</h3>
                <p className="text-xs text-indigo-200">Ideal for active job applicants looking to optimize callbacks with custom templates.</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{isAnnual ? '$4' : '$6'}</span>
                <span className="text-indigo-200 text-xs font-semibold">/ month {isAnnual && 'billed annually'}</span>
              </div>
              <div className="border-t border-indigo-600" />
              <ul className="space-y-3">
                {proFeatures.map((f) => (
                  <li key={f} className="flex gap-2 items-center text-xs text-indigo-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8">
              <button
                onClick={() => handlePlanSelection('Pro')}
                className="w-full py-3 rounded-xl bg-white text-indigo-900 hover:bg-indigo-50 font-bold text-sm shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer transition-all text-center"
              >
                Start Free Trial
              </button>
            </div>
          </div>

          {/* Card 3: Team */}
          <div className="glass-card p-8 rounded-2xl flex flex-col justify-between shadow-sm hover:shadow-md transition-all">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Organization</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">For agencies, recruiting camps, and multi-user configurations.</p>
              </div>
              <div className="flex items-baseline gap-1 text-slate-950 dark:text-white">
                <span className="text-4xl font-extrabold">{isAnnual ? '$8' : '$12'}</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold">/ user / mo</span>
              </div>
              <div className="border-t border-slate-50 dark:border-slate-700/50" />
              <ul className="space-y-3">
                {teamFeatures.map((f) => (
                  <li key={f} className="flex gap-2 items-center text-xs text-slate-600 dark:text-slate-300">
                    <Check className="h-4 w-4 text-indigo-500 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-8">
              <button
                onClick={() => handlePlanSelection('Team')}
                className="w-full py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer active:scale-95 transition-all text-center"
              >
                Contact Sales
              </button>
            </div>
          </div>

        </div>

        {/* Pricing FAQs Area */}
        <div className="max-w-2xl mx-auto pt-16 space-y-8">
          <div className="text-center space-y-2">
            <HelpCircle className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mx-auto" />
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white">Billing FAQ</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Brief guidance on renewals, payment methods, and compliance values.</p>
          </div>

          <div className="space-y-3">
            {PRICING_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card rounded-xl overflow-hidden hover:border-indigo-300/40 dark:hover:border-indigo-550/20"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-5 py-4 font-semibold text-slate-800 dark:text-white flex items-center justify-between focus:outline-none cursor-pointer text-sm"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-500 dark:text-slate-300 border-t border-slate-100 dark:border-slate-750/50 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
