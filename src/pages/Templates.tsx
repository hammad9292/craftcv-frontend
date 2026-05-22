import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { useAuth } from '../context/AuthContext';
import { RESUME_TEMPLATES, ResumeTemplate } from '../data/templates';
import { Play, Check, Search, Plus, Eye, Sparkles } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Simple',
  'Modern',
  'Creative',
  'Professional',
  'ATS-Friendly',
  'Two-Column'
];

export const Templates: React.FC = () => {
  const navigate = useNavigate();
  const { addResume, addToast } = useResume();
  const { isAuthenticated } = useAuth();
  
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<ResumeTemplate | null>(null);

  const handleUseTemplate = (template: ResumeTemplate) => {
    setSelectedTemplateId(template.id);
    if (!isAuthenticated) {
      addToast('Please login to create a resume', 'info');
      navigate('/login');
      return;
    }

    const defaultName = `My ${template.name} Resume`;
    const newId = addResume(defaultName, template.id);
    addToast(`Created "${defaultName}" successfully!`, 'success');
    navigate(`/editor/${newId}`);
  };

  const filtered = RESUME_TEMPLATES.filter((tmpl) => {
    const matchesCategory = activeCategory === 'All' || tmpl.category === activeCategory;
    const matchesSearch = tmpl.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tmpl.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8F9FF] dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors relative overflow-hidden">
      
      {/* Decorative glowing background elements for Frosted Glass theme */}
      <div className="absolute top-[5%] left-[5%] w-[380px] h-[380px] bg-indigo-200/40 dark:bg-indigo-950/20 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[15%] w-[420px] h-[420px] bg-purple-200/35 dark:bg-purple-950/15 rounded-full blur-[130px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* Header and search */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950 dark:text-white pb-1 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-indigo-500" />
              Choose a Template
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-xs">Pick from 12 recruiter-vetted layout structures to map your credentials.</p>
          </div>

          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-sm pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none items-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-indigo-600 dark:bg-indigo-505 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-750 border border-slate-100 dark:border-slate-850/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((tmpl) => {
              const isSelected = selectedTemplateId === tmpl.id;
              return (
                <div
                  key={tmpl.id}
                  className={`glass-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-2 relative group ${
                    isSelected ? 'border-indigo-600 dark:border-indigo-550 ring-2 ring-indigo-500/20' : 'border-transparent'
                  }`}
                >
                  {/* Thumbnail area */}
                  <div className="aspect-[3/4] relative overflow-hidden bg-slate-50 border-b border-slate-100 dark:border-slate-750">
                    <img
                      src={tmpl.imageUrl}
                      alt={tmpl.name}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />

                    {/* Use Button overlay */}
                    <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-4">
                      <button
                        onClick={() => handleUseTemplate(tmpl)}
                        className="w-40 py-2 bg-indigo-600 hover:bg-indigo-550 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                        Use Template
                      </button>
                      <button
                        onClick={() => setPreviewTemplate(tmpl)}
                        className="w-40 py-2 bg-white/90 hover:bg-white text-slate-800 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                      >
                        <Eye className="h-4 w-4" />
                        Preview Design
                      </button>
                    </div>
                  </div>

                  {/* Info bar footer */}
                  <div className="p-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-800 dark:text-white truncate pr-1">{tmpl.name}</span>
                      <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded uppercase">
                        {tmpl.category}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 glass-card rounded-2xl border border-dashed border-slate-200 dark:border-slate-700/80 flex flex-col items-center justify-center gap-3">
            <span className="text-slate-400 font-medium text-sm">No templates matched your query criteria.</span>
            <button
              onClick={() => { setActiveCategory('All'); setSearchTerm(''); }}
              className="px-4 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg text-xs"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Modal template preview overlay */}
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
            <div className="glass-card rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">{previewTemplate.name} — Preview Mode</h3>
                <span className="text-xs bg-indigo-50 dark:bg-indigo-950 px-2 py-1 rounded text-indigo-600 dark:text-indigo-400">
                  {previewTemplate.category} Template
                </span>
              </div>
              <div className="p-6 aspect-[3/4] max-h-[500px] overflow-hidden bg-slate-150">
                <img
                  src={previewTemplate.imageUrl}
                  alt={previewTemplate.name}
                  className="w-full h-full object-cover rounded-xl shadow-lg border"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 font-semibold text-xs text-slate-600 dark:text-slate-350 rounded-lg hover:bg-white transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const tmpl = previewTemplate;
                    setPreviewTemplate(null);
                    handleUseTemplate(tmpl);
                  }}
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-550 text-white rounded-lg font-bold text-xs cursor-pointer shadow-md"
                >
                  Use Template Design
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
