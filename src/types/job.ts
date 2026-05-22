export type JobStatus = 'Wishlist' | 'Applied' | 'Interview' | 'Offer' | 'Rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  url: string;
  location: string; // e.g. "Remote", "Hybrid", "San Francisco"
  workType: 'Remote' | 'Hybrid' | 'On-site';
  salary: string; // e.g. "$120k - $140k"
  status: JobStatus;
  date: string; // Date of application/action
  deadline?: string;
  notes?: string;
  resumeId?: string; // Links to a resume
}
