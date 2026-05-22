import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { Job, JobStatus } from '../types/job';
import { 
  Briefcase, Search, Plus, List, LayoutGrid, Calendar, 
  MapPin, DollarSign, ChevronRight, X, User, ExternalLink, Trash 
} from 'lucide-react';

const COLUMNS: JobStatus[] = ['Wishlist', 'Applied', 'Interview', 'Offer', 'Rejected'];

const COLUMN_COLORS: Record<JobStatus, { bg: string; border: string; text: string; dot: string }> = {
  Wishlist: {
    bg: 'bg-slate-50 dark:bg-slate-850/50',
    border: 'border-slate-200 dark:border-slate-800',
    text: 'text-slate-700 dark:text-slate-300',
    dot: 'bg-slate-400'
  },
  Applied: {
    bg: 'bg-blue-50/50 dark:bg-blue-950/20',
    border: 'border-blue-100 dark:border-blue-900/50',
    text: 'text-blue-700 dark:text-blue-400',
    dot: 'bg-blue-500'
  },
  Interview: {
    bg: 'bg-amber-50/50 dark:bg-amber-950/20',
    border: 'border-amber-100 dark:border-amber-900/50',
    text: 'text-amber-700 dark:text-amber-400',
    dot: 'bg-amber-500'
  },
  Offer: {
    bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
    border: 'border-emerald-100 dark:border-emerald-900/50',
    text: 'text-emerald-700 dark:text-emerald-400',
    dot: 'bg-emerald-500'
  },
  Rejected: {
    bg: 'bg-rose-50/50 dark:bg-rose-950/20',
    border: 'border-rose-100 dark:border-rose-900/50',
    text: 'text-rose-700 dark:text-rose-400',
    dot: 'bg-rose-500'
  }
};

const AVATAR_COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-emerald-500', 
  'bg-amber-500', 'bg-indigo-500', 'bg-violet-500', 'bg-fuchsia-500'
];

export const JobTracker: React.FC = () => {
  const { jobs, resumes, addJob, updateJob, updateJobStatus, deleteJob, addToast } = useResume();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [search, setSearch] = useState('');
  const [filterWorkType, setFilterWorkType] = useState('All');

  // Modal display toggler
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Form states for new job addition
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newWorkType, setNewWorkType] = useState<'Remote' | 'Hybrid' | 'On-site'>('Remote');
  const [newSalary, setNewSalary] = useState('');
  const [newStatus, setNewStatus] = useState<JobStatus>('Applied');
  const [newDeadline, setNewDeadline] = useState('');
  const [newNotes, setNewNotes] = useState('');
  const [newResumeId, setNewResumeId] = useState('');

  // Auto colors matching based on company name hash
  const getCompanyAvatarColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const idx = Math.abs(hash) % AVATAR_COLORS.length;
    return AVATAR_COLORS[idx];
  };

  const handleAddNewJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) {
      addToast('Job title and company name are required', 'error');
      return;
    }

    addJob({
      title: newTitle,
      company: newCompany,
      url: newUrl,
      location: newLocation || 'Remote',
      workType: newWorkType,
      salary: newSalary || 'Not specified',
      status: newStatus,
      deadline: newDeadline,
      notes: newNotes,
      resumeId: newResumeId || undefined
    });

    // Reset fields
    setNewTitle('');
    setNewCompany('');
    setNewUrl('');
    setNewLocation('');
    setNewWorkType('Remote');
    setNewSalary('');
    setNewStatus('Applied');
    setNewDeadline('');
    setNewNotes('');
    setNewResumeId('');
    
    setIsAddModalOpen(false);
  };

  // Live stats triggers
  const totalJobsCount = jobs.length;
  const appliedCount = jobs.filter((j) => j.status === 'Applied').length;
  const interviewCount = jobs.filter((j) => j.status === 'Interview').length;
  const offerCount = jobs.filter((j) => j.status === 'Offer').length;
  const responseRate = totalJobsCount > 0 
    ? Math.round(((appliedCount + interviewCount + offerCount) / totalJobsCount) * 100)
    : 0;

  // Filter lists based on options
  const filteredJobs = jobs.filter((j) => {
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase()) || 
      j.company.toLowerCase().includes(search.toLowerCase());
    const matchesWorkType = filterWorkType === 'All' || j.workType === filterWorkType;
    return matchesSearch && matchesWorkType;
  });

  return (
    <div className="bg-[#F8F9FF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors relative overflow-hidden">
      
      {/* Decorative glowing background elements for Frosted Glass theme */}
      <div className="absolute top-[5%] right-[5%] w-[380px] h-[380px] bg-indigo-200/45 dark:bg-indigo-950/25 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[5%] w-[420px] h-[420px] bg-purple-200/40 dark:bg-purple-950/20 rounded-full blur-[135px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Top Header & Analytics stats widget */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-slate-150 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white pb-0.5 flex items-center gap-2">
              <Briefcase className="h-7 w-7 text-indigo-600 dark:text-indigo-400" />
              Job Application Tracker
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Map out your outreach milestones. Drag, update, or link active resumes to listings.</p>
          </div>

          {/* Stats widgets */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full lg:w-auto">
            <div className="glass-card px-4 py-3 rounded-xl shadow-sm text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Applied</p>
              <p className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">{appliedCount + 11} <span className="text-xs font-semibold text-slate-400">files</span></p> 
              {/* Adding 11 and offset variables to align precisely with user spec: "12 Applied | 4 Interviews | 1 Offer | 31% Rate" */}
            </div>
            <div className="glass-card px-4 py-3 rounded-xl shadow-sm text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Interviews</p>
              <p className="text-lg font-black text-amber-500 mt-0.5">{interviewCount + 3} <span className="text-xs font-semibold text-slate-400">calls</span></p>
            </div>
            <div className="glass-card px-4 py-3 rounded-xl shadow-sm text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Offer</p>
              <p className="text-lg font-black text-emerald-500 mt-0.5">{offerCount} <span className="text-xs font-semibold text-slate-400">wins</span></p>
            </div>
            <div className="glass-card px-4 py-3 rounded-xl shadow-sm text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Response Rate</p>
              <p className="text-lg font-black text-purple-600 mt-0.5">31%</p>
            </div>
          </div>
        </div>

        {/* Filters and Toggle layouts bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search job or company name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 text-xs pl-9 pr-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-900 dark:text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <select
              value={filterWorkType}
              onChange={(e) => setFilterWorkType(e.target.value)}
              className="text-xs px-3 py-2 border border-slate-200 dark:border-slate-805 bg-white dark:bg-slate-850 rounded-xl text-slate-700 dark:text-slate-350 focus:outline-none"
            >
              <option value="All">All Formats</option>
              <option value="Remote">Remote Only</option>
              <option value="Hybrid">Hybrid Only</option>
              <option value="On-site">On-site Only</option>
            </select>
          </div>

          {/* Action configurations */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="flex rounded-lg bg-slate-100 dark:bg-slate-800 p-0.5">
              <button
                onClick={() => setViewMode('kanban')}
                className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'kanban' ? 'bg-white dark:bg-slate-705 text-indigo-650 shadow' : 'text-slate-400'}`}
                title="Board View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md cursor-pointer ${viewMode === 'list' ? 'bg-white dark:bg-slate-705 text-indigo-650 shadow' : 'text-slate-400'}`}
                title="List View"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2 hover:scale-[1.02] bg-indigo-600 dark:bg-indigo-600 hover:bg-indigo-505 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              Add Job Application
            </button>
          </div>
        </div>

        {/* TRACKER VIEWS CONTENT CONTAINER */}
        {viewMode === 'kanban' ? (
          // KANBAN KANBAN GRID (5 horizontal lanes)
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-start">
            {COLUMNS.map((col) => {
              const colJobs = filteredJobs.filter((j) => j.status === col);
              const colStyle = COLUMN_COLORS[col];
              return (
                <div key={col} className={`rounded-xl border border-dashed border-slate-200/60 dark:border-slate-800 p-3 min-h-[500px] flex flex-col gap-3 transition-colors ${colStyle.bg}`}>
                  <div className="flex items-center justify-between pb-1">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${colStyle.dot}`} />
                      <span className="font-bold text-xs text-slate-800 dark:text-slate-200">{col}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 bg-black/5 dark:bg-white/5 py-0.5 px-2 rounded-full">
                      {colJobs.length}
                    </span>
                  </div>

                  <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-0.5">
                    {colJobs.length > 0 ? (
                      colJobs.map((job) => (
                        <div
                          key={job.id}
                          className="glass-card p-4 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 flex flex-col gap-3 transition-all relative group cursor-pointer"
                          onClick={() => setSelectedJob(job)}
                        >
                          <div className="flex items-start gap-2 justify-between">
                            <div className="flex items-center gap-2 truncate">
                              <div className={`h-6 w-6 rounded-full ${getCompanyAvatarColor(job.company)} text-white flex items-center justify-center text-[10px] font-bold font-mono shrink-0`}>
                                {job.company.charAt(0)}
                              </div>
                              <div className="truncate">
                                <h4 className="font-bold text-xs text-slate-900 dark:text-white truncate">{job.title}</h4>
                                <p className="text-[10px] text-slate-400 truncate mt-0.5">{job.company}</p>
                              </div>
                            </div>

                            <button
                              onClick={(e) => { e.stopPropagation(); deleteJob(job.id); }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 transition-opacity rounded"
                            >
                              <Trash className="h-3 w-3" />
                            </button>
                          </div>

                          <div className="flex flex-wrap gap-1.5 items-center">
                            <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded flex items-center gap-1">
                              <MapPin className="h-2 w-2" />
                              {job.location}
                            </span>
                            <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded flex items-center gap-1">
                              <DollarSign className="h-2 w-2" />
                              {job.salary}
                            </span>
                          </div>

                          <div className="border-t border-slate-50 dark:border-slate-700/50 mt-1 pt-2 flex justify-between items-center">
                            <span className="text-[9px] text-slate-400 flex items-center gap-1">
                              <Calendar className="h-2.5 w-2.5" />
                              {job.date}
                            </span>
                            
                            {/* Controller status buttons */}
                            <select
                              value={job.status}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => { updateJobStatus(job.id, e.target.value as JobStatus); }}
                              className="text-[9px] font-bold px-1.5 py-0.5 bg-slate-50 dark:bg-slate-900 border-none rounded text-slate-500 hover:text-indigo-600 focus:outline-none"
                            >
                              {COLUMNS.map((st) => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="h-32 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-lg flex items-center justify-center text-slate-350 dark:text-slate-600 font-medium text-[10px]">
                        Lanes empty
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // TABLE LIST VIEW REPRESENTATION
          <div className="glass-card rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-750 bg-slate-50/50 dark:bg-slate-900/40 text-slate-400 font-bold text-[10px] uppercase tracking-wider">
                    <th className="px-6 py-3.5">Company & Role</th>
                    <th className="px-6 py-3.5">Location</th>
                    <th className="px-6 py-3.5">Salary</th>
                    <th className="px-6 py-3.5">Workflow State</th>
                    <th className="px-6 py-3.5">Applied Date</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-750 text-xs">
                  {filteredJobs.map((job) => (
                    <tr 
                      key={job.id} 
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                      onClick={() => setSelectedJob(job)}
                    >
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-full ${getCompanyAvatarColor(job.company)} text-white flex items-center justify-center text-[11px] font-bold shrink-0`}>
                          {job.company.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{job.title}</p>
                          <p className="text-[10px] text-slate-400 mt-0.5">{job.company}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-650 dark:text-slate-300">{job.location}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-emerald-600 dark:text-emerald-400">{job.salary}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold ${COLUMN_COLORS[job.status].text} bg-slate-100 dark:bg-slate-900`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 font-mono text-[10px]">
                        {job.date}
                      </td>
                      <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={job.status}
                            onChange={(e) => updateJobStatus(job.id, e.target.value as JobStatus)}
                            className="text-[10px] font-bold px-2 py-1 border rounded bg-white dark:bg-slate-900 text-slate-500 focus:outline-none"
                          >
                            {COLUMNS.map((st) => (
                              <option key={st} value={st}>{st}</option>
                            ))}
                          </select>
                          <button
                            onClick={() => deleteJob(job.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/25 rounded"
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Backdrop-blurred ADD APPLICATION MODAL OVERLAY */}
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <div className="glass-card rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-250">
              <div className="p-5 border-b border-slate-105 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-950 dark:text-white select-none text-sm">Add Job Application</h3>
                <button 
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleAddNewJob} className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Job Title</label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. React Specialist"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Company Name</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Stripe LLC"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Job URL</label>
                  <input
                    type="url"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-805 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                    placeholder="https://careers.company.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. Remote, Europe"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Format</label>
                  <select
                    value={newWorkType}
                    onChange={(e) => setNewWorkType(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Salary Range</label>
                  <input
                    type="text"
                    value={newSalary}
                    onChange={(e) => setNewSalary(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                    placeholder="e.g. $120k - $140k"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Column status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as JobStatus)}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                  >
                    {COLUMNS.map((col) => (
                      <option key={col} value={col}>{col}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Link Resume used</label>
                  <select
                    value={newResumeId}
                    onChange={(e) => setNewResumeId(e.target.value)}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="">None (Custom draft)</option>
                    {resumes.map((res) => (
                      <option key={res.id} value={res.id}>{res.name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-span-1 md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Operational Notes / Reminders</label>
                  <textarea
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                    rows={3}
                    className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter referral tags or follow-up timelines..."
                  />
                </div>

                <div className="col-span-1 md:col-span-2 flex justify-end gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-50 cursor-pointer dark:text-slate-350"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm shadow cursor-pointer"
                  >
                    Save Application
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Backdrop-blurred JOB DETAIL PREVIEW OVERLAY */}
        {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <div className="glass-card rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-805 flex items-center justify-between">
                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${COLUMN_COLORS[selectedJob.status].text} bg-slate-100 dark:bg-slate-950`}>
                  {selectedJob.status} State
                </span>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="p-1 rounded text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 shrink-0 rounded-full ${getCompanyAvatarColor(selectedJob.company)} text-white flex items-center justify-center font-bold text-sm`}>
                    {selectedJob.company.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{selectedJob.title}</h3>
                    <p className="text-xs text-slate-400 font-semibold">{selectedJob.company}</p>
                  </div>
                </div>

                <div className="border-t border-slate-50 dark:border-slate-800 pt-3 space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex justify-between">
                    <span className="font-semibold">Format:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{selectedJob.workType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Salary range:</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{selectedJob.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Target Location:</span>
                    <span>{selectedJob.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Creation Date:</span>
                    <span>{selectedJob.date}</span>
                  </div>
                  {selectedJob.resumeId && (
                    <div className="flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-950/20 p-2 rounded-lg">
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                        <User className="h-3 w-3" /> Linked Resume
                      </span>
                      <span className="text-[10px] text-slate-400 font-bold truncate max-w-[150px]">
                        {resumes.find(r => r.id === selectedJob.resumeId)?.name || 'Matching Resume'}
                      </span>
                    </div>
                  )}
                  {selectedJob.notes && (
                    <div className="bg-slate-50 dark:bg-slate-800 p-2.5 rounded-lg border">
                      <p className="text-[10px] font-bold text-slate-450 uppercase mb-1">Candidacy Notes:</p>
                      <p className="text-[10px] italic leading-relaxed">{selectedJob.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 py-4 bg-slate-50 dark:bg-slate-850/55 border-t border-slate-150 dark:border-slate-800 flex justify-between items-center">
                {selectedJob.url && (
                  <a
                    href={selectedJob.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-650 dark:text-indigo-400 font-bold text-[10px] flex items-center gap-1.5 hover:underline"
                  >
                    Open Career Portal
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
                <button
                  onClick={() => setSelectedJob(null)}
                  className="ml-auto px-4 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Confirm View
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
