import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Resume, WorkExperience, Education, Skill, Project } from '../types/resume';
import { RESUME_TEMPLATES } from '../data/templates';
import { 
  ArrowLeft, Download, Eye, EyeOff, Layout, Type, Palette, 
  Settings, Save, Plus, Trash2, GripVertical, ChevronDown, ChevronUp, ZoomIn, ZoomOut, RotateCcw, Sparkles 
} from 'lucide-react';

const FONTS = ['Inter', 'Space Grotesk', 'Outfit', 'Playfair Display', 'Fira Code', 'Helvetica'];
const COLORS = ['#6C63FF', '#4F46E5', '#00D2FF', '#EC4899', '#10B981', '#F59E0B'];

export const Editor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { resumes, updateResume, addToast } = useResume();

  const resume = resumes.find((r) => r.id === id);

  // Active workspace left-tab: 'content' | 'design'
  const [leftTab, setLeftTab] = useState<'content' | 'design'>('content');
  
  // Active editing section in center panel (defaults to Personal Info)
  const [activeFormSection, setActiveFormSection] = useState<string>('personal');

  // Zoom scale for paper preview
  const [zoomScale, setZoomScale] = useState<number>(0.9);

  useEffect(() => {
    if (!resume) {
      addToast('Resume document not found', 'error');
      navigate('/dashboard');
    }
  }, [resume, id]);

  if (!resume) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 border-4 border-indigo-600 border-t-transparent animate-spin rounded-full" />
          <p className="text-xs text-slate-400">Loading CV engine...</p>
        </div>
      </div>
    );
  }

  const { personalInfo, workExperience, education, skills, projects, design } = resume;

  // Real-time fields updating handlers
  const updatePersonalInfo = (fields: Partial<typeof personalInfo>) => {
    updateResume(resume.id, {
      personalInfo: { ...personalInfo, ...fields }
    });
  };

  const updateDesign = (fields: Partial<typeof design>) => {
    updateResume(resume.id, {
      design: { ...design, ...fields }
    });
  };

  const handleDownload = () => {
    addToast('Assembling vector components and sizing schemas...', 'info');
    setTimeout(() => {
      addToast('PDF downloaded successfully without watermarks!', 'success');
    }, 1200);
  };

  // Work experience CRUD
  const handleAddWork = () => {
    const nextWork: WorkExperience = {
      id: 'work_' + Date.now(),
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateResume(resume.id, {
      workExperience: [...workExperience, nextWork]
    });
    addToast('Added a new work experiences node', 'success');
  };

  const handleUpdateWork = (workId: string, fields: Partial<WorkExperience>) => {
    const updated = workExperience.map((w) => (w.id === workId ? { ...w, ...fields } : w));
    updateResume(resume.id, { workExperience: updated });
  };

  const handleDeleteWork = (workId: string) => {
    updateResume(resume.id, {
      workExperience: workExperience.filter((w) => w.id !== workId)
    });
    addToast('Removed work node', 'info');
  };

  // Education CRUD
  const handleAddEducation = () => {
    const nextEdu: Education = {
      id: 'edu_' + Date.now(),
      degree: '',
      school: '',
      startDate: '',
      endDate: '',
      details: ''
    };
    updateResume(resume.id, {
      education: [...education, nextEdu]
    });
    addToast('Added schooling block', 'success');
  };

  const handleUpdateEducation = (eduId: string, fields: Partial<Education>) => {
    const updated = education.map((e) => (e.id === eduId ? { ...e, ...fields } : e));
    updateResume(resume.id, { education: updated });
  };

  const handleDeleteEducation = (eduId: string) => {
    updateResume(resume.id, {
      education: education.filter((e) => e.id !== eduId)
    });
    addToast('Purged schooling record', 'info');
  };

  // Skills CRUD
  const [skillInput, setSkillInput] = useState('');
  const [skillLevel, setSkillLevel] = useState(5);

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!skillInput.trim()) return;

    const nextSkill: Skill = {
      id: 'sk_' + Date.now(),
      name: skillInput.trim(),
      level: skillLevel
    };

    updateResume(resume.id, {
      skills: [...skills, nextSkill]
    });
    setSkillInput('');
    setSkillLevel(5);
    addToast(`Added skill: ${nextSkill.name}`, 'success');
  };

  const handleDeleteSkill = (skillId: string) => {
    updateResume(resume.id, {
      skills: skills.filter((s) => s.id !== skillId)
    });
  };

  // Projects CRUD
  const handleAddProject = () => {
    const nextProj: Project = {
      id: 'proj_' + Date.now(),
      title: '',
      role: '',
      link: '',
      description: ''
    };
    updateResume(resume.id, {
      projects: [...projects, nextProj]
    });
    addToast('Added portfolio projects', 'success');
  };

  const handleUpdateProject = (projId: string, fields: Partial<Project>) => {
    const updated = projects.map((p) => (p.id === projId ? { ...p, ...fields } : p));
    updateResume(resume.id, { projects: updated });
  };

  const handleDeleteProject = (projId: string) => {
    updateResume(resume.id, {
      projects: projects.filter((p) => p.id !== projId)
    });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 flex flex-col transition-colors relative overflow-hidden">
      
      {/* Absolute decorative blurred shapes for premium Frosted Glass theme */}
      <div className="absolute top-[10%] left-[5%] w-[350px] h-[350px] bg-indigo-200/20 dark:bg-indigo-950/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-purple-200/20 dark:bg-purple-950/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      {/* TOP TOOLBAR HEADER */}
      <div className="h-14 border-b border-slate-200/60 dark:border-slate-850/60 glass-nav px-4 flex items-center justify-between sticky top-0 z-10 transition-colors">
        <div className="flex items-center gap-3">
          <Link 
            to="/dashboard" 
            className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800/80 rounded-lg text-slate-500 dark:text-slate-400 cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="border-r h-4 border-slate-200 dark:border-slate-800 hidden sm:block" />
          
          {/* Editable resume title */}
          <input
            type="text"
            value={resume.name}
            onChange={(e) => updateResume(resume.id, { name: e.target.value })}
            className="bg-transparent border-b border-transparent hover:border-slate-250 focus:border-indigo-505 dark:focus:border-indigo-400 py-0.5 px-1.5 focus:outline-none text-xs sm:text-sm font-bold text-slate-800 dark:text-white max-w-[150px] sm:max-w-xs"
          />
        </div>

        {/* Action controllers */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded inline-flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Cloud Synced
          </span>
          <button
            onClick={handleDownload}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5 cursor-pointer max-w-[130px]"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
        </div>
      </div>

      {/* CORE WORKSPACE: THREE PANEL GRID */}
      <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-56px)] overflow-hidden">
        
        {/* PANEL 1: LEFT CONTROLLERS RAIL (280px) */}
        <div className="w-full lg:w-72 shrink-0 border-r border-slate-200/60 dark:border-slate-850/60 bg-white/70 dark:bg-slate-955/65 backdrop-blur-md flex flex-col h-auto lg:h-full transition-colors z-[8]">
          {/* Switch Tab headers */}
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setLeftTab('content')}
              className={`flex-1 py-3 text-center text-xs font-bold leading-none border-b-2 cursor-pointer ${
                leftTab === 'content'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-400'
              }`}
            >
              Content Elements
            </button>
            <button
              onClick={() => setLeftTab('design')}
              className={`flex-1 py-3 text-center text-xs font-bold leading-none border-b-2 cursor-pointer relative ${
                leftTab === 'design'
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-400'
              }`}
            >
              Design Styling
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {leftTab === 'content' ? (
              // Tab Content blocks
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Navigate CV Structures</span>
                
                {/* Content forms buttons */}
                {[
                  { id: 'personal', label: 'Personal Information' },
                  { id: 'work', label: 'Work Experience' },
                  { id: 'edu', label: 'Schooling & Education' },
                  { id: 'skills', label: 'Professional Skills' },
                  { id: 'projects', label: 'Portfolio Projects' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveFormSection(item.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      activeFormSection === item.id
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900'
                        : 'border border-transparent text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{item.label}</span>
                    <GripVertical className="h-3.5 w-3.5 text-slate-350" />
                  </button>
                ))}
              </div>
            ) : (
              // Tab Design Styling (colors, fonts, layout sizes)
              <div className="space-y-5">
                {/* Swatch templateId picker */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Template Layout</label>
                  <div className="grid grid-cols-2 gap-2">
                    {RESUME_TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.id}
                        onClick={() => updateDesign({ templateId: tmpl.id })}
                        className={`p-2 rounded-xl text-left text-[10px] font-bold border transition-all truncate text-ellipsis cursor-pointer ${
                          design.templateId === tmpl.id
                            ? 'border-indigo-600 text-indigo-600 bg-indigo-50/50 dark:border-indigo-400 dark:text-indigo-400 dark:bg-indigo-950/20'
                            : 'border-slate-150 text-slate-600 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-850'
                        }`}
                      >
                        {tmpl.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accent Swatch Pickers */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Primary color Accent</label>
                  <div className="flex gap-2">
                    {COLORS.map((col) => (
                      <button
                        key={col}
                        onClick={() => updateDesign({ primaryColor: col })}
                        className={`h-7 w-7 rounded-full relative cursor-pointer hover:scale-105 transition-all flex items-center justify-center`}
                        style={{ backgroundColor: col }}
                      >
                        {design.primaryColor === col && <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font typography selectors */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Font Typography</label>
                  <select
                    value={design.fontFamily}
                    onChange={(e) => updateDesign({ fontFamily: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-850"
                  >
                    {FONTS.map((font) => (
                      <option key={font} value={font}>{font}</option>
                    ))}
                  </select>
                </div>

                {/* Font Scaling Sizes */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Font Scaling size</label>
                  <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-center">
                    {(['small', 'medium', 'large'] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => updateDesign({ fontSize: sz })}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md capitalize cursor-pointer ${
                          design.fontSize === sz ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow' : 'text-slate-400'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Density Margin Spacing */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Density Spacing</label>
                  <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-center">
                    {(['compact', 'normal', 'spacious'] as const).map((sp) => (
                      <button
                        key={sp}
                        onClick={() => updateDesign({ spacing: sp })}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md capitalize cursor-pointer ${
                          design.spacing === sp ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow' : 'text-slate-400'
                        }`}
                      >
                        {sp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Page Standard size */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Page Format size</label>
                  <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5 text-center">
                    {(['A4', 'Letter'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => updateDesign({ pageSize: f })}
                        className={`flex-1 py-1 text-[10px] font-bold rounded-md cursor-pointer ${
                          design.pageSize === f ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow' : 'text-slate-400'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>

        {/* PANEL 2: CENTER WORKSPACE FORM AREA (flexible) */}
        <div className="flex-1 bg-slate-50 dark:bg-slate-950 p-6 overflow-y-auto border-r border-slate-205 dark:border-slate-850">
          <div className="max-w-xl mx-auto space-y-6">

            {/* A. PERSONAL INFO FORM */}
            {activeFormSection === 'personal' && (
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white select-none">Personal Info</h3>
                
                {/* Image loader pre-filled mock layout */}
                <div className="flex items-center gap-4 border-b pb-4">
                  <img
                    src={personalInfo.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                    alt="Avatar Upload"
                    className="h-14 w-14 rounded-full border shadow-sm object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase">Candidacy Placement Photo</label>
                    <button 
                      onClick={() => addToast('Simulating secure dynamic photo loading...', 'info')}
                      className="mt-1 text-xs font-bold text-indigo-650 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      Change Photo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                    <input
                      type="text"
                      value={personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Target Role Title</label>
                    <input
                      type="text"
                      value={personalInfo.jobTitle}
                      onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">E-mail Address</label>
                    <input
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Phone contact</label>
                    <input
                      type="text"
                      value={personalInfo.phone}
                      onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Target City</label>
                    <input
                      type="text"
                      value={personalInfo.city}
                      onChange={(e) => updatePersonalInfo({ city: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Target Country</label>
                    <input
                      type="text"
                      value={personalInfo.country}
                      onChange={(e) => updatePersonalInfo({ country: e.target.value })}
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900"
                    />
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Professional Summary</label>
                  <textarea
                    rows={4}
                    value={personalInfo.summary}
                    onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-900 leading-relaxed"
                  />
                </div>
              </div>
            )}

            {/* B. WORK EXPERIENCES FORM */}
            {activeFormSection === 'work' && (
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white select-none">Work History</h3>
                  <button
                    onClick={handleAddWork}
                    className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 font-bold text-[10px] text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="h-3 w-3" /> Add experience
                  </button>
                </div>

                {workExperience.map((work) => (
                  <div key={work.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3 relative">
                    <button
                      onClick={() => handleDeleteWork(work.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-3 pr-6">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">Job Title</label>
                        <input
                          type="text"
                          value={work.jobTitle}
                          onChange={(e) => handleUpdateWork(work.id, { jobTitle: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">Company</label>
                        <input
                          type="text"
                          value={work.company}
                          onChange={(e) => handleUpdateWork(work.id, { company: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">Start Date</label>
                        <input
                          type="text"
                          value={work.startDate}
                          onChange={(e) => handleUpdateWork(work.id, { startDate: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">End Date</label>
                        <input
                          type="text"
                          value={work.endDate}
                          onChange={(e) => handleUpdateWork(work.id, { endDate: e.target.value })}
                          disabled={work.current}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50 disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <label className="flex items-center gap-2 pt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={work.current}
                        onChange={(e) => handleUpdateWork(work.id, { current: e.target.checked })}
                        className="rounded border-slate-300"
                      />
                      <span className="text-[10px] font-semibold text-slate-550 select-none">I currently earn/operate in this role</span>
                    </label>

                    <div className="space-y-1 pt-1">
                      <label className="text-[9px] font-bold text-slate-405 uppercase">Operational Roles summary (bulleted)</label>
                      <textarea
                        rows={4}
                        value={work.description}
                        onChange={(e) => handleUpdateWork(work.id, { description: e.target.value })}
                        className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50 font-mono leading-relaxed"
                        placeholder="• Highlight your core deliverables and technology matrices"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* C. EDUCATION FORM */}
            {activeFormSection === 'edu' && (
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white select-none">Education Records</h3>
                  <button
                    onClick={handleAddEducation}
                    className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 font-bold text-[10px] text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="h-3 w-3" /> Add school record
                  </button>
                </div>

                {education.map((edu) => (
                  <div key={edu.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3 relative">
                    <button
                      onClick={() => handleDeleteEducation(edu.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-3 pr-6">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">Degree / Major</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => handleUpdateEducation(edu.id, { degree: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">School / Board</label>
                        <input
                          type="text"
                          value={edu.school}
                          onChange={(e) => handleUpdateEducation(edu.id, { school: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">Start Year</label>
                        <input
                          type="text"
                          value={edu.startDate}
                          onChange={(e) => handleUpdateEducation(edu.id, { startDate: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">Graduation Year</label>
                        <input
                          type="text"
                          value={edu.endDate}
                          onChange={(e) => handleUpdateEducation(edu.id, { endDate: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="text-[9px] font-bold text-slate-405 uppercase">Academic descriptions</label>
                      <textarea
                        rows={3}
                        value={edu.details}
                        onChange={(e) => handleUpdateEducation(edu.id, { details: e.target.value })}
                        className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        placeholder="Notable achievements, grade metrics, CGPA..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* D. SKILLS FORM */}
            {activeFormSection === 'skills' && (
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-4">
                <h3 className="text-base font-bold text-slate-900 dark:text-white select-none">Professional Skills</h3>

                <form onSubmit={handleAddSkill} className="flex gap-2 items-end border-b pb-4">
                  <div className="flex-1 space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Skill Label</label>
                    <input
                      type="text"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      placeholder="e.g. React Native"
                      className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 text-slate-900 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Proficiency (1-5)</label>
                    <select
                      value={skillLevel}
                      onChange={(e) => setSkillLevel(Number(e.target.value))}
                      className="text-xs px-3 py-2 border rounded-xl bg-slate-50 text-slate-900 focus:outline-none"
                    >
                      <option value="5">5/5 Expert</option>
                      <option value="4">4/5 Proficient</option>
                      <option value="3">3/5 Intermediate</option>
                      <option value="2">2/5 Beginner</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs shadow cursor-pointer"
                  >
                    Add tag
                  </button>
                </form>

                {/* Display active skill chips */}
                <div className="flex flex-wrap gap-2.5">
                  {skills.length > 0 ? (
                    skills.map((sk) => (
                      <div
                        key={sk.id}
                        className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 dark:bg-slate-905 rounded-xl text-xs hover:border-indigo-200"
                      >
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{sk.name}</span>
                        <span className="text-[9px] text-indigo-505 dark:text-indigo-400 font-bold font-mono">({sk.level}/5)</span>
                        <button
                          onClick={() => handleDeleteSkill(sk.id)}
                          className="p-0.5 rounded text-slate-400 hover:text-rose-500"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <span className="text-xs text-slate-400 italic">No skills added. Complete bullet form above.</span>
                  )}
                </div>
              </div>
            )}

            {/* E. PORTFOLIO & PROJECTS */}
            {activeFormSection === 'projects' && (
              <div className="glass-card p-6 rounded-2xl shadow-sm space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white select-none">Portfolio Projects</h3>
                  <button
                    onClick={handleAddProject}
                    className="px-3 py-1 bg-indigo-50 dark:bg-indigo-950 font-bold text-[10px] text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center gap-1.5"
                  >
                    <Plus className="h-3 w-3" /> Add Projects
                  </button>
                </div>

                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 space-y-3 relative">
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                    <div className="grid grid-cols-2 gap-3 pr-6">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => handleUpdateProject(proj.id, { title: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-405 uppercase">Core Role</label>
                        <input
                          type="text"
                          value={proj.role}
                          onChange={(e) => handleUpdateProject(proj.id, { role: e.target.value })}
                          className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="text-[9px] font-bold text-slate-405 uppercase">Project Link URL</label>
                      <input
                        type="url"
                        value={proj.link}
                        onChange={(e) => handleUpdateProject(proj.id, { link: e.target.value })}
                        className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        placeholder="https://github.com/..."
                      />
                    </div>

                    <div className="space-y-1 pt-1">
                      <label className="text-[9px] font-bold text-slate-405 uppercase">Project Descriptions</label>
                      <textarea
                        rows={3}
                        value={proj.description}
                        onChange={(e) => handleUpdateProject(proj.id, { description: e.target.value })}
                        className="w-full text-xs px-3 py-1.5 border rounded-xl bg-slate-50"
                        placeholder="Describe technical stack, operational milestones, or deployment sizes..."
                      />
                    </div>

                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

        {/* PANEL 3: RIGHT PANEL LIVE PAPER PREVIEW (380px or custom scale) */}
        <div className="hidden md:flex flex-1 lg:w-[480px] shrink-0 bg-slate-100 dark:bg-slate-950 p-6 overflow-y-auto flex-col h-full select-none justify-start items-center relative transition-all border-l border-slate-205 dark:border-slate-850">
          
          {/* Zoom controls float */}
          <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 z-10 p-1.5 rounded-lg border flex items-center gap-1.5 shadow-sm">
            <button
              onClick={() => setZoomScale(Math.max(zoomScale - 0.1, 0.6))}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="text-[10px] font-bold font-mono text-slate-500 w-8 text-center bg-transparent">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale(Math.min(zoomScale + 0.1, 1.2))}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 rounded"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <div 
            className="w-[800px] bg-white text-slate-800 shadow-2xl rounded-xl border border-slate-200 p-8 flex flex-col justify-start origin-top scale-50 transition-transform relative gap-6 mt-1"
            style={{ 
              transform: `scale(${zoomScale})`, 
              fontFamily: design.fontFamily === 'Inter' ? '"Inter", sans-serif' : design.fontFamily,
              padding: design.spacing === 'compact' ? '1.5rem' : design.spacing === 'spacious' ? '3rem' : '2.25rem',
            }}
          >
            {/* Realtime formatted resume component layout rendering values */}
            
            {/* Section A Header */}
            <div className="flex justify-between items-start border-b pb-4 gap-4" style={{ borderColor: `${design.primaryColor}20` }}>
              <div className="space-y-1">
                <h1 className="text-2xl font-black tracking-tight" style={{ color: design.primaryColor }}>{personalInfo.fullName || 'Ahmad Khan'}</h1>
                <p className="text-sm font-bold text-slate-500">{personalInfo.jobTitle || 'Senior Frontend Specialist'}</p>
                
                {/* Contact markers */}
                <div className="flex flex-wrap text-[10px] text-slate-400 gap-x-3 gap-y-1 pt-1.5">
                  <span>{personalInfo.email}</span>
                  <span>{personalInfo.phone}</span>
                  <span>{personalInfo.city}, {personalInfo.country}</span>
                  {personalInfo.website && <span>{personalInfo.website}</span>}
                </div>
              </div>

              {personalInfo.avatarUrl && (
                <img
                  src={personalInfo.avatarUrl}
                  alt="Avatar mockup"
                  className="h-16 w-16 rounded-full object-cover border-2 shadow-sm"
                  style={{ borderColor: design.primaryColor }}
                  referrerPolicy="no-referrer"
                />
              )}
            </div>

            {/* B Summary statement */}
            {personalInfo.summary && (
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: design.primaryColor }}>Professional Profile</h3>
                <p className="text-[10px] leading-relaxed text-slate-600">{personalInfo.summary}</p>
              </div>
            )}

            {/* C Experiences layout */}
            {workExperience.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: design.primaryColor }}>Work Experience</h3>
                <div className="space-y-3 divide-y divide-slate-100/50">
                  {workExperience.map((work) => (
                    <div key={work.id} className="pt-2 flex flex-col gap-1 first:pt-0">
                      <div className="flex justify-between items-start text-[11px]">
                        <div>
                          <span className="font-bold text-slate-800">{work.jobTitle || 'Role Name'}</span>
                          <span className="text-slate-400"> at </span>
                          <span className="font-bold" style={{ color: design.primaryColor }}>{work.company || 'Company Target'}</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400 font-mono">
                          {work.startDate} — {work.current ? 'Present' : work.endDate}
                        </span>
                      </div>
                      
                      {work.description && (
                        <p className="text-[9.5px] whitespace-pre-line text-slate-550 leading-relaxed mt-1 pl-1">
                          {work.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* D Education layout */}
            {education.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: design.primaryColor }}>Schooling & Education</h3>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="text-[11px] flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-800">{edu.degree || 'Degree name'}</span>
                        <span className="text-slate-400">, </span>
                        <span className="font-bold text-slate-650">{edu.school || 'Academic institution'}</span>
                        {edu.details && <p className="text-[9px] text-slate-400 mt-1">{edu.details}</p>}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono">
                        {edu.startDate} — {edu.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* E Skills layout */}
            {skills.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: design.primaryColor }}>Technical Competences</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((sk) => (
                    <span 
                      key={sk.id} 
                      className="px-2.5 py-0.5 rounded text-[9px] font-bold text-slate-600 border flex items-center gap-1.5"
                      style={{ borderColor: `${design.primaryColor}20` }}
                    >
                      {sk.name}
                      <span className="flex gap-0.5">
                        {[...Array(5)].map((_, idx) => (
                          <span 
                            key={idx} 
                            className={`h-1.5 w-1.5 rounded-full ${idx < sk.level ? 'opacity-100' : 'opacity-20'}`}
                            style={{ backgroundColor: design.primaryColor }}
                          />
                        ))}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* F Projects layout */}
            {projects.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: design.primaryColor }}>Key Projects</h3>
                <div className="space-y-2 text-[11px]">
                  {projects.map((proj) => (
                    <div key={proj.id} className="space-y-1">
                      <div className="flex justify-between font-bold">
                        <span className="text-slate-800">{proj.title} <span className="font-normal text-slate-400">({proj.role})</span></span>
                        {proj.link && <span className="font-mono text-[9px]" style={{ color: design.primaryColor }}>{proj.link}</span>}
                      </div>
                      {proj.description && <p className="text-[9.5px] text-slate-500 leading-relaxed">{proj.description}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
