import React, { createContext, useContext, useState, useEffect } from 'react';
import { Resume, CoverLetter } from '../types/resume';
import { Job, JobStatus } from '../types/job';
import { INITIAL_RESUMES, INITIAL_COVER_LETTERS } from '../data/mockResumes';
import { INITIAL_JOBS } from '../data/mockJobs';

export interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ResumeContextType {
  resumes: Resume[];
  coverLetters: CoverLetter[];
  jobs: Job[];
  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  
  // Resumes CRUD
  addResume: (name: string, templateId: string) => string;
  duplicateResume: (id: string) => void;
  renameResume: (id: string, newName: string) => void;
  deleteResume: (id: string) => void;
  updateResume: (id: string, updated: Partial<Resume>) => void;
  
  // Cover Letters CRUD
  addCoverLetter: (name: string, recipientName?: string) => string;
  duplicateCoverLetter: (id: string) => void;
  renameCoverLetter: (id: string, newName: string) => void;
  deleteCoverLetter: (id: string) => void;
  updateCoverLetter: (id: string, updated: Partial<CoverLetter>) => void;
  
  // Jobs Tracker CRUD
  addJob: (job: Omit<Job, 'id' | 'date'>) => void;
  updateJob: (id: string, updated: Partial<Job>) => void;
  updateJobStatus: (id: string, status: JobStatus) => void;
  deleteJob: (id: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Resumes Initial State
  const [resumes, setResumes] = useState<Resume[]>(() => {
    const saved = localStorage.getItem('craftcv_resumes');
    return saved ? JSON.parse(saved) : INITIAL_RESUMES;
  });

  // Cover Letters Initial State
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>(() => {
    const saved = localStorage.getItem('craftcv_cover_letters');
    return saved ? JSON.parse(saved) : INITIAL_COVER_LETTERS;
  });

  // Jobs Initial State
  const [jobs, setJobs] = useState<Job[]>(() => {
    const saved = localStorage.getItem('craftcv_jobs');
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  // Synchronizers to localStorage
  useEffect(() => {
    localStorage.setItem('craftcv_resumes', JSON.stringify(resumes));
  }, [resumes]);

  useEffect(() => {
    localStorage.setItem('craftcv_cover_letters', JSON.stringify(coverLetters));
  }, [coverLetters]);

  useEffect(() => {
    localStorage.setItem('craftcv_jobs', JSON.stringify(jobs));
  }, [jobs]);

  // --- Resumes Actions ---
  const addResume = (name: string, templateId: string): string => {
    const id = 'resume_' + Date.now();
    const newResume: Resume = {
      id,
      name,
      lastEdited: 'Edited just now',
      personalInfo: {
        fullName: 'Ahmad Khan',
        jobTitle: 'Senior Frontend Developer',
        email: 'ahmad@example.com',
        phone: '+92 300 1234567',
        city: 'Islamabad',
        country: 'Pakistan',
        website: 'https://ahmadkhan.dev',
        linkedIn: '',
        gitHub: '',
        summary: 'Experienced professional developer skilled in structuring scalable frameworks and premium design structures.',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
      },
      workExperience: [
        {
          id: 'work_new_1',
          jobTitle: 'Senior Frontend Engineer',
          company: 'Acme Corporates',
          startDate: '2024',
          endDate: 'Present',
          current: true,
          description: '• Architected complex internal UI tooling matching modern custom palettes.'
        }
      ],
      education: [
        {
          id: 'edu_new_1',
          degree: 'Bachelor of Science',
          school: 'State Tech University',
          startDate: '2020',
          endDate: '2024',
          details: 'Focus on Human Computer Interaction.'
        }
      ],
      skills: [
        { id: 'sk_1', name: 'React', level: 5 },
        { id: 'sk_2', name: 'TypeScript', level: 4 }
      ],
      projects: [],
      customSections: [],
      design: {
        templateId,
        primaryColor: '#6C63FF',
        fontFamily: 'Inter',
        fontSize: 'medium',
        spacing: 'normal',
        pageSize: 'A4'
      }
    };

    setResumes((prev) => [newResume, ...prev]);
    addToast(`"${name}" created successfully!`, 'success');
    return id;
  };

  const duplicateResume = (id: string) => {
    const base = resumes.find((r) => r.id === id);
    if (!base) return;

    const copy: Resume = {
      ...base,
      id: 'resume_' + Date.now(),
      name: `${base.name} (Copy)`,
      lastEdited: 'Edited just now'
    };

    setResumes((prev) => {
      const idx = prev.findIndex((r) => r.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    addToast(`Duplicated "${base.name}" resume!`, 'success');
  };

  const renameResume = (id: string, newName: string) => {
    setResumes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, name: newName, lastEdited: 'Edited just now' } : r))
    );
    addToast('Resume renamed successfully', 'success');
  };

  const deleteResume = (id: string) => {
    const target = resumes.find((r) => r.id === id);
    setResumes((prev) => prev.filter((r) => r.id !== id));
    if (target) {
      addToast(`Deleted "${target.name}" resume`, 'info');
    }
  };

  const updateResume = (id: string, updated: Partial<Resume>) => {
    setResumes((prev) =>
      prev.map((r) =>
        r.id === id
          ? { ...r, ...updated, lastEdited: 'Edited just now' }
          : r
      )
    );
  };

  // --- Cover Letters Actions ---
  const addCoverLetter = (name: string, recipientName: string = 'Hiring Manager'): string => {
    const id = 'cl_' + Date.now();
    const newCover: CoverLetter = {
      id,
      name,
      lastEdited: 'Edited just now',
      personalInfo: {
        fullName: 'Ahmad Khan',
        jobTitle: 'Senior Frontend Developer',
        email: 'ahmad@example.com',
        phone: '+92 300 1234567',
        city: 'Islamabad',
        country: 'Pakistan',
        website: 'https://ahmadkhan.dev',
        linkedIn: '',
        gitHub: '',
        summary: ''
      },
      recipientName,
      recipientTitle: 'Head of Engineering',
      companyName: 'Tech Innovations Corp',
      recipientAddress: '742 Evergreen Terrace, Sector G-11, Islamabad',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      subject: `Application for Senior Frontend Engineer Position`,
      opening: `Dear ${recipientName},`,
      body: `I am highly interested in joining the engineering squad at your organization as a Senior Frontend Specialist. With a proven reputation of constructing premium user experiences using modular React components and atomic layout architectures, I offer the skills needed to make solid, long-term contributions.\n\nThank you for looking after my application. I look forward to learning how our operational values align.`,
      closing: 'Best regards,',
      signature: 'Sincerely,\n\nAhmad Khan',
      tone: 'Professional',
      design: {
        templateId: 'modern-exec',
        primaryColor: '#6C63FF',
        fontFamily: 'Inter'
      }
    };

    setCoverLetters((prev) => [newCover, ...prev]);
    addToast(`Cover letter "${name}" created!`, 'success');
    return id;
  };

  const duplicateCoverLetter = (id: string) => {
    const base = coverLetters.find((c) => c.id === id);
    if (!base) return;

    const copy: CoverLetter = {
      ...base,
      id: 'cl_' + Date.now(),
      name: `${base.name} (Copy)`,
      lastEdited: 'Edited just now'
    };

    setCoverLetters((prev) => {
      const idx = prev.findIndex((c) => c.id === id);
      const next = [...prev];
      next.splice(idx + 1, 0, copy);
      return next;
    });
    addToast(`Duplicated "${base.name}" cover letter`, 'success');
  };

  const renameCoverLetter = (id: string, newName: string) => {
    setCoverLetters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, name: newName, lastEdited: 'Edited just now' } : c))
    );
    addToast('Cover letter renamed', 'success');
  };

  const deleteCoverLetter = (id: string) => {
    const target = coverLetters.find((c) => c.id === id);
    setCoverLetters((prev) => prev.filter((c) => c.id !== id));
    if (target) {
      addToast(`Deleted "${target.name}" cover letter`, 'info');
    }
  };

  const updateCoverLetter = (id: string, updated: Partial<CoverLetter>) => {
    setCoverLetters((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, ...updated, lastEdited: 'Edited just now' }
          : c
      )
    );
  };

  // --- Jobs Tracker Actions ---
  const addJob = (job: Omit<Job, 'id' | 'date'>) => {
    const newJob: Job = {
      ...job,
      id: 'job_' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setJobs((prev) => [newJob, ...prev]);
    addToast(`Added job: "${job.title}" at ${job.company}`, 'success');
  };

  const updateJob = (id: string, updated: Partial<Job>) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === id ? { ...j, ...updated } : j))
    );
    addToast('Job application details updated', 'success');
  };

  const updateJobStatus = (id: string, status: JobStatus) => {
    setJobs((prev) =>
      prev.map((j) => {
        if (j.id === id) {
          if (j.status !== status) {
            // Trigger toast on actual column change
            addToast(`"${j.title}" moved to ${status}!`, 'info');
          }
          return { ...j, status };
        }
        return j;
      })
    );
  };

  const deleteJob = (id: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== id));
    addToast('Job application removed', 'info');
  };

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        coverLetters,
        jobs,
        toasts,
        addToast,
        removeToast,
        addResume,
        duplicateResume,
        renameResume,
        deleteResume,
        updateResume,
        addCoverLetter,
        duplicateCoverLetter,
        renameCoverLetter,
        deleteCoverLetter,
        updateCoverLetter,
        addJob,
        updateJob,
        updateJobStatus,
        deleteJob
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
