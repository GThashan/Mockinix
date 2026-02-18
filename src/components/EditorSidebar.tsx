export const EditorSidebar = () => {
    return (
        <aside className="w-[400px] border-l border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-[calc(100vh-64px)] overflow-y-auto transition-colors duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editor Controls</h2>
                <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 dark:text-gray-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <path d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            <div className="p-6 space-y-8 flex-1">
                {/* T-shirt Options */}
                <section>
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">T-Shirt Options</h3>
                    <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-3xl p-6 space-y-6 transition-colors duration-300">
                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-3">Garment Color</label>
                            <div className="flex flex-wrap gap-3">
                                {['bg-white border-blue-500 ring-2 ring-blue-100 dark:ring-blue-900/40', 'bg-gray-900', 'bg-blue-600', 'bg-rose-500', 'bg-emerald-600', 'bg-amber-500'].map((color, i) => (
                                    <button key={i} className={`w-8 h-8 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm transition-transform hover:scale-110 ${color}`} />
                                ))}
                                <button className="w-8 h-8 rounded-full border border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg hover:border-gray-500 transition-colors">+</button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-3">Fabric Texture</label>
                            <div className="grid grid-cols-3 gap-2">
                                {['Cotton', 'Polyester', 'Heather'].map((text, i) => (
                                    <button key={i} className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${i === 0 ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}>
                                        {text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Environment */}
                <section>
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Environment</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl border-2 border-blue-500 p-2 overflow-hidden bg-cover bg-center">
                                <div className="w-full h-full bg-white dark:bg-gray-700 rounded-xl shadow-inner" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-900 dark:text-gray-200 px-1">Studio Light</span>
                        </div>
                        <div className="space-y-2">
                            <div className="aspect-square bg-gray-100 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-2 overflow-hidden">
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-xl" />
                            </div>
                            <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 px-1">Urban Street</span>
                        </div>
                    </div>
                </section>

                {/* Artwork Assets */}
                <section>
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Artwork Assets</h3>
                    <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-8 flex flex-col items-center justify-center bg-gray-50/30 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 16v-8m0 0l-3 3m3-3l3 3m-9 5h12" /></svg>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-1">Upload Front Sticker</span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">SVG, PNG, JPG (Max 10MB)</span>
                    </div>
                </section>
                <section>
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Artwork Assets</h3>
                    <div className="border border-dashed border-gray-200 dark:border-gray-700 rounded-3xl p-8 flex flex-col items-center justify-center bg-gray-50/30 dark:bg-gray-800/30 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 16v-8m0 0l-3 3m3-3l3 3m-9 5h12" /></svg>
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-200 mb-1">Upload Back Sticker</span>
                        <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">SVG, PNG, JPG (Max 10MB)</span>
                    </div>
                </section>
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-950/50 transition-colors duration-300">
                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-100 dark:shadow-blue-900/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 10v6m0 0l-3-3m3 3l3-3m5 2v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" /></svg>
                    Download Image (PNG / JPG)
                </button>
            </div>
        </aside>
    );
};
