'use client';

export default function Vault() {
    return (
        <section className="max-w-4xl mx-auto px-6 pb-20">
            <div className="glass-effect rounded-3xl p-8">
                <h2 className="text-xl md:text-3xl font-bold mb-2 text-[var(--text-primary)]">
                    Galeri Kebaikan
                </h2>
                <p className="text-[var(--text-secondary)] mb-6">
                    Abadikan momenmu, bukan buat pamer, tapi buat nularin semangat!
                </p>

                <div className="border-4 border-dashed border-[var(--border-orange)] rounded-2xl p-12 text-center mb-6 hover:border-[var(--primary-orange)] transition-all duration-300 cursor-pointer">
                    {/* <div className="text-6xl mb-4">📷</div> */}
                    <p className="text-lg font-bold text-[var(--text-primary)] mb-2">
                        Upload Foto Aksi Kamu
                    </p>
                    <p className="text-sm text-[var(--text-tertiary)]">
                        Klik atau drop foto di sini
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2 text-[var(--text-primary)]">
                        Gimana rasanya?
                    </label>
                    <textarea
                        placeholder="Ceritain dikit dong, apa yang bikin momen ini spesial?"
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border-2 border-[var(--border-orange)] bg-white text-[var(--text-primary)] resize-none focus:border-[var(--primary-orange)] focus:outline-none transition-all duration-300"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="glass-effect rounded-xl p-4">
                        <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
                            Kategori
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {['Charity', 'Animal Care', 'Environment', 'Community'].map((cat) => (
                                <button
                                    key={cat}
                                    className="px-3 py-1 rounded-full bg-[var(--bg-orange-50)] text-[var(--primary-orange)] text-sm font-bold hover:bg-[var(--primary-orange)] hover:text-white transition-all duration-300"
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-effect rounded-xl p-4">
                        <p className="text-sm font-bold text-[var(--text-primary)] mb-2">
                            Share ke
                        </p>
                        <div className="flex gap-3">
                            <button className="flex-1 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:shadow-lg transition-all duration-300">
                                Instagram
                            </button>
                            <button className="flex-1 py-2 rounded-lg bg-black text-white font-bold hover:shadow-lg transition-all duration-300">
                                TikTok
                            </button>
                        </div>
                    </div>
                </div>

                <button className="w-full gradient-primary text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300">
                    Simpan & Bagikan
                </button>
            </div>
        </section>
    );
}
