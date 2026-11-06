export type TemplateId =
  | 'modern-professional'
  | 'classic-corporate'
  | 'minimalist'
  | 'creative'
  | 'executive'
  | 'academic'
  | 'student-cv'
  | 'fresh-graduate'
  | 'experienced-pro'
  | 'ats-friendly'
  | 'international'
  | 'elegant-pro';

export type FontFamily = 'Inter' | 'Merriweather' | 'Roboto' | 'Playfair Display' | 'Montserrat' | 'Fira Code' | 'Outfit';

export type PaperSize = 'a4' | 'letter';

export type SpacingSize = 'compact' | 'normal' | 'spacious';

export type PhotoShape = 'circle' | 'square' | 'rounded';

export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
  linkedin: string;
  website: string;
  dateOfBirth?: string;
  nationality?: string;
  photoUrl?: string;
  photoShape: PhotoShape;
  showPhoto: boolean;
}

export interface WorkExperience {
  id: string;
  company: string;
  jobTitle: string;
  employmentType: string; // Full-time, Part-time, Contract, Remote, Freelance
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string;
  keyAchievements?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  major: string;
  startYear: string;
  graduationYear: string;
  gpa?: string;
  additionalInfo?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'technical' | 'soft' | 'tool' | 'language';
  proficiency: number; // 1 to 5
  levelLabel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string;
  url?: string;
  role?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';
}

export interface AwardItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description?: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  company: string;
  jobTitle: string;
  email: string;
  phone?: string;
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description: string;
}

export interface CustomSection {
  id: string;
  heading: string;
  items: CustomSectionItem[];
}

export type SectionKey =
  | 'summary'
  | 'experience'
  | 'education'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'languages'
  | 'awards'
  | 'references'
  | 'custom';

export interface CVData {
  personalInfo: PersonalInfo;
  summary: string;
  experiences: WorkExperience[];
  education: Education[];
  skills: SkillItem[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
  awards: AwardItem[];
  references: ReferenceItem[];
  customSections: CustomSection[];
  sectionOrder: SectionKey[];
}

export interface CVCustomization {
  templateId: TemplateId;
  fontFamily: FontFamily;
  fontSize: 'sm' | 'md' | 'lg';
  primaryColor: string;
  accentColor: string;
  sectionSpacing: SpacingSize;
  paperSize: PaperSize;
  textAlign: 'left' | 'justify';
}

export interface SavedCV {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
  data: CVData;
  customization: CVCustomization;
  isFavorite?: boolean;
}

export interface UserAccount {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  plan: 'Free' | 'Pro Monthly' | 'Pro Annual';
  role: 'user' | 'admin';
  createdAt: string;
}

export interface TemplateMeta {
  id: TemplateId;
  name: string;
  category: string;
  description: string;
  isPremium: boolean;
  colorPreset: {
    primary: string;
    accent: string;
  };
  fontPreset: FontFamily;
  thumbnailBadge: string;
}
