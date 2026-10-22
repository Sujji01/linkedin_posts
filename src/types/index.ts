export interface ProjectPPA {
  timing: string;
  wirelength: string;
  drcLvs: string;
  areaUtilization?: string;
  skewTarget?: string;
}

export interface Project {
  id: string;
  title: string;
  technology: string;
  role: string;
  category?: 'processor' | 'soc' | 'fpu' | 'network' | 'all';
  shortDesc: string;
  fullDesc: string;
  tools: string[];
  metrics: string;
  ppa?: ProjectPPA;
  stagesCompleted?: string[];
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

export interface FlowStepDeepDive {
  concepts?: { title: string; points: string[] }[];
  equations?: { name: string; formula: string; note?: string }[];
  debuggingPatterns?: { problem: string; symptom: string; verify: string; fix: string }[];
  commonMistakes?: string[];
  visualType?: 'logic' | 'floorplan' | 'cts' | 'routing' | 'signoff' | 'tools';
  edaComparison?: { role: string; synopsys: string; cadence: string; notes?: string }[];
  auditChecklist?: string[];
  deliverablesSummary?: string;
  pdkImpact?: string[];
  reportExample?: { title: string; content: string; commentary: string };
}

export interface VlsiToolRole {
  category: string;
  synopsys: string;
  cadence: string;
  siemens?: string;
  openSource?: string;
  notes?: string;
}

export interface VlsiFileFormat {
  extension: string;
  name: string;
  purpose: string;
  stageProduced: string;
}

export interface StageDependencyLoop {
  stagePair: string;
  cause: string;
  impact: string;
}

export interface FlowStep {
  stepNumber: string;
  name: string;
  description: string;
  tools: string[];
  keyInputs: string[];
  keyOutputs: string[];
  criticalChecks: string[];
  tclCommands?: string[];
  interviewTip?: string;
  deepDive?: FlowStepDeepDive;
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
