export interface UltravoxResponse {
  // Keep raw response from Ultravox SDK
  [key: string]: any;
}

export interface CareerData {
  targetRole: string;
  selectedTrack: string;
  totalXP: number;
  currentXP: number;
  currentLevel: number;
  levels: Level[];
}

export interface Level {
  id: number;
  title: string;
  xpRequired: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  xp: number;
  isCompleted: boolean;
  type: 'video' | 'article' | 'project';
  description: string;
  resources: string[];
}

export interface AnalysisResponse {
  track: 'Game Design' | 'Content Creation' | 'Game Asset Artist';
  reason: string;
}

export type TrackType = 'Game Design' | 'Content Creation' | 'Game Asset Artist';

export interface User {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
}
