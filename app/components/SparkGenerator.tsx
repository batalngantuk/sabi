'use client';

import { useSparkStore } from '../store/useSparkStore';
import { motion } from 'framer-motion';

export default function SparkGenerator() {
    const { form, setForm, suggestions, setSuggestions, isLoading, setIsLoading } = useSparkStore();

    const handleGenerate = async () => {
        setIsLoading(true);
        // TODO: Replace with real API call
        setTimeout(() => {
            setSuggestions([
                {
                    emoji: '🍞',
                    title: 'Beli 2 roti di toko sebelahmu',
                    description: 'Berikan ke petugas parkir yang sedang bekerja',
                    budget: 'Rp 15.000',
                    time: '10 menit',
                    distance: '200m dari lokasi',
                    difficulty: 'Mudah',
                    category: 'Charity'
                },
                {
                    emoji: '🐕',
                    title: 'Beli makanan kucing di minimarket',
                    description: 'Berikan ke kucing jalanan di sekitar area kamu',
                    budget: 'Rp 25.000',
                    time: '15 menit',
                    distance: '500m dari lokasi',
                    difficulty: 'Mudah',
                    category: 'Animal Care'
                },
                {
                    emoji: '🌱',
                    title: 'Ambil 5 sampah plastik di taman',
                    description: 'Buang ke tempat sampah terdekat',
                    budget: 'Rp 0',
                    time: '5 menit',
                    distance: '300m dari lokasi',
                    difficulty: 'Sangat Mudah',
                    category: 'Environment'
                }
            ]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <section className="max-w-4xl mx-auto px-6 pb-20">
            <div className="glass-effect rounded-3xl p-8 mb-8">
                <h2 className="text-3xl font-bold mb-2 text-[var(--text-primary)]">
                    🎯 Ide Kebaikan Instan
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                    Lagi buntu ide? Santai, AI bakal pilihin yang pas buat sikon kamu.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                            💰 Ada modal berapa?
                        </label>
                        <input
                            type="range"
                            min="0"
                            max="100000"
                            step="5000"
                            value={form.budget}
                            onChange={(e) => setForm({ budget: e.target.value })}
                            className="w-full"
                        />
                        <p className="text-sm text-[var(--text-tertiary)] mt-1" suppressHydrationWarning>
                            Rp {parseInt(form.budget).toLocaleString('id-ID')}
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                            ⏱️ Punya waktu berapa lama?
                        </label>
                        <input
                            type="range"
                            min="5"
                            max="60"
                            step="5"
                            value={form.time}
                            onChange={(e) => setForm({ time: e.target.value })}
                            className="w-full"
                        />
                        <p className="text-sm text-[var(--text-tertiary)] mt-1">
                            {form.time} menit
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                            ⚡ Lagi semangat ga?
                        </label>
                        <select
                            value={form.energy}
                            onChange={(e) => setForm({ energy: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border-2 border-[var(--border-orange)] bg-white text-[var(--text-primary)] font-medium"
                        >
                            <option value="low">Lagi lowbat 😴</option>
                            <option value="medium">Biasa aja 😊</option>
                            <option value="high">Gaspol! 🔥</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? 'Bentar, meracik ide...' : 'Carikan Ide Seru! ✨'}
                </button>
            </div>

            {/* AI Suggestions */}
            {suggestions.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6">
                    {suggestions.map((suggestion, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-effect rounded-2xl p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
                        >
                            <div className="text-5xl mb-4">{suggestion.emoji}</div>
                            <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">
                                {suggestion.title}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] mb-4">
                                {suggestion.description}
                            </p>
                            <div className="space-y-2 text-xs text-[var(--text-tertiary)]">
                                <p>💰 Modal: {suggestion.budget}</p>
                                <p>⏱️ Durasi: {suggestion.time}</p>
                                <p>📍 Lokasi: {suggestion.distance}</p>
                                <p className="inline-block px-3 py-1 rounded-full bg-[var(--bg-orange-50)] text-[var(--primary-orange)] font-bold">
                                    Level: {suggestion.difficulty}
                                </p>
                            </div>
                            <button className="w-full mt-4 gradient-primary text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                                Gas Jalanin! 🚀
                            </button>
                        </motion.div>
                    ))}
                </div>
            )}
        </section>
    );
}
