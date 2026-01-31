'use client';

import { useVaultStore } from '../store/useVaultStore';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';

export default function Vault() {
    const { completedActs } = useVaultStore();
    return (
        <section className="max-w-4xl mx-auto px-6 pb-20">
            <div className="glass-effect rounded-3xl p-8">
                <h2 className="text-xl md:text-3xl font-bold mb-6 text-[var(--text-primary)]">
                    Galeri Kebaikan
                </h2>

                <div className="space-y-6">
                    {completedActs.map((act) => (
                        <div key={act.id} className="glass-effect rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-[var(--text-primary)]">{act.title}</h3>
                                    <p className="text-xs text-[var(--text-tertiary)]">{act.timestamp} • {act.user || 'Anonymous'}</p>
                                </div>
                                <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer">
                                    <MoreHorizontal className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            <p className="text-[var(--text-secondary)] mb-4 text-sm leading-relaxed">
                                {act.story}
                            </p>

                            {act.image && (
                                <div className="mb-4 rounded-xl overflow-hidden h-48 w-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    [Foto Aksi Kebaikan]
                                </div>
                            )}

                            <div className="flex items-center gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-[var(--bg-orange-50)] text-[var(--primary-orange)] text-xs font-bold">
                                    {act.category}
                                </span>
                            </div>

                            <div className="flex items-center gap-6 border-t border-gray-100 pt-4 mb-4">
                                <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-pink-500 transition-colors">
                                    <Heart className="w-5 h-5" />
                                    <span className="text-xs font-bold">{act.likes}</span>
                                </button>
                                <button className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-blue-500 transition-colors">
                                    <MessageCircle className="w-5 h-5" />
                                    <span className="text-xs font-bold">{act.comments}</span>
                                </button>
                            </div>

                            <button className="w-full py-3 rounded-xl bg-[var(--primary-orange)] text-white font-bold shadow-md hover:shadow-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2">
                                <Share2 className="w-5 h-5" />
                                Bagikan Kebaikan Ini
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
