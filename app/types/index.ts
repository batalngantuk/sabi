export type Section = 'spark' | 'vault' | 'identity';

export interface SparkForm {
  budget: string;
  time: string;
  energy: string;
  useLocation?: boolean;
  latitude?: number | null;
  longitude?: number | null;
}

export interface Suggestion {

  title: string;
  description: string;
  budget: string;
  time: string;
  distance: string;
  difficulty: string;
  category: string;
}

export interface Badge {

  name: string;
  unlocked: boolean;
}

export interface Activity {

  action: string;
  time: string;
  points: string;
}
