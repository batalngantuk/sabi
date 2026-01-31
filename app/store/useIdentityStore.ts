import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Badge, Activity } from '../types';

interface IdentityState {
    points: number;
    lifetimeScore: number;
    streak: number;
    badges: Badge[];
    activities: Activity[];
    addPoints: (amount: number) => void;
    addActivity: (activity: Activity) => void;
    unlockBadge: (name: string) => void;
    redeemReward: (cost: number) => void;
}

export const useIdentityStore = create<IdentityState>()(
    persist(
        (set) => ({
            points: 750, // Spendable points
            lifetimeScore: 750, // Total accumulated score
            streak: 12,
            badges: [
                { name: 'Pejuang Subuh', unlocked: true, progress: 100, requirement: '5 posts pagi hari' },
                { name: 'Sobat Anabul', unlocked: true, progress: 100, requirement: '5 posts tentang hewan' },
                { name: 'Warga Teladan', unlocked: false, progress: 60, requirement: '10 posts kebaikan' },
                { name: 'Pahlawan Lingkungan', unlocked: true, progress: 100, requirement: '5 posts lingkungan' },
                { name: 'Malaikat Malam', unlocked: false, progress: 40, requirement: '5 posts malam hari' },
                { name: 'Tangan Diatas', unlocked: true, progress: 100, requirement: '3 donasi' },
                { name: 'Influencer Kebaikan', unlocked: false, progress: 75, requirement: '20 shares' },
            ],
            activities: [
                { action: 'Memberi roti ke petugas parkir', time: '2 jam lalu', points: '+50' },
                { action: 'Memberi makan kucing jalanan', time: '1 hari lalu', points: '+30' },
                { action: 'Memungut sampah di taman', time: '2 hari lalu', points: '+20' },
            ],
            addPoints: (amount) => set((state) => ({
                points: state.points + amount,
                lifetimeScore: state.lifetimeScore + amount
            })),
            addActivity: (activity) => set((state) => ({
                activities: [activity, ...state.activities]
            })),
            unlockBadge: (name) => set((state) => ({
                badges: state.badges.map(b => b.name === name ? { ...b, unlocked: true } : b)
            })),
            redeemReward: (cost) => set((state) => {
                if (state.points >= cost) {
                    return { points: state.points - cost };
                }
                return state;
            })
        }),
        {
            name: 'identity-storage',
        }
    )
);
