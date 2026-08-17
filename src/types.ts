export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photoUrl?: string;
  summary: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  grade: string;
  highlights?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  link: string;
  technologies: string[];
  description: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface LanguageItem {
  name: string;
  proficiency: string;
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

export interface ManualWorkItem {
  id: string;
  title: string;
  link: string;
}

export interface AutomationWorkItem {
  id: string;
  category?: string;
  projectName: string;
  link: string;
}

export interface TrainingItem {
  id: string;
  courseTitle: string;
  duration: string;
  organization: string;
  linkText?: string;
  linkUrl?: string;
}

export interface ExtraActivityItem {
  id: string;
  projectName: string;
  link: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  designation: string;
  companyLocation: string;
  email: string;
  phone?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: SkillCategory[];
  manualWorks?: ManualWorkItem[];
  automationWorks?: AutomationWorkItem[];
  trainings?: TrainingItem[];
  extraActivities?: ExtraActivityItem[];
  references?: ReferenceItem[];
  languages: LanguageItem[];
  interests?: string[];
  projects?: Project[];
  certifications?: Certification[];
  customSections?: CustomSection[];
}

export type TemplateId = 
  | 'modern-sidebar' 
  | 'minimal-tech' 
  | 'executive-classic' 
  | 'creative-modern' 
  | 'compact-fresher'
  | 'infographic-pro'
  | 'berlin-modern'
  | 'technical-sqa'
  | 'graphical-banner'
  | 'graphical-modern-grid'
  | 'designer-portfolio'
  // 20 Brand New Graphical & Modern Templates
  | 'cyber-matrix'
  | 'swiss-editorial'
  | 'nordic-clean'
  | 'executive-corporate-split'
  | 'developer-terminal'
  | 'tokyo-neo'
  | 'california-sunny'
  | 'london-fintech'
  | 'architect-blueprint'
  | 'silicon-minimal'
  | 'aurora-glass'
  | 'magazine-pro'
  | 'metro-card'
  | 'hybrid-timeline'
  | 'monochrome-bold'
  | 'quantum-tech'
  | 'crest-luxury'
  | 'portfolio-showcase'
  | 'qa-audit-matrix'
  | 'horizon-modern';

export type ColorTheme = 
  // Classic & Standard
  | 'navy' 
  | 'sapphire'
  | 'corporate'
  | 'ocean'
  | 'slate' 
  | 'steel'
  | 'midnight'
  | 'charcoal' 
  | 'emerald' 
  | 'forest'
  | 'olive'
  | 'teal' 
  | 'cyan'
  | 'indigo' 
  | 'violet'
  | 'plum'
  | 'crimson' 
  | 'ruby'
  | 'burgundy'
  | 'rose'
  | 'copper'
  | 'amber'
  | 'bronze'
  | 'espresso'
  // 🎨 Vibrant & Neon Graphical
  | 'cyber-neon'
  | 'electric-violet'
  | 'sunset-horizon'
  | 'aurora-glow'
  | 'synthwave'
  | 'cyberpunk'
  | 'miami-vice'
  | 'tropical-lagoon'
  | 'coral-reef'
  | 'dragon-fruit'
  | 'solar-flare'
  | 'cosmic-nebula'
  | 'mint-frost'
  | 'laser-pink'
  | 'toxic-lime'
  | 'electric-amber'
  | 'hyper-cobalt'
  | 'acid-yellow'
  | 'neon-orchid'
  | 'prism-rainbow'
  // 💼 Tech Brands & Modern SaaS
  | 'silicon-navy'
  | 'stripe-blurple'
  | 'linear-slate'
  | 'meta-blue'
  | 'azure-cloud'
  | 'google-blue'
  | 'vercel-mono'
  | 'cloudflare-flame'
  | 'docker-whale'
  | 'spotify-green'
  | 'github-dark'
  | 'figma-purple'
  | 'discord-blurple'
  | 'notion-neutral'
  | 'slack-aubergine'
  | 'supabase-green'
  | 'openai-slate'
  | 'uber-black'
  // 💎 Luxury & Dark Executive
  | 'obsidian-gold'
  | 'royal-champagne'
  | 'platinum-onyx'
  | 'velvet-bordeaux'
  | 'midnight-emerald'
  | 'imperial-bronze'
  | 'titanium-smoke'
  | 'caviar-black'
  | 'black-pearl'
  | 'deep-damson'
  | 'sovereign-gold'
  | 'vintage-cognac'
  | 'royal-amethyst'
  | 'monarch-navy'
  | 'executive-graphite'
  | 'crown-ruby'
  // 🌿 Nature, Botanical & Earth
  | 'nordic-forest'
  | 'deep-pine'
  | 'sage-botanical'
  | 'matcha-green'
  | 'eucalyptus'
  | 'moss-valley'
  | 'sedona-terracotta'
  | 'desert-dune'
  | 'bamboo-shoot'
  | 'canyon-clay'
  | 'cedar-bark'
  | 'willow-herb'
  | 'rosemary-leaf'
  | 'highland-heather'
  | 'tuscan-olive'
  | 'aloe-mint'
  // 🔮 Creative & Design Studio
  | 'fuchsia-studio'
  | 'lavender-mist'
  | 'radiant-magenta'
  | 'electric-amethyst'
  | 'mauve-modern'
  | 'lilac-bloom'
  | 'boysenberry'
  | 'mulberry-rich'
  | 'purple-haze'
  | 'iris-blue'
  | 'orchid-dream'
  | 'royal-sangria'
  | 'wild-berry'
  | 'violet-dusk'
  | 'grape-spark'
  | 'pastel-plum'
  // 🌅 Warm Sunset, Spice & Terracotta
  | 'terracotta-sun'
  | 'paprika-bold'
  | 'saffron-gold'
  | 'rust-heritage'
  | 'burnt-sienna'
  | 'desert-rose'
  | 'warm-ochre'
  | 'blood-orange'
  | 'crimson-berry'
  | 'cherry-mahogany'
  | 'cinnamon-glow'
  | 'lava-red'
  | 'apricot-sorbet'
  | 'honey-amber'
  | 'persimmon-warm'
  | 'garnet-red'
  // 🌊 Oceanic, Coastal & Nordic
  | 'arctic-blue'
  | 'deep-mariana'
  | 'baltic-sea'
  | 'nordic-teal'
  | 'aegean-blue'
  | 'caribbean-turquoise'
  | 'pacific-navy'
  | 'glacial-ice'
  | 'deep-sea'
  | 'coral-blue'
  | 'mediterranean-wave'
  | 'fjord-mist'
  // 🧪 DevOps, QA & Hacker Themes
  | 'terminal-matrix'
  | 'bug-tracker-red'
  | 'selenium-teal'
  | 'cypress-emerald'
  | 'postman-orange'
  | 'jira-blueprint'
  | 'grafana-amber'
  | 'kibana-rose'
  | 'jenkins-rust'
  | 'git-branch-blue';

export type FontFamily = 'sans' | 'serif' | 'mono';
export type FontSize = 'sm' | 'md' | 'lg';
export type SpacingDensity = 'compact' | 'normal' | 'spacious';

export interface StyleConfig {
  template: TemplateId;
  colorTheme: ColorTheme;
  fontFamily: FontFamily;
  fontSize: FontSize;
  density: SpacingDensity;
  showPhoto: boolean;
}

export type UILanguage = 'en' | 'bn';

export type ActiveTab = 'content' | 'design' | 'preview';
export type FormSection = 
  | 'personal' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'manualWorks' 
  | 'automationWorks' 
  | 'training' 
  | 'extraActivities' 
  | 'references' 
  | 'projects' 
  | 'certifications' 
  | 'languages';

export const defaultStyleConfig: StyleConfig = {
  template: 'executive-classic',
  colorTheme: 'corporate',
  fontFamily: 'sans',
  fontSize: 'md',
  density: 'normal',
  showPhoto: false,
};
