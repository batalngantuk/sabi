'use client';

import { useState } from 'react';
import SparkGenerator from './components/SparkGenerator';
import Vault from './components/Vault';
import Identity from './components/Identity';
import { Section } from './types';

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>('spark');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 animate-[float_3s_ease-in-out_infinite]">
            <span className="text-7xl">🤝</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient lowercase">
            sabi.
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Niat baik jangan cuma di hati, gas aksi! 🚀
          </p>
          <p className="text-lg mb-8 text-[var(--text-tertiary)] max-w-xl mx-auto">
            Bingung mau baik apa hari ini? Kita bantuin cari ide plus bikin seru bareng-bareng!
          </p>
          <button
            onClick={() => setActiveSection('spark')}
            className="gradient-primary text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Mulai Seru-seruan! ✨
          </button>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--secondary-rose)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[float_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[var(--primary-amber)] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-[float_8s_ease-in-out_infinite]"></div>
      </section>

      {/* Main Content Area */}
      <main className="pb-24">
        {activeSection === 'spark' && <SparkGenerator />}
        {activeSection === 'vault' && <Vault />}
        {activeSection === 'identity' && <Identity />}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/80 to-transparent z-50">
        <div className="glass-effect rounded-2xl p-2 flex justify-around items-center shadow-lg max-w-md mx-auto">
          <button
            onClick={() => setActiveSection('spark')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-20 ${activeSection === 'spark'
              ? 'text-[var(--primary-orange)] scale-110'
              : 'text-[var(--text-tertiary)] hover:bg-white/50'
              }`}
          >
            <span className="text-2xl">⚡</span>
            <span className="text-[10px] font-bold">Ide</span>
          </button>

          <button
            onClick={() => setActiveSection('vault')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-20 ${activeSection === 'vault'
              ? 'text-[var(--primary-orange)] scale-110'
              : 'text-[var(--text-tertiary)] hover:bg-white/50'
              }`}
          >
            <span className="text-2xl">📸</span>
            <span className="text-[10px] font-bold">Jejak</span>
          </button>

          <button
            onClick={() => setActiveSection('identity')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-20 ${activeSection === 'identity'
              ? 'text-[var(--primary-orange)] scale-110'
              : 'text-[var(--text-tertiary)] hover:bg-white/50'
              }`}
          >
            <span className="text-2xl">🏆</span>
            <span className="text-[10px] font-bold">Gue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
