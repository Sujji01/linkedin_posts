export interface Project {
  id: string;
  title: string;
  technology: string;
  role: string;
  shortDesc: string;
  fullDesc: string;
  tools: string[];
  metrics: string;
  keyHighlights: string[];
  challengesSolved: string[];
}

export interface SkillCategory {
  title: string;
  subtitle: string;
  categoryKey: 'all' | 'vlsi' | 'eda' | 'node' | 'scripting' | 'tools';
  skills: { name: string; level?: string; highlight?: boolean }[];
}

export interface TimelineItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  bulletPoints: string[];
  toolsUsed: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  year: string;
  score: string;
  scoreLabel: string;
  details?: string;
}

export interface ActivityItem {
  id: string;
  badge: string;
  title: string;
  organization: string;
  description: string;
  keyPoints: string[];
  images: {
    src: string;
    caption: string;
    alt: string;
  }[];
}

export interface FlowStep {
  stepNumber: string;
  name: string;
  description: string;
  tools: string[];
  keyInputs: string[];
  keyOutputs: string[];
  criticalChecks: string[];
}

export interface KnowledgeArea {
  tag: string;
  title: string;
  description: string;
  iconName: string;
  category: 'Stage' | 'Analysis' | 'Signoff' | 'Trade-offs';
}

export interface StatItem {
  number: string;
  label: string;
  subLabel?: string;
  accent?: 'cyan' | 'green' | 'amber';
}

export interface LinkedInPost {
  id: string;
  content: string;
  publishedDate: string;
  postUrl: string;
  mediaUrl?: string;
  likesCount?: number;
  commentsCount?: number;
  tags?: string[];
  keyHighlight?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  fullContent: string[];
  category: 'CTS' | 'STA' | 'Floorplanning' | 'Signoff' | 'Placement' | 'Scripting';
  readTime: string;
  publishedDate: string;
  tags: string[];
  keyTakeaways: string[];
  edaTools: string[];
  linkedInUrl: string;
}
