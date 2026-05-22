export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  website: string;
  linkedIn: string;
  gitHub: string;
  summary: string;
  avatarUrl?: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string; // Bullet points as multiline text
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1 to 5 dots
}

export interface Project {
  id: string;
  title: string;
  role: string;
  link: string;
  description: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  description: string;
}

export interface CustomSection {
  id: string;
  name: string;
  items: CustomSectionItem[];
  visible: boolean;
}

export interface ResumeDesign {
  templateId: string;
  primaryColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
  spacing: 'compact' | 'normal' | 'spacious';
  pageSize: 'A4' | 'Letter';
}

export interface Resume {
  id: string;
  name: string;
  lastEdited: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  customSections: CustomSection[];
  design: ResumeDesign;
}

export interface CoverLetter {
  id: string;
  name: string;
  lastEdited: string;
  personalInfo: PersonalInfo;
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  recipientAddress: string;
  date: string;
  subject: string;
  opening: string;
  body: string;
  closing: string;
  signature: string;
  tone: 'Professional' | 'Friendly' | 'Confident';
  design: {
    templateId: string;
    primaryColor: string;
    fontFamily: string;
  };
}
