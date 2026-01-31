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

                <div className="space-y-6 mb-6">
                    {/* Budget Selection */}
                    <div>
                        <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                            💰 Ada modal berapa?
                        </label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                            {[
                                { label: '0', value: '0' },
                                { label: '10k', value: '10000' },
                                { label: '20k', value: '20000' },
                                { label: '50k', value: '50000' },
                                { label: '100k', value: '100000' },
                                { label: 'Sultan', value: '200000' }
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setForm({ budget: opt.value })}
                                    className={`flex-shrink-0 py-2 px-4 rounded-full text-sm font-bold transition-all duration-300 border ${form.budget === opt.value
                                        ? 'bg-[var(--primary-orange)] border-[var(--primary-orange)] text-white shadow-md'
                                        : 'bg-white border-gray-200 text-[var(--text-secondary)]'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                        <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                            ⏱️ Punya waktu berapa lama?
                        </label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                            {[
                                { label: '5m', value: '5' },
                                { label: '15m', value: '15' },
                                { label: '30m', value: '30' },
                                { label: '1 Jam', value: '60' },
                                { label: 'Seharian', value: '120' }
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setForm({ time: opt.value })}
                                    className={`flex-shrink-0 py-2 px-4 rounded-full text-sm font-bold transition-all duration-300 border ${form.time === opt.value
                                        ? 'bg-[var(--primary-orange)] border-[var(--primary-orange)] text-white shadow-md'
                                        : 'bg-white border-gray-200 text-[var(--text-secondary)]'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Energy Selection */}
                    <div>
                        <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                            ⚡ Lagi semangat ga?
                        </label>
                        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                            {[
                                { label: 'Lelah 😴', value: 'low' },
                                { label: 'Biasa Aja 😊', value: 'medium' },
                                { label: 'Gaspol! 🔥', value: 'high' }
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setForm({ energy: opt.value })}
                                    className={`flex-shrink-0 py-2 px-4 rounded-full text-sm font-bold transition-all duration-300 border ${form.energy === opt.value
                                        ? 'bg-[var(--primary-orange)] border-[var(--primary-orange)] text-white shadow-md'
                                        : 'bg-white border-gray-200 text-[var(--text-secondary)]'
                                        }`}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>
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
