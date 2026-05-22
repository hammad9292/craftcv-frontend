import { Job } from '../types/job';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Frontend Developer',
    company: 'Google',
    url: 'https://careers.google.com',
    location: 'Mountain View, CA (Hybrid)',
    workType: 'Hybrid',
    salary: '$135k - $160k',
    status: 'Applied',
    date: '2026-05-20',
    notes: 'Inquired through referral. Recruiter reached out, pending confirmation of initial phone screen.',
    resumeId: 'resume-1'
  },
  {
    id: 'job-2',
    title: 'React Engineer',
    company: 'Meta',
    url: 'https://metacareers.com',
    location: 'Menlo Park, CA (Remote)',
    workType: 'Remote',
    salary: '$150k - $175k',
    status: 'Interview',
    date: '2026-05-18',
    notes: 'Technical screening completed. Scheduled for virtual onsite with 3 panel sessions focusing on system design and coding.',
    resumeId: 'resume-1'
  },
  {
    id: 'job-3',
    title: 'UI Developer',
    company: 'Stripe',
    url: 'https://stripe.com/jobs',
    location: 'Seattle, WA (Remote)',
    workType: 'Remote',
    salary: '$140k - $165k',
    status: 'Wishlist',
    date: '2026-05-21',
    notes: 'Spoke with developer advocate at React Conf. Positions open for Design Systems squad.',
    resumeId: 'resume-1'
  },
  {
    id: 'job-4',
    title: 'Software Engineer',
    company: 'Netflix',
    url: 'https://jobs.netflix.com',
    location: 'Los Gatos, CA (On-site)',
    workType: 'On-site',
    salary: '$200k - $240k',
    status: 'Offer',
    date: '2026-05-15',
    notes: 'Verbal offer received from director. Written proposal expected by tomorrow morning with details on stock options.',
    resumeId: 'resume-2'
  },
  {
    id: 'job-5',
    title: 'Web Developer',
    company: 'Agency X',
    url: 'https://agencyx.com',
    location: 'New York, NY (Remote)',
    workType: 'Remote',
    salary: '$95k - $110k',
    status: 'Rejected',
    date: '2026-05-10',
    notes: 'Applied on indeed. Position was placed on hold indefinitely due to project structural adjustments.'
  }
];
