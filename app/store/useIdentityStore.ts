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
                { name: 'Pejuang Subuh', unlocked: true },
                { name: 'Sobat Anabul', unlocked: true },
                { name: 'Warga Teladan', unlocked: false },
                { name: 'Pahlawan Lingkungan', unlocked: true },
                { name: 'Malaikat Malam', unlocked: false },
                { name: 'Tangan Diatas', unlocked: true },
                { name: 'Influencer Kebaikan', unlocked: false },
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
