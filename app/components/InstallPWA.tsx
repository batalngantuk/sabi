'use client';

import { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

export default function InstallPWA() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallButton, setShowInstallButton] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);

    useEffect(() => {
        // Detect iOS device
        const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        setIsIOS(isIOSDevice);

        // Check if already installed
        const isInstalled = window.matchMedia('(display-mode: standalone)').matches ||
            (window.navigator as any).standalone === true;

        if (isInstalled) {
            return; // Don't show button if already installed
        }

        // For iOS - always show button if using Safari
        if (isIOSDevice) {
            const isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(navigator.userAgent);
            if (isSafari) {
                setShowInstallButton(true);
            }
            return; // iOS doesn't support beforeinstallprompt
        }

        // For Android/Desktop - listen for install prompt
        const handleBeforeInstall = (e: any) => {
            e.preventDefault();
            console.log('beforeinstallprompt fired');
            setDeferredPrompt(e);
            setShowInstallButton(true);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    const handleInstallClick = async () => {
        if (isIOS) {
            // iOS - show instructions modal
            setShowIOSInstructions(true);
            return;
        }

        // Android/Desktop - trigger install prompt
        if (!deferredPrompt) {
            console.log('No deferred prompt available');
            return;
        }

        try {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`User response: ${outcome}`);

            if (outcome === 'accepted') {
                setShowInstallButton(false);
            }
        } catch (error) {
            console.error('Error showing install prompt:', error);
        } finally {
            setDeferredPrompt(null);
        }
    };

    if (!showInstallButton) return null;

    return (
        <>
            <div className="glass-effect rounded-2xl p-4 border-2 border-[var(--primary-orange)]">
                <div className="flex items-start gap-3">
                    <div className="p-2 bg-[var(--primary-orange)] rounded-full flex-shrink-0">
                        <Download className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-[var(--text-primary)] mb-1">
                            Install Sabi
                        </h4>
                        <p className="text-sm text-[var(--text-secondary)] mb-3">
                            Install app biar lebih gampang akses kapan aja!
                        </p>
                        <button
                            onClick={handleInstallClick}
                            className="w-full py-2 px-4 bg-[var(--primary-orange)] text-white font-bold rounded-xl hover:bg-orange-600 active:scale-95 transition-all"
                        >
                            {isIOS ? 'Lihat Cara Install' : 'Install Sekarang'}
                        </button>
                    </div>
                </div>
            </div>

            {/* iOS Instructions Modal */}
            {showIOSInstructions && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 max-w-sm w-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-[var(--text-primary)]">
                                Install di iOS
                            </h3>
                            <button
                                onClick={() => setShowIOSInstructions(false)}
                                className="p-2 hover:bg-gray-100 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="space-y-3 text-sm text-[var(--text-secondary)]">
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-[var(--primary-orange)]">1.</span>
                                Tap tombol <strong>Share</strong> di Safari (kotak dengan panah ke atas)
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-[var(--primary-orange)]">2.</span>
                                Scroll ke bawah dan pilih <strong>"Add to Home Screen"</strong>
                            </p>
                            <p className="flex items-start gap-2">
                                <span className="font-bold text-[var(--primary-orange)]">3.</span>
                                Tap <strong>"Add"</strong> di pojok kanan atas
                            </p>
                        </div>
                        <button
                            onClick={() => setShowIOSInstructions(false)}
                            className="w-full mt-6 py-3 bg-[var(--primary-orange)] text-white font-bold rounded-xl"
                        >
                            Oke, Paham!
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
