'use client';

import { useIdentityStore } from '../store/useIdentityStore';
import {
    Flame, Star, Award, History,
    Sun, PawPrint, Shield, Leaf, Moon,
    Gift, Utensils, Trash2
} from 'lucide-react';

export default function Identity() {
    const { points, streak, lifetimeScore, badges, activities } = useIdentityStore();

    const getBadgeIcon = (name: string) => {
        switch (name) {
            case 'Morning Angel': return <Sun className="w-8 h-8" />;
            case 'Animal Savior': return <PawPrint className="w-8 h-8" />;
            case 'Street Hero': return <Shield className="w-8 h-8" />;
            case 'Green Warrior': return <Leaf className="w-8 h-8" />;
            case 'Midnight Kindness': return <Moon className="w-8 h-8" />;
            default: return <Award className="w-8 h-8" />;
        }
    };

    const getActivityIcon = (action: string) => {
        if (action.includes('roti') || action.includes('makan')) return <Utensils className="w-6 h-6" />;
        if (action.includes('kucing') || action.includes('anjing')) return <PawPrint className="w-6 h-6" />;
        if (action.includes('sampah')) return <Trash2 className="w-6 h-6" />;
        return <Gift className="w-6 h-6" />;
    };

    return (
        <section className="max-w-4xl mx-auto px-6 pb-20">
            {/* Wallet / Points Balance - Prominent at Top */}
            <div className="glass-effect rounded-3xl p-6 mb-6 flex items-center justify-between bg-gradient-to-r from-[var(--bg-orange-50)] to-white border border-[var(--primary-orange)]">
                <div>
                    <p className="text-sm text-[var(--text-tertiary)] font-bold uppercase mb-1">Dompet Kebaikan</p>
                    <div className="flex items-baseline gap-2">
                        <h2 className="text-4xl font-bold text-[var(--primary-orange)]">{points}</h2>
                        <span className="text-[var(--text-secondary)] font-bold">Poin</span>
                    </div>
                </div>
                <div className="p-3 bg-[var(--primary-orange)] rounded-full text-white shadow-lg shadow-orange-200">
                    <Gift className="w-8 h-8" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Kindness Score */}
                <div className="glass-effect rounded-3xl p-8 text-center">
                    <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)] flex items-center justify-center gap-2">
                        <Star className="w-5 h-5 text-[var(--primary-orange)]" />
                        Kindness Score
                    </h3>
                    <div className="relative w-40 h-40 mx-auto mb-4">
                        <svg className="transform -rotate-90 w-40 h-40">
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="var(--bg-cream-dark)"
                                strokeWidth="12"
                                fill="none"
                            />
                            <circle
                                cx="80"
                                cy="80"
                                r="70"
                                stroke="url(#gradient)"
                                strokeWidth="12"
                                fill="none"
                                strokeDasharray={`${(lifetimeScore / 1000) * 440} 440`}
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="var(--primary-orange)" />
                                    <stop offset="100%" stopColor="var(--primary-amber)" />
                                </linearGradient>
                            </defs>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl font-bold text-gradient">{lifetimeScore}</span>
                        </div>
                    </div>
                    <p className="text-sm text-[var(--text-tertiary)]">
                        Konsistensi: 85% • Variasi: 70% • Dampak: 80%
                    </p>
                </div>

                {/* Streak Counter */}
                <div className="glass-effect rounded-3xl p-8 text-center">
                    <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)] flex items-center justify-center gap-2">
                        <Flame className="w-5 h-5 text-[var(--primary-orange)]" />
                        Streak
                    </h3>
                    <div className="mb-4 flex justify-center">
                        <Flame className="w-20 h-20 text-[var(--primary-orange)] fill-[var(--primary-orange)]" />
                    </div>
                    <p className="text-5xl font-bold text-gradient mb-2">{streak}</p>
                    <p className="text-lg text-[var(--text-secondary)] font-bold">
                        Hari Non-stop!
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)] mt-2">
                        Keren abis! Pertahanin terus!
                    </p>
                </div>
            </div>

            {/* Badges */}
            <div className="glass-effect rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                    <Award className="w-6 h-6 text-[var(--primary-orange)]" />
                    Koleksi Badges
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className={`text-center p-4 rounded-2xl transition-all duration-300 ${badge.unlocked
                                ? 'bg-gradient-to-br from-[var(--bg-orange-50)] to-[var(--bg-rose-50)] hover:scale-110 cursor-pointer'
                                : 'bg-gray-200 opacity-40 blur-sm'
                                }`}
                        >
                            <div className="mb-2 flex justify-center text-[var(--primary-orange)]">
                                {getBadgeIcon(badge.name)}
                            </div>
                            <p className="text-xs font-bold text-[var(--text-primary)]">
                                {badge.name}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-[var(--text-tertiary)]">
                        Udah dapet {badges.filter(b => b.unlocked).length} dari {badges.length} badges kece! • Gas lengkapi semua!
                    </p>
                </div>
            </div>

            {/* Rewards Redemption */}
            <div className="glass-effect rounded-3xl p-8 mt-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                        <Gift className="w-6 h-6 text-[var(--primary-orange)]" />
                        Tukar Poin Kebaikan
                    </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { id: '1', name: 'Nasi Jumat Berkah', cost: 750, type: 'donation' },
                        { id: '2', name: 'Street Feeding Kucing', cost: 500, type: 'donation' },
                        { id: '3', name: 'Donasi Panti Asuhan', cost: 1000, type: 'donation' },
                        { id: '4', name: 'Tanam 1 Pohon', cost: 2000, type: 'donation' },
                    ].map((reward) => (
                        <div key={reward.id} className="bg-white/50 p-4 rounded-xl flex flex-col justify-between hover:shadow-md transition-all duration-300">
                            <div className="mb-2">
                                <h4 className="font-bold text-[var(--text-primary)]">{reward.name}</h4>
                                <p className="text-xs text-[var(--text-tertiary)] uppercase tracking-wider">{reward.type}</p>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                                <span className="text-[var(--primary-orange)] font-bold">{reward.cost} Poin</span>
                                <button
                                    onClick={() => {
                                        if (points >= reward.cost) {
                                            const { redeemReward } = useIdentityStore.getState();
                                            redeemReward(reward.cost);
                                            alert(`Berhasil menukar ${reward.name}!`);
                                        } else {
                                            alert('Poin belum cukup, semangat nabung kebaikan lagi!');
                                        }
                                    }}
                                    disabled={points < reward.cost}
                                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${points >= reward.cost
                                        ? 'bg-[var(--primary-orange)] text-white hover:bg-orange-600'
                                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    Tukar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Recent Activities */}
            <div className="glass-effect rounded-3xl p-8 mt-6">
                <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                    <History className="w-6 h-6 text-[var(--primary-orange)]" />
                    Jejak Kebaikan
                </h3>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/50 hover:bg-white transition-all duration-300"
                        >
                            <div className="p-2 rounded-full bg-[var(--bg-orange-50)] text-[var(--primary-orange)]">
                                {getActivityIcon(activity.action)}
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-[var(--text-primary)]">{activity.action}</p>
                                <p className="text-sm text-[var(--text-tertiary)]">{activity.time}</p>
                            </div>
                            <div className="text-xl font-bold text-gradient">{activity.points}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
