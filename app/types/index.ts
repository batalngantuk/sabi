export type Section = 'spark' | 'vault' | 'identity';

export interface SparkForm {
  budget: string;
  time: string;
  energy: string;
}

export interface Suggestion {
  emoji: string;
  title: string;
  description: string;
  budget: string;
  time: string;
  distance: string;
  difficulty: string;
  category: string;
}

export interface Badge {
  emoji: string;
  name: string;
  unlocked: boolean;
}

export interface Activity {
  emoji: string;
  action: string;
  time: string;
  points: string;
}
