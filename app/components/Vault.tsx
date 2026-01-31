import { useVaultStore } from '../store/useVaultStore';
import { useIdentityStore } from '../store/useIdentityStore';
import { Heart, MessageCircle, Share2, MoreHorizontal, Send, Image as ImageIcon, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { triggerHaptic } from '../lib/haptics';
import { compressImage } from '../lib/imageCompression';

export default function Vault() {
    const { completedActs, addAct } = useVaultStore();
    const { addPoints, addActivity } = useIdentityStore();
    const [status, setStatus] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const handleRefresh = async () => {
        // Simulate refresh (in future: fetch from API)
        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success('Feed diperbarui!');
    };

    const { handleTouchStart, handleTouchMove, handleTouchEnd, isRefreshing, pullDistance, progress } = usePullToRefresh({
        onRefresh: handleRefresh,
        threshold: 80
    });

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const compressedImage = await compressImage(file);
                setImage(compressedImage);
                toast.success('Gambar berhasil diupload!');
            } catch (error) {
                toast.error('Gagal upload gambar');
            }
        }
    };

    const handleShare = async (act: any) => {
        triggerHaptic('light');
        const shareData = {
            title: `Kebaikan: ${act.title}`,
            text: `${act.title}\n\n"${act.story}"\n\n- ${act.user}`,
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                toast.success('Cerita tersalin! Siap dipaste kemana aja.');
            }
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

    const handlePost = () => {
        if (!status.trim()) return;

        triggerHaptic('medium');

        // 1. Add to Vault
        addAct({
            id: Date.now().toString(),
            title: 'Kebaikan Harian',
            story: status,
            category: 'Daily Act',
            timestamp: 'Baru saja',
            likes: 0,
            comments: 0,
            user: 'You',
            image: image || undefined
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
        setImage(null);

        // 4. Celebrate!
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        toast.success('Mantap! Kebaikanmu berhasil dibagikan (+50 Poin)', {
            icon: '🎉',
        });
    };

    return (
        <section
            className="max-w-4xl mx-auto px-6 pb-20"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Pull to Refresh Indicator */}
            {pullDistance > 0 && (
                <div
                    className="flex justify-center items-center py-4 transition-all duration-300"
                    style={{
                        opacity: progress,
                        transform: `translateY(${Math.min(pullDistance, 60)}px)`
                    }}
                >
                    <RefreshCw
                        className={`w-6 h-6 text-[var(--primary-orange)] transition-transform ${isRefreshing ? 'animate-spin' : ''
                            }`}
                        style={{ transform: `rotate(${progress * 360}deg)` }}
                    />
                </div>
            )}

            <div className="glass-effect rounded-3xl p-8">
                <h2 className="text-xl md:text-3xl font-bold mb-6 text-[var(--text-primary)]">
                    Galeri Kebaikan
                </h2>

                {/* Status Input - Facebook Style */}
                <div className="bg-white/50 rounded-2xl p-4 mb-8 border border-white shadow-sm">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <textarea
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                placeholder="Ceritain kebaikan yang udah kamu lakuin hari ini..."
                                className="w-full bg-transparent border-none resize-none text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
                                rows={3}
                            />
                            {image && (
                                <div className="relative inline-block mb-2">
                                    <img src={image} alt="Preview" className="h-24 rounded-lg border border-gray-200" />
                                    <button
                                        onClick={() => setImage(null)}
                                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        X
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-200/50 pt-3 mt-2">
                        <div className="flex gap-2">
                            <button
                                onClick={() => document.getElementById('vault-upload')?.click()}
                                className="p-2 hover:bg-black/5 rounded-full transition-colors text-[var(--text-secondary)] tooltip"
                                title="Upload Foto"
                            >
                                <ImageIcon className="w-5 h-5 text-[var(--primary-orange)]" />
                            </button>
                            <input
                                id="vault-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                            />
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

                {/* Feed */}
                {completedActs.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="mb-4 flex justify-center">
                            <Heart className="w-16 h-16 text-[var(--primary-orange)] opacity-30" />
                        </div>
                        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">
                            Belum Ada Cerita Kebaikan
                        </h3>
                        <p className="text-[var(--text-secondary)] mb-6">
                            Yuk mulai berbagi kebaikan pertamamu! Tulis di atas atau cari ide di tab Ide.
                        </p>
                    </div>
                ) : (
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

                                <p className="text-[var(--text-secondary)] mb-4 text-sm leading-relaxed whitespace-pre-line">
                                    {act.story}
                                </p>

                                {act.image ? (
                                    <div className="mb-4 rounded-xl overflow-hidden max-h-96 w-full bg-gray-100">
                                        <img src={act.image} alt="Bukti Kebaikan" className="w-full h-full object-cover" />
                                    </div>
                                ) : null}

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

                                <button
                                    onClick={() => handleShare(act)}
                                    className="w-full py-3 rounded-xl bg-[var(--primary-orange)] text-white font-bold shadow-md hover:shadow-lg hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <Share2 className="w-5 h-5" />
                                    Bagikan Kebaikan Ini
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
