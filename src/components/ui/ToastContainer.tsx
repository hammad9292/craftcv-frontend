import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useResume();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          let bgClass = 'bg-white border-slate-200 text-slate-800 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200';
          let Icon = Info;
          let iconColor = 'text-indigo-500';

          if (toast.type === 'success') {
            bgClass = 'bg-emerald-50 border-emerald-200 text-emerald-900 dark:bg-emerald-950/50 dark:border-emerald-900 dark:text-emerald-100';
            Icon = CheckCircle;
            iconColor = 'text-emerald-500';
          } else if (toast.type === 'error') {
            bgClass = 'bg-rose-50 border-rose-200 text-rose-900 dark:bg-rose-950/50 dark:border-rose-900 dark:text-rose-100';
            Icon = AlertCircle;
            iconColor = 'text-rose-500';
          }

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 50, transition: { duration: 0.2 } }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border-1 shadow-lg backdrop-blur-md ${bgClass}`}
            >
              <Icon className={`h-5 w-5 shrink-0 ${iconColor} mt-0.5`} />
              <div className="flex-1 text-sm font-medium pr-1">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="shrink-0 p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
