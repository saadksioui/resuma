export interface Experience {
  id: string;
  resumeId: string; // FK to resume
  job_title: string;
  company: string;
  start_date: string; // ISO Date string
  end_date: string | null; // nullable for "Present"
  description: string;
}

export interface Education {
  id: string;
  resumeId: string; // FK to resume
  degree: string;
  institution: string;
  start_date: string;
  end_date: string;
  notes: string;
}

export interface SocialLink {
  id: string;
  resumeId: string; // FK to resume
  type: string; // e.g., "LinkedIn", "GitHub"
  url: string;
}

export interface ResumeData {
  id: string;
  userId: string; // FK to Supabase auth.users
  slug: string;
  full_name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  city: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  experience: Experience[];
  education: Education[];
  socialLinks: SocialLink[];
}


export type ResumeTheme = 'light' | 'dark';