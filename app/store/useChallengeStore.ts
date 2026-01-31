import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Challenge {
    id: string;
    title: string;
    description: string;
    reward: number;
    completed: boolean;
    type: 'post' | 'category' | 'streak';
}

interface ChallengeState {
    challenges: Challenge[];
    lastRefresh: string;
    generateDailyChallenges: () => void;
    completeChallenge: (id: string) => void;
}

const challengeTemplates = [
    { type: 'post' as const, title: 'Posting Kebaikan', description: 'Posting 1 kebaikan hari ini', reward: 100 },
    { type: 'category' as const, title: 'Sahabat Hewan', description: 'Bantu hewan hari ini', reward: 150 },
    { type: 'category' as const, title: 'Peduli Lingkungan', description: 'Aksi ramah lingkungan hari ini', reward: 150 },
    { type: 'streak' as const, title: 'Konsisten!', description: 'Pertahankan streak 7 hari', reward: 200 },
    { type: 'post' as const, title: 'Berbagi Cerita', description: 'Upload foto kebaikanmu', reward: 120 },
];

const getRandomChallenges = (): Challenge[] => {
    const shuffled = [...challengeTemplates].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3).map((template, index) => ({
        id: `challenge-${Date.now()}-${index}`,
        title: template.title,
        description: template.description,
        reward: template.reward,
        completed: false,
        type: template.type
    }));
};

export const useChallengeStore = create<ChallengeState>()(
    persist(
        (set, get) => ({
            challenges: getRandomChallenges(),
            lastRefresh: new Date().toDateString(),
            generateDailyChallenges: () => {
                const today = new Date().toDateString();
                const { lastRefresh } = get();

                // Only refresh if it's a new day
                if (today !== lastRefresh) {
                    set({
                        challenges: getRandomChallenges(),
                        lastRefresh: today
                    });
                }
            },
            completeChallenge: (id) => set((state) => ({
                challenges: state.challenges.map(c =>
                    c.id === id ? { ...c, completed: true } : c
                )
            }))
        }),
        {
            name: 'challenge-storage',
        }
    )
);
