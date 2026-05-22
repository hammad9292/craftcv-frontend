import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { CoverLetter as CoverLetterType } from '../types/resume';
import { 
  ArrowLeft, Download, Sparkles, RefreshCw, Check, 
  ChevronRight, AlignLeft, Info, FileText, Compass, MessageSquare 
} from 'lucide-react';

const TONES = ['Professional', 'Friendly', 'Confident'] as const;

// Comprehensive dictionary for local custom generation suggestions matching section content by tone choice
const AI_SUGGESTIONS: Record<string, Record<typeof TONES[number], string>> = {
  opening: {
    Professional: "Dear Hiring Team,\n\nI am writing to express my strong candidacy for the Senior Frontend Architect position currently open. With five years of experience constructing scalable React systems in close-knit agile groups, I feel confident mapping my experience to your milestones...",
    Friendly: "Hi there!\n\nI was absolutely thrilled to see the Web Specialist opening at your company. I've been following your product updates for a long time and would love to bring my energy and coding expertise to your frontlines...",
    Confident: "Dear Operations Director,\n\nIf you are searching for a high-performing developer who can raise page speed by 40% and immediately drive design layout uniformity, I am your ideal hire. Here is how my background maps directly to your goals..."
  },
  body: {
    Professional: "Throughout my career, I have prioritized structural readability and clean state architectures. In my previous role at Startup XYZ, I succeeded in transforming our client layouts, raising user session length by 22% while supporting 100% test coverage...",
    Friendly: "I really love coding in TypeScript and building components that are easy for both users and secondary developers to play with. I enjoy mentoring juniors and believe software should be as delightful to build as it is to navigate...",
    Confident: "I do not just write code; I design systems that multiply business capability. I spearheaded cloud layouts processing 15M weekly customer checkouts safely, reducing bundle overhead by 30% without sacrificing high-spec accessibility standards..."
  },
  closing: {
    Professional: "Thank you for looking after my portfolio. I look forward to learning how our operational values align in an upcoming interview.",
    Friendly: "Thanks so much for reading! I'd love to jump on a quick call and chat about how we of the tech squad can craft beautiful things together soon.",
    Confident: "Let's schedule a brief conversation next week to explore how I can immediately scale your application reliability and save engineering sprint hours."
  }
};

export const CoverLetter: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { coverLetters, updateCoverLetter, addToast } = useResume();

  const letter = coverLetters.find((c) => c.id === id);

  const [activeSegment, setActiveSegment] = useState<'header' | 'body' | 'sign'>('body');
  
  // State for AI suggestion overlay popup
  const [aiPopup, setAiPopup] = useState<{ section: 'opening' | 'body' | 'closing'; suggestion: string } | null>(null);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  useEffect(() => {
    if (!letter) {
      addToast('Cover Letter not found', 'error');
      navigate('/dashboard');
    }
  }, [letter, id]);

  if (!letter) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-2">
          <div className="h-4 w-4 border-2 border-indigo-600 border-t-transparent animate-spin rounded-full" />
          <p className="text-xs text-slate-400">Loading editor...</p>
        </div>
      </div>
    );
  }

  const { personalInfo, recipientName, recipientTitle, companyName, recipientAddress, date, subject, opening, body, closing, signature, tone, design } = letter;

  const handleUpdate = (fields: Partial<CoverLetterType>) => {
    updateCoverLetter(letter.id, fields);
  };

  const handleUpdatePersonalInfo = (fields: Partial<typeof personalInfo>) => {
    handleUpdate({ personalInfo: { ...personalInfo, ...fields } });
  };

  const triggerDownload = () => {
    addToast('Assembling typography styles and formatting PDFs...', 'info');
    setTimeout(() => {
      addToast(`"${letter.name}" downloaded successfully!`, 'success');
    }, 1200);
  };

  // AI suggestion trigger for a given section
  const handleAiAssist = (sec: 'opening' | 'body' | 'closing') => {
    setIsAiGenerating(true);
    addToast('✨ AI Assist is writing customized pitch variants...', 'info');
    
    setTimeout(() => {
      const option = AI_SUGGESTIONS[sec]?.[tone] || "Ahmad Khan is a highly qualified developer...";
      setAiPopup({ section: sec, suggestion: option });
      setIsAiGenerating(false);
      addToast('Draft suggestion prepared!', 'success');
    }, 850);
  };

  const applyAiSuggestion = () => {
    if (!aiPopup) return;
    handleUpdate({ [aiPopup.section]: aiPopup.suggestion });
    setAiPopup(null);
    addToast('AI suggestion applied to form!', 'success');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 flex flex-col transition-colors relative overflow-hidden">
      
      {/* Absolute decorative blurred shapes for premium Frosted Glass theme */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-indigo-200/20 dark:bg-indigo-950/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-purple-200/20 dark:bg-purple-950/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      {/* Top action toolbar header */}
      <div className="h-14 border-b border-slate-200/60 dark:border-slate-850/60 glass-nav px-4 flex items-center justify-between sticky top-0 z-10 transition-colors">
        <div className="flex items-center gap-3">
          <Link 
            to="/dashboard?tab=cover-letters" 
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/85 rounded-lg text-slate-500 dark:text-slate-400 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="border-r h-4 border-slate-200 dark:border-slate-850 hidden sm:block" />
          
          <input
            type="text"
            value={letter.name}
            onChange={(e) => handleUpdate({ name: e.target.value })}
            className="bg-transparent border-b border-transparent hover:border-slate-200 focus:border-indigo-505 dark:focus:border-indigo-400 py-0.5 px-1.5 focus:outline-none text-xs sm:text-sm font-bold text-slate-900 dark:text-white max-w-[150px] sm:max-w-xs"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/40 px-2.5 py-1 rounded inline-flex items-center gap-1">
            <Sparkles className="h-3 w-3 animate-pulse" />
            AI Assist Enabled
          </span>
          <button
            onClick={triggerDownload}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
        </div>
      </div>

      {/* THREE PANEL GRID */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-56px)] overflow-hidden">
        
        {/* PANEL 1: SECTIONS SELECTOR RAIL (280px) */}
        <div className="w-full lg:w-72 shrink-0 border-r border-slate-200/60 dark:border-slate-850/60 bg-white/70 dark:bg-slate-955/65 backdrop-blur-md p-4 space-y-4 flex flex-col h-auto lg:h-full transition-colors z-[8]">
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Tone & Structures</span>
          
          {/* Tone Selector Pills */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400">Assigned Tone</label>
            <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-center">
              {TONES.map((t) => (
                <button
                  key={t}
                  onClick={() => { handleUpdate({ tone: t }); addToast(`Set tone to "${t}"`, 'info'); }}
                  className={`flex-1 py-1 text-[10px] font-bold rounded-md cursor-pointer capitalize ${
                    tone === t ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow' : 'text-slate-400'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-800 my-2" />

          {/* Section buttons */}
          <div className="space-y-2 flex-1">
            {[
              { id: 'header', label: 'Sender & Recipient Details' },
              { id: 'body', label: 'Subject & Opening Bullet' },
              { id: 'sign', label: 'Closing & Sign-off' }
            ].map((seg) => (
              <button
                key={seg.id}
                onClick={() => setActiveSegment(seg.id as any)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeSegment === seg.id
                    ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-150'
                    : 'border border-transparent text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-805'
                }`}
              >
                <span>{seg.label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </button>
            ))}
          </div>
        </div>

        {/* PANEL 2: CENTER WORKSPACE FORM PANEL */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 overflow-y-auto border-r border-slate-205 dark:border-slate-850">
          <div className="max-w-xl mx-auto space-y-6">

            {/* SEGMENT 1: HEADER & RECIPIENT */}
            {activeSegment === 'header' && (
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white select-none">Sender & Recipient Metadata</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Sender Full Name</label>
                    <input
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(e) => handleUpdatePersonalInfo({ fullName: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Recipient Name / Contact</label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => handleUpdate({ recipientName: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Recipient Title</label>
                    <input
                      type="text"
                      value={recipientTitle}
                      onChange={(e) => handleUpdate({ recipientTitle: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Target Company Name</label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => handleUpdate({ companyName: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Date of Application</label>
                    <input
                      type="text"
                      value={date}
                      onChange={(e) => handleUpdate({ date: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Recipient Address</label>
                    <input
                      type="text"
                      value={recipientAddress}
                      onChange={(e) => handleUpdate({ recipientAddress: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* SEGMENT 2: CONTENT & SUGGESTIONS ACCORDION */}
            {activeSegment === 'body' && (
              <div className="space-y-6">
                
                {/* Subject and Opening Form */}
                <div className="glass-card p-6 rounded-2xl shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white select-none">Subject & Introductory Paragraph</h3>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400">Letter Subject Line</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => handleUpdate({ subject: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 font-semibold text-slate-850"
                    />
                  </div>

                  {/* Opening Clause with AI trigger */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-400">Salutation Greetings</label>
                      <button
                        type="button"
                        onClick={() => handleAiAssist('opening')}
                        disabled={isAiGenerating}
                        className="px-2.5 py-1 border border-indigo-250 text-indigo-600 dark:text-indigo-400 font-bold text-[9px] rounded-lg hover:bg-indigo-50 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="h-3 w-3" />
                        ✨ AI Assist
                      </button>
                    </div>
                    <input
                      type="text"
                      value={opening}
                      onChange={(e) => handleUpdate({ opening: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                    />
                  </div>

                  {/* Body clauses with AI trigger */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-bold text-slate-400">Core pitch Body Letter</label>
                      <button
                        type="button"
                        onClick={() => handleAiAssist('body')}
                        disabled={isAiGenerating}
                        className="px-2.5 py-1 border border-indigo-250 text-indigo-600 dark:text-indigo-400 font-bold text-[9px] rounded-lg hover:bg-indigo-50 flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      >
                        <Sparkles className="h-3 w-3" />
                        ✨ AI Assist
                      </button>
                    </div>
                    <textarea
                      rows={6}
                      value={body}
                      onChange={(e) => handleUpdate({ body: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 leading-relaxed font-mono"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* SEGMENT 3: CLOSING & SIGNATURE */}
            {activeSegment === 'sign' && (
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white select-none">Closing & Signature</h3>

                {/* Closing with AI support */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-bold text-slate-400">Closing Remark</label>
                    <button
                      type="button"
                      onClick={() => handleAiAssist('closing')}
                      disabled={isAiGenerating}
                      className="px-2.5 py-1 border border-indigo-250 text-indigo-600 dark:text-indigo-400 font-bold text-[9px] rounded-lg hover:bg-indigo-50 flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="h-3 w-3" />
                      ✨ AI Assist
                    </button>
                  </div>
                  <input
                    type="text"
                    value={closing}
                    onChange={(e) => handleUpdate({ closing: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                  />
                </div>

                <div className="space-y-1 pt-1">
                  <label className="text-[10px] font-bold text-slate-400">Signature stamp Block</label>
                  <textarea
                    rows={3}
                    value={signature}
                    onChange={(e) => handleUpdate({ signature: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50"
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* PANEL 3: RIGHT PREVIEW PAGE */}
        <div className="hidden lg:flex flex-1 lg:w-[460px] shrink-0 bg-slate-100 dark:bg-slate-950 p-6 overflow-y-auto flex-col h-full justify-start items-center transition-all border-l border-slate-205 dark:border-slate-850 select-none">
          
          <div 
            className="w-[660px] bg-white text-slate-800 shadow-2xl rounded-xl border border-slate-200 p-8 flex flex-col justify-start origin-top scale-75 mt-2 gap-4"
            style={{ fontFamily: '"Inter", sans-serif' }}
          >
            {/* Sender block top left */}
            <div className="text-[10px] text-slate-400 space-y-0.5">
              <p className="font-bold text-slate-700">{personalInfo.fullName}</p>
              <p>{personalInfo.email} · {personalInfo.phone}</p>
              <p>{personalInfo.city}, {personalInfo.country}</p>
            </div>

            <div className="border-t border-slate-100 my-2" />

            {/* Recipient block */}
            <div className="text-[10.5px] text-slate-600 space-y-0.5">
              <p className="font-semibold text-slate-400 font-mono">{date}</p>
              <p className="font-bold text-slate-900 mt-2">{recipientName}</p>
              <p className="font-semibold">{recipientTitle}</p>
              <p className="font-bold text-indigo-600">{companyName}</p>
              <p>{recipientAddress}</p>
            </div>

            {/* Subject */}
            {subject && (
              <p className="text-[11px] font-extrabold text-slate-850 pt-3 border-b pb-1 select-text">
                Subject: {subject}
              </p>
            )}

            {/* Body contents */}
            <div className="text-[11px] text-slate-600 space-y-4 pt-2 select-text font-serif leading-relaxed h-[200px] overflow-y-auto">
              <p className="font-bold font-sans">{opening}</p>
              <p className="whitespace-pre-line leading-relaxed">{body}</p>
              <p className="font-semibold">{closing}</p>
              <p className="whitespace-pre-line pt-2 font-handwritten">{signature}</p>
            </div>
          </div>

        </div>

      </div>

      {/* Backdrop-blurred INTERACTIVE AI ASSIST POPUP MODAL SCREEN */}
      {aiPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div className="glass-card rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-5 w-5 text-indigo-600 animate-pulse" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">AI Assist Draft Suggestion ({letter.tone} Tone)</h4>
              </div>
              <button 
                onClick={() => setAiPopup(null)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-700 dark:text-slate-300 rounded-xl leading-relaxed max-h-[250px] overflow-y-auto border">
              {aiPopup.suggestion}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-850/55 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
              <button
                onClick={() => handleAiAssist(aiPopup.section)}
                className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 cursor-pointer dark:text-slate-300 flex items-center gap-1.5"
              >
                <RefreshCw className="h-3 w-3" />
                Regenerate
              </button>
              <button
                onClick={applyAiSuggestion}
                className="px-5 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs cursor-pointer flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" />
                Use This Draft
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

// Quick mock close-X button to resolve compile import definitions inside AI assist dialog
const X: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};
