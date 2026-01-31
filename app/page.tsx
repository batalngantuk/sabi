'use client';

import SparkGenerator from './components/SparkGenerator';
import Vault from './components/Vault';
import Identity from './components/Identity';
import { Zap, Camera, User } from 'lucide-react';
import { useAppStore } from './store/useAppStore';

export default function Home() {
  const { activeSection, setActiveSection } = useAppStore();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-6 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-block mb-3 animate-[float_3s_ease-in-out_infinite]">
            {/* <span className="text-5xl md:text-7xl">🤝</span> */}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-3 text-gradient lowercase">
            sabi.
          </h1>
          <p className="text-lg md:text-2xl mb-2 text-[var(--text-secondary)] max-w-2xl mx-auto">
            Niat baik jangan cuma di hati, gas aksi!
          </p>
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
            <Zap className="w-6 h-6" />
            <span className="text-[10px] font-bold">Ide</span>
          </button>

          <button
            onClick={() => setActiveSection('vault')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-20 ${activeSection === 'vault'
              ? 'text-[var(--primary-orange)] scale-110'
              : 'text-[var(--text-tertiary)] hover:bg-white/50'
              }`}
          >
            <Camera className="w-6 h-6" />
            <span className="text-[10px] font-bold">Jejak</span>
          </button>

          <button
            onClick={() => setActiveSection('identity')}
            className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 w-20 ${activeSection === 'identity'
              ? 'text-[var(--primary-orange)] scale-110'
              : 'text-[var(--text-tertiary)] hover:bg-white/50'
              }`}
          >
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Gue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
