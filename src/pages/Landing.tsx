import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useResume } from '../context/ResumeContext';
import { motion } from 'motion/react';
import { 
  Plus, Check, Sparkles, Layout, ChevronDown, Award, 
  Download, Feather, ArrowRight, ShieldCheck, Heart, UserCheck, Star 
} from 'lucide-react';

const HOW_IT_WORKS_STEPS = [
  { id: 1, label: 'Choose Template', desc: 'Select from our ATS-approved, beautiful professional formats.', icon: Layout },
  { id: 2, label: 'Add Experience', desc: 'Fill out your expertise, schooling, and achievements.', icon: Feather },
  { id: 3, label: 'Customize Design', desc: 'Pick your signature palette, typography scale, and spacing configs.', icon: Sparkles },
  { id: 4, label: 'Download PDF', desc: 'Secure your watermark-free, polished PDF in seconds.', icon: Download }
];

const LANDING_TEMPLATES = [
  { id: 'modern-exec', name: 'The Modern Exec', url: 'https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=300' },
  { id: 'studio-designer', name: 'The Studio Designer', url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300' },
  { id: 'dev-stack', name: 'The Dev Stack', url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300' },
  { id: 'junior-entry', name: 'The Junior Entry', url: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=300' }
];

const FEATURE_CARDS = [
  { title: 'Free Forever', desc: 'Construct your initial resume free of charge, with all features available.', icon: Award },
  { title: 'No Watermarks', desc: 'We never imprint branding layouts on your downloads; your CV remains yours.', icon: Feather },
  { title: 'Unlimited Downloads', desc: 'Iterate endlessly and extract new copies as frequently as needed.', icon: Download },
  { title: '52+ Pro Templates', desc: 'A wide selector of responsive frameworks built with designer layouts.', icon: Layout },
  { title: 'Import PDF/JSON', desc: 'Boot operations immediately by feeding in pre-existing resumes.', icon: UserCheck },
  { title: 'GDPR Compliant', desc: 'Your private entries stay highly encrypted. Absolutely safe.', icon: ShieldCheck }
];

const TESTIMONIAL_CARDS = [
  { stars: 5, quote: "This tool is a visual upgrade over anything else out on Google search. The dynamic sidebar controls let me customize elements instantly.", name: "Sophia Martinez", source: "Product Manager" },
  { stars: 5, quote: "CraftCV landed me calls with Snowflake and Stripe. The clean ATS format passed scanner checklists effortlessly.", name: "Aarav Sharma", source: "Fullstack Architect" },
  { stars: 5, quote: "No sneaky paywalls at final click. Pure elegant download functionality, completely professional outcomes.", name: "David K.", source: "Accountant" },
  { stars: 5, quote: "The Kanban board is incredibly useful. It links my resumes right directly into application tracker pipelines.", name: "Elena Rostova", source: "Junior Analyst" },
  { stars: 5, quote: "Clean UX, great dark mode support, feels like Linear and Notion but focused fully on job seeker layouts.", name: "Marcus Brody", source: "UX Designer" },
  { stars: 5, quote: "The AI assist saved me hours of summarizing bullets. It outputs professional phrases in real-time.", name: "Liam Fitzgerald", source: "Marketing Director" }
];

const FAQS = [
  { q: "Is CraftCV really free?", a: "Yes, you can build, customize, and download your first complete resume in professional high-fidelity PDF formats completely for free. No credit card required, zero watermarks labels." },
  { q: "Will my resume be ATS-friendly?", a: "Absolutely. All templates are designed and tested following strict parsing rules. Recruiters scanners will parse your professional summaries, skills lists, and durations flawlessly." },
  { q: "Can I manage multiple resumes?", a: "Yes, our interactive cloud dashboard stores multiple documents in sync so you can tweak individual resumes to map exactly to distinct job vacancies." },
  { q: "How does the cover letter AI helper work?", a: "Simply choose your template tone (Professional, Friendly, Confident), hit the '✨ AI Assist' button, and our generative engines will write clean section drafts that you can instantly add and tweak." },
  { q: "Does this save my edits offline?", a: "Yes, CraftCV implements offline local state backups, ensuring you won't lose your work even if your browser connection drops." },
  { q: "Is my personal data secure?", a: "Your safety is our core value. We encrypt state records and maintain 100% GDPR compliance. None of your contact info is sold or distributed." },
  { q: "What's the difference between the Free and Pro plan?", a: "The Free tier supports your complete first document. The Pro Plan unlocks unlimited resume templates, AI revisions, and full Kanban scheduler status tags." },
  { q: "How do I download the resume as PDF?", a: "Directly click the 'Download PDF' button to extract a vector graphic representing your resume page with optimal layout ratios." }
];

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { addResume } = useResume();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleCreateResume = () => {
    if (isAuthenticated) {
      const newId = addResume('My Software Developer CV', 'modern-exec');
      navigate(`/editor/${newId}`);
    } else {
      navigate('/signup');
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-[#F8F9FF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen transition-colors relative overflow-hidden">
      
      {/* Absolute decorative blurred shapes for premium Frosted Glass theme */}
      <div className="absolute top-[3%] left-[-10%] w-[450px] h-[450px] bg-indigo-200/40 dark:bg-indigo-950/20 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse duration-[10s]" />
      <div className="absolute top-[25%] right-[-10%] w-[500px] h-[500px] bg-sky-200/35 dark:bg-sky-950/15 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse duration-[12s]" />
      <div className="absolute top-[60%] left-[-5%] w-[480px] h-[480px] bg-purple-200/30 dark:bg-purple-950/20 rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse duration-[8s]" />
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left Content */}
          <div className="md:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold text-xs border border-indigo-100 dark:border-indigo-900">
              <Sparkles className="h-3 w-3" />
              Next-Gen CV Architecture
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1]">
              Build a Job-Winning <br />
              <span className="text-indigo-600 dark:text-indigo-400 bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text">Resume for Free</span>
            </h1>
            
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              Professional templates, unlimited PDF downloads, no watermarks. Your first resume are free forever. Start generating high-fidelity applications instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <button
                onClick={handleCreateResume}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 dark:bg-indigo-600 dark:hover:bg-indigo-500 shadow-xl shadow-indigo-600/25 hover:scale-[1.03] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link
                to="/templates"
                className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-850 transition-colors text-center"
              >
                Browse Templates
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-4 flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current text-yellow-500" />)}
              </div>
              <span>⭐ 4.9/5 · Trusted by 2M+ job seekers worldwide</span>
            </div>
          </div>

          {/* Hero Right Mockup Image */}
          <div className="md:col-span-5 relative flex justify-center">
            <div className="absolute inset-0 bg-indigo-500/10 dark:bg-indigo-500/5 blur-3xl rounded-full" />
            <motion.div 
              initial={{ rotate: 1, y: 10 }}
              animate={{ rotate: -2, y: 0 }}
              transition={{ repeat: Infinity, repeatType: 'reverse', duration: 4, ease: 'easeInOut' }}
              className="relative aspect-[3/4] w-full max-w-[340px] bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-700/80 p-5 cursor-pointer hover:rotate-0 hover:scale-105 transition-all duration-300"
            >
              {/* Fake Resume Content lines to mock elegant dashboard */}
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-4">
                <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center font-bold text-indigo-600 dark:text-indigo-400">
                  AK
                </div>
                <div>
                  <div className="h-3 w-28 bg-slate-800 dark:bg-white rounded" />
                  <div className="h-2 w-32 bg-slate-300 dark:bg-slate-500 rounded mt-1.5" />
                </div>
              </div>
              <div className="space-y-3 mt-4">
                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-2 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="h-2 w-4/6 bg-slate-200 dark:bg-slate-700 rounded" />
                <div className="border-t border-slate-100 dark:border-slate-700 my-4" />
                <div className="h-2.5 w-20 bg-slate-400 dark:bg-slate-600 rounded" />
                <div className="h-2 w-full bg-slate-150 dark:bg-slate-700 rounded" />
                <div className="h-2 w-11/12 bg-slate-150 dark:bg-slate-700 rounded" />
                <div className="h-2 w-2/3 bg-slate-150 dark:bg-slate-700 rounded" />
              </div>
              
              <div className="absolute top-4 right-4 bg-indigo-600 text-white font-bold text-[10px] tracking-wider uppercase px-2 py-1 rounded bg-clip-border shadow flex items-center justify-center">
                ✨ PREMIUM DESIGN
              </div>
              
              <img
                src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400"
                alt="Resume Mockup"
                className="absolute inset-x-4 bottom-4 h-32 w-[90%] mx-auto object-cover rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 opacity-90 transition-opacity"
              />
            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="py-20 bg-[#F8F9FF]/40 dark:bg-slate-950/40 backdrop-blur-3xl border-y border-slate-100 dark:border-slate-900/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
              Create Your Resume in 4 Simple Steps
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              No complex layout configurations or design degrees needed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS_STEPS.map((step) => {
              const IconComp = step.icon;
              return (
                <div key={step.id} className="p-6 rounded-2xl glass-card text-center flex flex-col items-center gap-3 relative group hover:scale-[1.02] hover:border-indigo-300 dark:hover:border-indigo-505 transition-all">
                  <div className="absolute -top-4 bg-indigo-600 text-white font-bold h-8 w-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                    {step.id}
                  </div>
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1 group-hover:scale-110 transition-transform">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">{step.label}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. TEMPLATE SHOWCASE SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              Approved Recruitment Templates
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg">
              Optimized for optimal spacing ratios, designed to align cleanly.
            </p>
          </div>
          <Link
            to="/templates"
            className="inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors"
          >
            Explore all 12 templates
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 4 Resume Showcase grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LANDING_TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              className="relative glass-card rounded-xl overflow-hidden shadow-md group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="aspect-[3/4] bg-slate-100 overflow-hidden relative">
                <img
                  src={tmpl.url}
                  alt={tmpl.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Hover overlay button */}
                <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                  <button
                    onClick={handleCreateResume}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/20 active:scale-95 transition-transform hover:bg-indigo-500 cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    Use Template
                  </button>
                </div>
              </div>
              
              <div className="p-4 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-slate-100 text-sm">{tmpl.name}</span>
                <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">
                  ATS Ready
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURE CARDS SECTION */}
      <section id="features" className="py-20 bg-[#F8F9FF]/45 dark:bg-slate-950/45 backdrop-blur-3xl border-t border-slate-100/60 dark:border-slate-900/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
              The Premium Features You Need to Land Jobs
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Your resume represents your professional worth. We provide everything to make it shine.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_CARDS.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-6 rounded-xl glass-card flex gap-4 hover:-translate-y-1 hover:shadow-md hover:border-indigo-300/50 dark:hover:border-indigo-500/30 transition-all duration-200"
                >
                  <div className="h-10 w-10 shrink-0 rounded-lg bg-indigo-150 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-base">{feat.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. TESTIMONIAL CARDS SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-950 dark:text-white sm:text-4xl">
            Success Stories From Professional Job Seekers
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Find out why developers, consultants, and directors switch to CraftCV.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIAL_CARDS.map((testi) => (
            <div
              key={testi.name}
              className="glass-card p-6 rounded-xl shadow-sm hover:scale-[1.01] transition-transform flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex text-amber-500 gap-0.5">
                  {[...Array(testi.stars)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                  ))}
                </div>
                <p className="text-xs italic text-slate-600 dark:text-slate-300 leading-relaxed">
                  "{testi.quote}"
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 dark:border-slate-700 mt-4 flex items-center justify-between">
                <span className="font-semibold text-slate-800 dark:text-white text-sm">{testi.name}</span>
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded">
                  {testi.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section className="py-20 bg-[#F8F9FF]/40 dark:bg-slate-950/40 backdrop-blur-3xl border-t border-slate-100/60 dark:border-slate-900/80 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-slate-950 dark:text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Answers to technical setups, exports, and design details.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl overflow-hidden transition-all glass-card hover:border-indigo-300/40 dark:hover:border-indigo-500/20"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-5 py-4 font-semibold text-slate-900 dark:text-white flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                  >
                    <span className="text-sm sm:text-base">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800/40 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA BANNER */}
      <section className="bg-indigo-950 text-white relative py-20 overflow-hidden text-center flex flex-col items-center justify-center">
        {/* Decorative background vectors */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-indigo-900 to-indigo-950 opacity-95" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-sm sm:text-base text-indigo-200 text-center max-w-lg mx-auto leading-relaxed">
            Construct, refine, and download your resumes, cover letters, and track applications completely for free. Over 2M+ candidates have successfully signed up.
          </p>
          <div className="pt-2">
            <button
              onClick={handleCreateResume}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-550 dark:bg-indigo-600 dark:hover:bg-indigo-550 text-white rounded-xl font-bold text-base shadow-xl shadow-indigo-900 hover:scale-[1.03] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              Create Your Free Resume
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
