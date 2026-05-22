import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Linkedin, Twitter, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-indigo-600 dark:bg-violet-600 text-white p-1.5 rounded-lg shadow-md">
                <FileText className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Craft<span className="text-indigo-600 dark:text-indigo-400">CV</span>
              </span>
            </div>
            <p className="text-sm">
              Design professional, job-winning resumes and cover letters in minutes. Absolute compliance, premium ATS layout formulas.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                <Github className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Product */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Product</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/templates" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Resume Templates</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Premium Plans</Link>
              </li>
              <li>
                <a href="#features" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">AI Content Assist</a>
              </li>
              <li>
                <Link to="/job-tracker" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Job Status Kanban</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Terms of Service</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Privacy Policy</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">GDPR Compliance</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Refund Policy</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Support */}
          <div>
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-4">Support</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Help Center</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">FAQ accordion</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Resume Writing Guide</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Contact Support</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200/60 dark:border-slate-800/80 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-400">
          <div>
            © {new Date().getFullYear()} CraftCV. All rights reserved. Made in Europe/Pakistan.
          </div>
          <div className="flex items-center gap-1.5">
            Empowered with <Heart className="h-3 w-3 text-rose-500 fill-current" /> for global creators.
          </div>
        </div>
      </div>
    </footer>
  );
};
