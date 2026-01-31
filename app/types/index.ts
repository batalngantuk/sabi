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

export interface CompletedAct {
  id: string;
  title: string;
  story: string;
  category: string;
  timestamp: string;
  likes: number;
  comments: number;
  image?: string;
  user?: string;
}

export interface Reward {
  id: string;
  name: string;
  cost: number;
  type: 'pulsa' | 'voucher' | 'donation';
}
