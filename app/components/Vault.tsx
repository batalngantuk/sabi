import { useVaultStore } from '../store/useVaultStore';
import { useIdentityStore } from '../store/useIdentityStore';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function Vault() {
    const { completedActs, addAct } = useVaultStore();
    const { addPoints, addActivity } = useIdentityStore();
    const [status, setStatus] = useState('');

    const handlePost = () => {
        if (!status.trim()) return;

        // 1. Add to Vault
        addAct({
            id: Date.now().toString(),
            title: 'Kebaikan Harian',
            story: status,
            category: 'Daily Act',
            timestamp: 'Baru saja',
            likes: 0,
            comments: 0,
            user: 'You'
        });

        // 2. Add Reward
        addPoints(50);
        addActivity({
            action: 'Postingan Kebaikan',
            time: 'Baru saja',
            points: '+50'
        });

        // 3. Reset
        setStatus('');
        alert('Mantap! Kebaikanmu berhasil dibagikan (+50 Poin)');
    };

    return (
        <section className="max-w-4xl mx-auto px-6 pb-20">
            <div className="glass-effect rounded-3xl p-8">
                <h2 className="text-xl md:text-3xl font-bold mb-6 text-[var(--text-primary)]">
                    Galeri Kebaikan
                </h2>

                {/* Status Input - Facebook Style */}
                <div className="bg-white/50 rounded-2xl p-4 mb-8 border border-white shadow-sm">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-[var(--primary-orange)] flex items-center justify-center text-white font-bold text-lg">
                            Y
                        </div>
                        <textarea
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            placeholder="Apa kebaikan yang kamu lakukan hari ini?"
                            className="flex-1 bg-transparent border-none focus:ring-0 text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] resize-none h-20"
                        />
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200/50 pt-3 mt-2">
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-black/5 rounded-full transition-colors text-[var(--text-secondary)]">
                                <ImageIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <button
                            onClick={handlePost}
                            disabled={!status.trim()}
                            className="px-6 py-2 rounded-full bg-[var(--primary-orange)] text-white font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                        >
                            <Send className="w-4 h-4" />
                            Posting
                        </button>
                    </div>
                </div>

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
