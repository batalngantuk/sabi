'use client';

import { Badge, Activity } from '../types';

export default function Identity() {
    // Mock badges
    const badges: Badge[] = [
        { emoji: '🌅', name: 'Morning Angel', unlocked: true },
        { emoji: '🐾', name: 'Animal Savior', unlocked: true },
        { emoji: '🦸', name: 'Street Hero', unlocked: false },
        { emoji: '🌱', name: 'Green Warrior', unlocked: true },
        { emoji: '🌙', name: 'Midnight Kindness', unlocked: false },
    ];

    const activities: Activity[] = [
        { emoji: '🍞', action: 'Memberi roti ke petugas parkir', time: '2 jam lalu', points: '+50' },
        { emoji: '🐕', action: 'Memberi makan kucing jalanan', time: '1 hari lalu', points: '+30' },
        { emoji: '🌱', action: 'Memungut sampah di taman', time: '2 hari lalu', points: '+20' },
    ];

    return (
        <section className="max-w-4xl mx-auto px-6 pb-20">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Kindness Score */}
                <div className="glass-effect rounded-3xl p-8 text-center">
                    <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">
                        ⭐ Kindness Score
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
                                strokeDasharray={`${(750 / 1000) * 440} 440`}
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
                            <span className="text-4xl font-bold text-gradient">750</span>
                        </div>
                    </div>
                    <p className="text-sm text-[var(--text-tertiary)]">
                        Konsistensi: 85% • Variasi: 70% • Dampak: 80%
                    </p>
                </div>

                {/* Streak Counter */}
                <div className="glass-effect rounded-3xl p-8 text-center">
                    <h3 className="text-lg font-bold mb-4 text-[var(--text-primary)]">
                        🔥 Streak
                    </h3>
                    <div className="text-7xl mb-4 animate-[pulse-glow_2s_ease-in-out_infinite]">
                        🔥
                    </div>
                    <p className="text-5xl font-bold text-gradient mb-2">12</p>
                    <p className="text-lg text-[var(--text-secondary)] font-bold">
                        Hari Non-stop!
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)] mt-2">
                        Keren abis! Pertahanin terus! 💪
                    </p>
                </div>
            </div>

            {/* Badges */}
            <div className="glass-effect rounded-3xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">
                    🏅 Koleksi Badges
                </h3>
                <div className="grid grid-cols-5 gap-4">
                    {badges.map((badge, index) => (
                        <div
                            key={index}
                            className={`text-center p-4 rounded-2xl transition-all duration-300 ${badge.unlocked
                                ? 'bg-gradient-to-br from-[var(--bg-orange-50)] to-[var(--bg-rose-50)] hover:scale-110 cursor-pointer'
                                : 'bg-gray-200 opacity-40 blur-sm'
                                }`}
                        >
                            <div className="text-4xl mb-2">{badge.emoji}</div>
                            <p className="text-xs font-bold text-[var(--text-primary)]">
                                {badge.name}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-6 text-center">
                    <p className="text-sm text-[var(--text-tertiary)]">
                        Udah dapet 3 dari 5 badges kece! • Gas lengkapi semua! 🎁
                    </p>
                </div>
            </div>

            {/* Recent Activities */}
            <div className="glass-effect rounded-3xl p-8 mt-6">
                <h3 className="text-2xl font-bold mb-6 text-[var(--text-primary)]">
                    📊 Jejak Kebaikan
                </h3>
                <div className="space-y-4">
                    {activities.map((activity, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl bg-white/50 hover:bg-white transition-all duration-300"
                        >
                            <div className="text-3xl">{activity.emoji}</div>
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
