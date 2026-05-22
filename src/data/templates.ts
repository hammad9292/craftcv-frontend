export interface ResumeTemplate {
  id: string;
  name: string;
  category: 'Simple' | 'Modern' | 'Creative' | 'Professional' | 'ATS-Friendly' | 'Two-Column';
  imageUrl: string;
}

export const RESUME_TEMPLATES: ResumeTemplate[] = [
  {
    id: 'modern-exec',
    name: 'The Modern Exec',
    category: 'Professional',
    imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'studio-designer',
    name: 'The Studio Designer',
    category: 'Creative',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'dev-stack',
    name: 'The Dev Stack',
    category: 'ATS-Friendly',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'corporate-leader',
    name: 'Corporate Leader',
    category: 'Two-Column',
    imageUrl: 'https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'junior-entry',
    name: 'The Junior Entry',
    category: 'Simple',
    imageUrl: 'https://images.unsplash.com/photo-1586282391129-76a6df230234?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'creative-lead',
    name: 'The Creative Lead',
    category: 'Creative',
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'minimalist',
    name: 'The Minimalist',
    category: 'Simple',
    imageUrl: 'https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'project-master',
    name: 'The Project Master',
    category: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'global-director',
    name: 'Global Director',
    category: 'Professional',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'zenith',
    name: 'Zenith',
    category: 'Modern',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'bold-fresh',
    name: 'Bold Fresh',
    category: 'Creative',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'c-suite-elite',
    name: 'C-Suite Elite',
    category: 'Two-Column',
    imageUrl: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=300&auto=format&fit=crop&q=80'
  }
];
