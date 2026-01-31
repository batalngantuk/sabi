'use client';

import { useSparkStore } from '../store/useSparkStore';
import { useVaultStore } from '../store/useVaultStore';
import { useAppStore } from '../store/useAppStore';
import { useIdentityStore } from '../store/useIdentityStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Camera, Send, Loader2 } from 'lucide-react';
import { Suggestion } from '../types';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';
import { triggerHaptic } from '../lib/haptics';
import { compressImage } from '../lib/imageCompression';
import InstallPWA from './InstallPWA';

export default function SparkGenerator() {
    const { form, setForm, suggestions, setSuggestions, isLoading, setIsLoading } = useSparkStore();
    const { addAct } = useVaultStore();
    const { setActiveSection } = useAppStore();
    const { addPoints, addActivity } = useIdentityStore();

    const [selectedIdea, setSelectedIdea] = useState<Suggestion | null>(null);
    const [story, setStory] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const handleSelectIdea = (idea: Suggestion) => {
        setSelectedIdea(idea);
        setStory('');
        setImage(null);
    };

    const handlePost = () => {
        if (!selectedIdea) return;

        triggerHaptic('medium');

        // 1. Add to Vault (Public Feed)
        addAct({
            id: Date.now().toString(),
            title: selectedIdea.title,
            story: story || `Saya baru saja melakukan tantangan: ${selectedIdea.title}`,
            category: selectedIdea.category || 'Random Act',
            timestamp: 'Baru saja',
            likes: 0,
            comments: 0,
            user: 'User', // Hardcoded for now
            image: image || undefined
        });

        // 2. Add to Identity (Personal Stats)
        addPoints(50); // Reward 50 points
        addActivity({
            action: selectedIdea.title,
            time: 'Baru saja',
            points: '+50'
        });

        // 3. Celebrate!
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        toast.success('Mantap! Kebaikanmu berhasil dibagikan (+50 Poin)', {
            icon: '🎉',
        });

        // 3. Reset and navigate
        setSelectedIdea(null);
        setSuggestions([]);
        setActiveSection('vault');
    };

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/generate-ideas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                throw new Error('Failed to generate');
            }

            const data = await response.json();
            setSuggestions(data);
        } catch (error) {
            console.error(error);
            toast.error("Maaf, lagi ga bisa racik ide nih. Coba lagi nanti ya!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 md:px-6 pb-20">
            <AnimatePresence mode="wait">
                {!selectedIdea ? (
                    <motion.div
                        key="generator"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="glass-effect rounded-3xl p-8 mb-8">
                            <h2 className="text-xl md:text-3xl font-bold mb-2 text-[var(--text-primary)]">
                                Ide Kebaikan Instan
                            </h2>
                            <p className="text-[var(--text-secondary)] mb-6">
                                Lagi buntu ide? Santai, AI bakal pilihin yang pas buat sikon kamu.
                            </p>

                            <div className="space-y-6 mb-6">
                                const [isLocating, setIsLocating] = useState(false);

                                // ... existing code ...

                                return (
                                // ... existing jsx ...
                                {/* Location Toggle - Big Button Style */}
                                <button
                                    onClick={() => {
                                        if (!form.useLocation) {
                                            setIsLocating(true);
                                            navigator.geolocation.getCurrentPosition(
                                                (pos) => {
                                                    setForm({
                                                        ...form,
                                                        useLocation: true,
                                                        latitude: pos.coords.latitude,
                                                        longitude: pos.coords.longitude
                                                    });
                                                    setIsLocating(false);
                                                },
                                                (err) => {
                                                    toast.error("Gagal ambil lokasi: " + err.message);
                                                    setIsLocating(false);
                                                }
                                            );
                                        } else {
                                            setForm({ ...form, useLocation: false, latitude: null, longitude: null });
                                        }
                                    }}
                                    className={`w-full flex items-center justify-between p-5 min-h-[70px] cursor-pointer touch-manipulation active:scale-[0.98] rounded-xl border-2 transition-all duration-300 ${form.useLocation
                                        ? 'bg-orange-50 border-[var(--primary-orange)] text-[var(--text-primary)] shadow-sm'
                                        : 'bg-white border-gray-200 text-[var(--text-secondary)] hover:border-[var(--border-orange)] active:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="text-left">
                                            <p className="font-bold text-sm">
                                                {isLocating ? 'Mencari Lokasi...' : (form.useLocation ? 'Lokasi Kamu Aktif' : 'Pakai Lokasi Saya')}
                                            </p>
                                            <p className="text-xs opacity-80">
                                                {isLocating ? 'Tunggu sebentar ya...' : (form.useLocation ? 'Mencari ide di sekitarmu...' : 'Klik biar ide lebih akurat!')}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${form.useLocation || isLocating ? 'bg-[var(--primary-orange)] border-[var(--primary-orange)]' : 'border-gray-300'
                                        }`}>
                                        {isLocating ? (
                                            <Loader2 className="w-4 h-4 text-white animate-spin" />
                                        ) : (
                                            form.useLocation && <span className="text-white font-bold text-sm">✓</span>
                                        )}
                                    </div>
                                </button>

                                {/* Budget Selection */}
                                <div>
                                    <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                                        Ada modal berapa?
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
                                        Punya waktu berapa lama?
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
                                        Lagi semangat ga?
                                    </label>
                                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                                        {[
                                            { label: 'Lelah', value: 'low' },
                                            { label: 'Biasa Aja', value: 'medium' },
                                            { label: 'Gaspol!', value: 'high' }
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
                                className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                                {isLoading ? 'Bentar, meracik ide...' : 'Carikan Ide Seru!'}
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
                                        onClick={() => handleSelectIdea(suggestion)}
                                    >
                                        {/* <div className="text-5xl mb-4">{suggestion.emoji}</div> */}
                                        <h3 className="font-bold text-lg mb-2 text-[var(--text-primary)]">
                                            {suggestion.title}
                                        </h3>
                                        <p className="text-sm text-[var(--text-secondary)] mb-4">
                                            {suggestion.description}
                                        </p>
                                        <div className="space-y-2 text-xs text-[var(--text-tertiary)]">
                                            <p>Modal: {suggestion.budget}</p>
                                            <p>Durasi: {suggestion.time}</p>
                                            <p>Lokasi: {suggestion.distance}</p>
                                            <p className="inline-block px-3 py-1 rounded-full bg-[var(--bg-orange-50)] text-[var(--primary-orange)] font-bold">
                                                Level: {suggestion.difficulty}
                                            </p>
                                        </div>
                                        <button className="w-full mt-4 gradient-primary text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300">
                                            Gas Jalanin!
                                        </button>
                                    </motion.div>
                                ))}
                            </div>
                        )}

                        {/* Install PWA Prompt */}
                        <div className="mt-6">
                            <InstallPWA />
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="glass-effect rounded-3xl p-8"
                    >
                        <button
                            onClick={() => setSelectedIdea(null)}
                            className="flex items-center gap-2 text-[var(--text-secondary)] mb-6 hover:text-[var(--primary-orange)] transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span className="font-bold">Kembali pilih ide</span>
                        </button>

                        <h2 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">
                            {selectedIdea?.title}
                        </h2>
                        <p className="text-[var(--text-secondary)] mb-8">
                            {selectedIdea?.description}
                        </p>

                        <div className="space-y-6">
                            <div
                                onClick={() => document.getElementById('proof-upload')?.click()}
                                className="border-4 border-dashed border-[var(--border-orange)] rounded-2xl p-8 text-center hover:border-[var(--primary-orange)] transition-all duration-300 cursor-pointer bg-white/50 relative overflow-hidden group"
                            >
                                {image ? (
                                    <div className="absolute inset-0">
                                        <img src={image} alt="Bukti Aksi" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <p className="text-white font-bold">Ganti Foto</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <Camera className="w-12 h-12 mx-auto mb-4 text-[var(--text-tertiary)]" />
                                        <p className="font-bold text-[var(--text-primary)]">
                                            Upload Bukti Aksi
                                        </p>
                                        <p className="text-sm text-[var(--text-tertiary)]">
                                            Biar makin valid no debad!
                                        </p>
                                    </>
                                )}
                                <input
                                    id="proof-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => setImage(reader.result as string);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                                    Gimana rasanya?
                                </label>
                                <textarea
                                    value={story}
                                    onChange={(e) => setStory(e.target.value)}
                                    placeholder="Ceritain dikit dong, apa yang bikin momen ini spesial?"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-orange)] bg-white text-[var(--text-primary)] resize-none focus:border-[var(--primary-orange)] focus:outline-none transition-all duration-300"
                                />
                            </div>

                            <button
                                onClick={handlePost}
                                className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2 transition-all duration-300"
                            >
                                <Send className="w-5 h-5" />
                                Posting ke Jejak
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
