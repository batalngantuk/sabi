'use client';

import { memo, useEffect } from 'react';
import { useChallengeStore } from '../store/useChallengeStore';
import { useIdentityStore } from '../store/useIdentityStore';
import { Trophy, CheckCircle, Circle } from 'lucide-react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

function DailyChallenges() {
    const { challenges, generateDailyChallenges, completeChallenge } = useChallengeStore();
    const { addPoints, addActivity } = useIdentityStore();

    useEffect(() => {
        generateDailyChallenges();
    }, [generateDailyChallenges]);

    const handleCompleteChallenge = (id: string, reward: number, title: string) => {
        completeChallenge(id);
        addPoints(reward);
        addActivity({
            action: `Challenge: ${title}`,
            time: 'Baru saja',
            points: `+${reward}`
        });

        confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.7 }
        });

        toast.success(`Challenge selesai! +${reward} Poin`, {
            icon: '🏆',
        });
    };

    const completedCount = challenges.filter(c => c.completed).length;

    return (
        <div className="glass-effect rounded-3xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Trophy className="w-6 h-6 text-[var(--primary-orange)]" />
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">
                        Challenge Harian
                    </h3>
                </div>
                <span className="text-sm font-bold text-[var(--text-tertiary)]">
                    {completedCount}/3
                </span>
            </div>

            <div className="space-y-3">
                {challenges.map((challenge) => (
                    <div
                        key={challenge.id}
                        className={`p-4 rounded-xl border-2 transition-all ${challenge.completed
                                ? 'bg-green-50 border-green-300'
                                : 'bg-white border-gray-200 hover:border-[var(--primary-orange)]'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            {challenge.completed ? (
                                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                            ) : (
                                <Circle className="w-6 h-6 text-gray-300 flex-shrink-0 mt-0.5" />
                            )}

                            <div className="flex-1">
                                <h4 className={`font-bold ${challenge.completed ? 'text-green-700 line-through' : 'text-[var(--text-primary)]'
                                    }`}>
                                    {challenge.title}
                                </h4>
                                <p className="text-sm text-[var(--text-secondary)] mb-2">
                                    {challenge.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-[var(--primary-orange)]">
                                        +{challenge.reward} Poin
                                    </span>
                                    {!challenge.completed && (
                                        <button
                                            onClick={() => handleCompleteChallenge(
                                                challenge.id,
                                                challenge.reward,
                                                challenge.title
                                            )}
                                            className="px-3 py-1 rounded-lg bg-[var(--primary-orange)] text-white text-xs font-bold hover:bg-orange-600 active:scale-95 transition-all"
                                        >
                                            Selesai
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {completedCount === 3 && (
                <div className="mt-4 p-3 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                    <p className="text-center text-sm font-bold text-[var(--primary-orange)]">
                        🎉 Semua challenge hari ini selesai! Kembali besok untuk challenge baru.
                    </p>
                </div>
            )}
        </div>
    );
}

export default memo(DailyChallenges);
