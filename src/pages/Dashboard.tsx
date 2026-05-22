import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { 
  Plus, MoreVertical, FileText, ChevronRight, Edit2, 
  Copy, Download, Trash, Loader, Layout, Eye, Search, HelpCircle 
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { 
    resumes, coverLetters, addResume, duplicateResume, renameResume, deleteResume,
    addCoverLetter, duplicateCoverLetter, renameCoverLetter, deleteCoverLetter, addToast 
  } = useResume();
  const { user } = useAuth();

  // Selected tab filtering (resumes or cover-letters)
  const activeTab = searchParams.get('tab') || 'resumes';

  // State for active dropdown list menus
  const [activeDropdown, setActiveDropdown] = useState<{ type: 'res' | 'cl'; id: string } | null>(null);
  
  // State for action Modals
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'res' | 'cl'; id: string; name: string } | null>(null);
  const [renameTarget, setRenameTarget] = useState<{ type: 'res' | 'cl'; id: string; name: string } | null>(null);
  const [renameValue, setRenameValue] = useState('');

  // Search parameters inside dashboard
  const [dashSearch, setDashSearch] = useState('');

  const handleCreateNewResume = () => {
    navigate('/templates');
  };

  const handleCreateNewCoverLetter = () => {
    const id = addCoverLetter('New Cover Letter');
    navigate(`/cover-letter/${id}`);
  };

  const openRenameModal = (type: 'res' | 'cl', id: string, name: string) => {
    setRenameTarget({ type, id, name });
    setRenameValue(name);
    setActiveDropdown(null);
  };

  const submitRename = () => {
    if (!renameValue.trim() || !renameTarget) return;
    if (renameTarget.type === 'res') {
      renameResume(renameTarget.id, renameValue);
    } else {
      renameCoverLetter(renameTarget.id, renameValue);
    }
    setRenameTarget(null);
  };

  // Mock download trigger with toast
  const triggerMockDownload = (name: string) => {
    addToast(`Constructing "${name}" dependencies...`, 'info');
    setTimeout(() => {
      addToast(`"${name}" successfully exported to PDF!`, 'success');
    }, 1200);
    setActiveDropdown(null);
  };

  const handleDeleteClick = (type: 'res' | 'cl', id: string, name: string) => {
    setDeleteConfirm({ type, id, name });
    setActiveDropdown(null);
  };

  const confirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'res') {
      deleteResume(deleteConfirm.id);
    } else {
      deleteCoverLetter(deleteConfirm.id);
    }
    setDeleteConfirm(null);
  };

  // Filter content
  const filteredResumes = resumes.filter(r => r.name.toLowerCase().includes(dashSearch.toLowerCase()));
  const filteredCoverLetters = coverLetters.filter(c => c.name.toLowerCase().includes(dashSearch.toLowerCase()));

  return (
    <div className="bg-[#F8F9FF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors relative overflow-hidden">
      
      {/* Decorative glowing background elements for Frosted Glass theme */}
      <div className="absolute top-[5%] left-[10%] w-[380px] h-[380px] bg-indigo-200/45 dark:bg-indigo-950/25 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[10%] w-[420px] h-[420px] bg-sky-200/40 dark:bg-sky-950/20 rounded-full blur-[130px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Profile greetings bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 glass-card p-6 rounded-2xl transition-colors">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                alt="Avatar"
                className="h-14 w-14 rounded-full border-2 border-indigo-100 dark:border-indigo-900 object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-800" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Workspace of {user?.fullName || 'Ahmad Khan'}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Senior Frontend Developer · Free Pro Plan Trial</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={dashSearch}
                onChange={(e) => setDashSearch(e.target.value)}
                className="w-full sm:w-56 text-xs pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900/40 border border-slate-150 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-slate-200 dark:border-slate-800/80 gap-6">
          <button
            onClick={() => setSearchParams({ tab: 'resumes' })}
            className={`pb-3.5 text-sm font-semibold relative cursor-pointer ${
              activeTab === 'resumes' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'
            }`}
          >
            My Resumes ({resumes.length})
            {activeTab === 'resumes' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t" />
            )}
          </button>
          
          <button
            onClick={() => setSearchParams({ tab: 'cover-letters' })}
            className={`pb-3.5 text-sm font-semibold relative cursor-pointer ${
              activeTab === 'cover-letters' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'
            }`}
          >
            My Cover Letters ({coverLetters.length})
            {activeTab === 'cover-letters' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-indigo-600 dark:bg-indigo-400 rounded-t" />
            )}
          </button>
        </div>

        {/* TAB 1: RESUMES AREA */}
        {activeTab === 'resumes' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Saved Resume Documents</h3>
                <p className="text-xs text-slate-400">Manage and export your custom resume variations.</p>
              </div>
              <button
                onClick={handleCreateNewResume}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-[1.02] cursor-pointer transition-all"
              >
                <Plus className="h-4 w-4" />
                New Resume
              </button>
            </div>

            {filteredResumes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResumes.map((res) => (
                  <div
                    key={res.id}
                    className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.01] hover:border-slate-300/65 dark:hover:border-slate-700/60 group transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Simulated resume mini-canvas */}
                    <div 
                      onClick={() => navigate(`/editor/${res.id}`)}
                      className="aspect-[4/3] bg-slate-50 dark:bg-slate-900/60 p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-2 cursor-pointer hover:opacity-95 transition-all"
                    >
                      {/* Name card mockup lines */}
                      <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-750 pb-2">
                        <div className="h-6 w-6 rounded bg-indigo-100 dark:bg-indigo-950 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center">CV</div>
                        <div className="h-2 w-20 bg-slate-300 dark:bg-slate-600 rounded" />
                      </div>
                      <div className="space-y-1.5 mt-2">
                        <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-1.5 w-5/6 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-1.5 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between relative">
                      <div className="flex flex-col truncate pr-2">
                        <span className="font-bold text-sm text-slate-800 dark:text-white truncate">{res.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5">{res.lastEdited}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/editor/${res.id}`)}
                          className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        
                        {/* More dropdown togglers */}
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown?.id === res.id ? null : { type: 'res', id: res.id })}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors cursor-pointer"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {/* Action drop items */}
                          {activeDropdown?.type === 'res' && activeDropdown?.id === res.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-100 dark:border-slate-850 bg-white dark:bg-slate-850 shadow-xl py-1 z-20">
                                <button
                                  onClick={() => openRenameModal('res', res.id, res.name)}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                  Rename
                                </button>
                                <button
                                  onClick={() => { duplicateResume(res.id); setActiveDropdown(null); }}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                  Duplicate
                                </button>
                                <button
                                  onClick={() => triggerMockDownload(res.name)}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  Download PDF
                                </button>
                                <div className="border-t border-slate-100 dark:border-slate-800" />
                                <button
                                  onClick={() => handleDeleteClick('res', res.id, res.name)}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2"
                                >
                                  <Trash className="h-3.5 w-3.5" />
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty resumes state
              <div className="py-20 glass-card rounded-2xl flex flex-col items-center justify-center gap-4 text-center">
                <svg className="w-48 h-32 text-slate-200 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">No resumes created yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm">Kick start your application pipeline by creating your first clean ATS resume layout.</p>
                </div>
                <button
                  onClick={handleCreateNewResume}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Create your first resume
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: COVER LETTERS AREA */}
        {activeTab === 'cover-letters' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Save Cover Letters</h3>
                <p className="text-xs text-slate-400">Compose customized introduction letters with smart layouts styling.</p>
              </div>
              <button
                onClick={handleCreateNewCoverLetter}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md hover:scale-[1.02] cursor-pointer transition-all"
              >
                <Plus className="h-4 w-4" />
                New Cover Letter
              </button>
            </div>

            {filteredCoverLetters.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCoverLetters.map((letter) => (
                  <div
                    key={letter.id}
                    className="glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:scale-[1.01] hover:border-slate-300/65 dark:hover:border-slate-700/60 group transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Cover Letter mini visual thumbnail */}
                    <div 
                      onClick={() => navigate(`/cover-letter/${letter.id}`)}
                      className="aspect-[4/3] bg-slate-50 dark:bg-slate-900/60 p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col gap-2 cursor-pointer hover:opacity-95 transition-all"
                    >
                      <div className="h-2 w-16 bg-slate-350 dark:bg-slate-600 rounded" />
                      <div className="h-1.5 w-24 bg-slate-200 dark:bg-slate-700 rounded mt-2" />
                      <div className="space-y-2 mt-4">
                        <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-1 w-11/12 bg-slate-200 dark:bg-slate-700 rounded" />
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between relative">
                      <div className="flex flex-col truncate pr-2">
                        <span className="font-bold text-sm text-slate-800 dark:text-white truncate">{letter.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5">{letter.lastEdited}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/cover-letter/${letter.id}`)}
                          className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 font-bold text-xs rounded-lg transition-colors cursor-pointer"
                        >
                          Edit
                        </button>
                        
                        <div className="relative">
                          <button
                            onClick={() => setActiveDropdown(activeDropdown?.id === letter.id ? null : { type: 'cl', id: letter.id })}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>

                          {activeDropdown?.type === 'cl' && activeDropdown?.id === letter.id && (
                            <>
                              <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)} />
                              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-xl py-1 z-20">
                                <button
                                  onClick={() => openRenameModal('cl', letter.id, letter.name)}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                  Rename
                                </button>
                                <button
                                  onClick={() => { duplicateCoverLetter(letter.id); setActiveDropdown(null); }}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Copy className="h-3.5 w-3.5" />
                                  Duplicate
                                </button>
                                <button
                                  onClick={() => triggerMockDownload(letter.name)}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-2"
                                >
                                  <Download className="h-3.5 w-3.5" />
                                  Download PDF
                                </button>
                                <div className="border-t border-slate-100 dark:border-slate-800" />
                                <button
                                  onClick={() => handleDeleteClick('cl', letter.id, letter.name)}
                                  className="w-full text-left px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 flex items-center gap-2"
                                >
                                  <Trash className="h-3.5 w-3.5" />
                                  Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Empty cover letters state
              <div className="py-20 glass-card rounded-2xl flex flex-col items-center justify-center gap-4 text-center">
                <svg className="w-48 h-32 text-slate-200 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
                </svg>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-900 dark:text-white">No cover letters yet</h4>
                  <p className="text-xs text-slate-400 max-w-sm">Craft a premium introduction letter matching your resume layout in seconds.</p>
                </div>
                <button
                  onClick={handleCreateNewCoverLetter}
                  className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                >
                  Create your first cover letter
                </button>
              </div>
            )}
          </div>
        )}

        {/* 1. Backdrop-blurred RENAME MODAL */}
        {renameTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <div className="glass-card rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-850">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Rename {renameTarget.type === 'res' ? 'Resume' : 'Cover Letter'}</h4>
              </div>
              <div className="p-5 space-y-3">
                <input
                  type="text"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  className="w-full text-xs px-3 py-2 border rounded-xl bg-slate-50 dark:bg-slate-800 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  placeholder="Enter new label name"
                />
              </div>
              <div className="px-5 py-4 bg-slate-50 dark:bg-slate-850/55 border-t border-slate-150 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  onClick={() => setRenameTarget(null)}
                  className="px-4 py-2 border rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-300 hover:bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRename}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Backdrop-blurred DELETE CONFIRMATION MODAL */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <div className="glass-card rounded-2xl max-w-sm w-full shadow-2xl overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">Confirm Deletion</h4>
              </div>
              <div className="p-5 italic text-slate-600 dark:text-slate-300 text-xs text-center leading-relaxed">
                Are you absolutely sure you want to remove <span className="font-bold text-slate-800 dark:text-white">"{deleteConfirm.name}"</span>? 
                This operational sequence is irreversible and will purge saved local storage caches immediately.
              </div>
              <div className="px-5 py-4 bg-slate-50 dark:bg-slate-850/55 border-t border-slate-150 dark:border-slate-800 flex justify-end gap-2.5">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-500 hover:bg-white cursor-pointer dark:text-slate-350"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-500 cursor-pointer"
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
