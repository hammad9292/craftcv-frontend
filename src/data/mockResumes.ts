import { Resume, CoverLetter } from '../types/resume';

export const MOCK_USER = {
  fullName: 'Ahmad Khan',
  jobTitle: 'Senior Frontend Developer',
  email: 'ahmad@example.com',
  phone: '+92 300 1234567',
  city: 'Islamabad',
  country: 'Pakistan',
  website: 'https://ahmadkhan.dev',
  linkedIn: 'https://linkedin.com/in/ahmadkhan',
  gitHub: 'https://github.com/ahmadkhan',
  summary: 'Skilled Senior Frontend Developer with 5+ years of experience specializing in building production-ready modular React and TypeScript web applications. Demonstrated capability in engineering robust design systems, boosting site performance by 40%, and guiding agile software teams to deliver scalable enterprise products.',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
};

export const INITIAL_RESUMES: Resume[] = [
  {
    id: 'resume-1',
    name: 'Software Engineer Resume',
    lastEdited: 'Edited 2 days ago',
    personalInfo: { ...MOCK_USER },
    workExperience: [
      {
        id: 'work-1',
        jobTitle: 'Senior Frontend Developer',
        company: 'Google',
        startDate: 'Jan 2023',
        endDate: 'Present',
        current: true,
        description: '• Spearheaded architectural updates to the main cloud dashboard, enhancing state hydration and UI response rate by 30%.\n• Collaborated with core design engineering squads to construct and deliver highly accessible Tailwind-based theme libraries.\n• Mentored 8 junior and mid-level software contributors, instating strict typing structures and solid CI/CD workflows.'
      },
      {
        id: 'work-2',
        jobTitle: 'React Developer',
        company: 'Startup XYZ',
        startDate: 'Mar 2021',
        endDate: 'Dec 2022',
        current: false,
        description: '• Converted legacy client layouts into lightning-fast React SPA networks, raising user session length by 22%.\n• Designed modular form processors integrated with custom validation chains and dynamic client-side caching solutions.\n• Maintained 100% test coverage across core state management routines and authentication hooks.'
      }
    ],
    education: [
      {
        id: 'edu-1',
        degree: 'BS Computer Science',
        school: 'FAST University',
        startDate: 'Sep 2017',
        endDate: 'Jul 2021',
        details: 'Graduated with Magna Cum Laude honors (3.82 CGPA). President of the Software Engineering Club.'
      }
    ],
    skills: [
      { id: 'skill-1', name: 'React', level: 5 },
      { id: 'skill-2', name: 'TypeScript', level: 5 },
      { id: 'skill-3', name: 'Node.js', level: 4 },
      { id: 'skill-4', name: 'Python', level: 3 },
      { id: 'skill-5', name: 'CSS', level: 4 }
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Core Design Engine',
        role: 'Lead Architect',
        link: 'https://github.com/ahmadkhan/core-design',
        description: 'Built an open-source headless UI library drawing 5k+ GitHub stars, prioritizing modularity and native container support.'
      }
    ],
    customSections: [],
    design: {
      templateId: 'modern-exec',
      primaryColor: '#6C63FF',
      fontFamily: 'Inter',
      fontSize: 'medium',
      spacing: 'normal',
      pageSize: 'A4'
    }
  },
  {
    id: 'resume-2',
    name: 'Cloud Engineer CV',
    lastEdited: 'Edited 1 week ago',
    personalInfo: {
      ...MOCK_USER,
      jobTitle: 'Cloud Application Specialist',
    },
    workExperience: [
      {
        id: 'work-3',
        jobTitle: 'Cloud Solutions Engineer',
        company: 'Google Cloud Platform',
        startDate: 'May 2022',
        endDate: 'Present',
        current: true,
        description: '• Implemented secure multi-tenant microfrontends across production clusters, cutting latency metrics below 80ms.\n• Scaled serverless endpoints to process 15M weekly customer checkouts safely.'
      }
    ],
    education: [
      {
        id: 'edu-2',
        degree: 'BS Computer Science',
        school: 'FAST University',
        startDate: '2017',
        endDate: '2021',
        details: 'Specialization in Distributed Systems.'
      }
    ],
    skills: [
      { id: 'skill-c1', name: 'React', level: 5 },
      { id: 'skill-c2', name: 'AWS/GCP', level: 4 },
      { id: 'skill-c3', name: 'Docker', level: 4 }
    ],
    projects: [],
    customSections: [],
    design: {
      templateId: 'dev-stack',
      primaryColor: '#00D2FF',
      fontFamily: 'Inter',
      fontSize: 'small',
      spacing: 'compact',
      pageSize: 'A4'
    }
  },
  {
    id: 'resume-3',
    name: 'Consultant Technical Resume',
    lastEdited: 'Edited 3 weeks ago',
    personalInfo: {
      ...MOCK_USER,
      jobTitle: 'Lead Technology Consultant',
    },
    workExperience: [],
    education: [],
    skills: [],
    projects: [],
    customSections: [],
    design: {
      templateId: 'corporate-leader',
      primaryColor: '#4F46E5',
      fontFamily: 'Inter',
      fontSize: 'large',
      spacing: 'spacious',
      pageSize: 'Letter'
    }
  }
];

export const INITIAL_COVER_LETTERS: CoverLetter[] = [
  {
    id: 'cl-1',
    name: 'Google Cover Letter',
    lastEdited: 'Edited 1 day ago',
    personalInfo: { ...MOCK_USER },
    recipientName: 'Hiring Team',
    recipientTitle: 'Manager, Engineering Recruiting',
    companyName: 'Google LLC',
    recipientAddress: '1600 Amphitheatre Parkway, Mountain View, CA',
    date: 'May 22, 2026',
    subject: 'Application for Senior Frontend Developer position',
    opening: 'Dear Hiring Team,',
    body: 'I am writing to express my strong interest in the Senior Frontend Developer position currently open at Google. With over five years of focused engineering experience building complex single-page applications and responsive frameworks, I am eager to bring my capabilities to your legendary frontend teams.\n\nThroughout my career, I have dedicated myself to crafting interfaces that are not only visually premium but also highly performant and solid on the backend. At Startup XYZ, I succeeded in transforming our core layouts into high-efficiency components, boosting user session duration significantly. I am confident that my passion for elegant, clean software and design system consistency will align directly with the standard of excellence Google is known for.',
    closing: 'Thank you for your time and consideration. I would be thrilled to discuss how my qualifications map to your goals in an upcoming dialogue.',
    signature: 'Sincerely,\n\nAhmad Khan',
    tone: 'Professional',
    design: {
      templateId: 'modern-exec',
      primaryColor: '#6C63FF',
      fontFamily: 'Inter'
    }
  }
];
