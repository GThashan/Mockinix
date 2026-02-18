import { useState } from 'react';

export const PreviewSection = () => {
    const [view, setView] = useState('front');

    return (
        <div className="relative flex-1 bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
            <div className="absolute top-8 left-8">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Live 3D Preview</span>
                </div>
            </div>

            {/* Main Mockup Display */}
            <div className="w-[98%] h-[98%]  relative  overflow-hidden shadow-2xl transition-all duration-700">
                <div className="w-full absolute inset-0 bg-[#e6a282] flex items-center justify-center">
                    {/* T-shirt image placeholder */}
                    <div className="text-white/20 font-bold text-6xl rotate-12 select-none">T-SHIRT MOCKUP</div>
                    {/* Overlay for lighting effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent dark:from-black/40" />
                </div>
            </div>

            {/* View Toggles and Control Bar */}
            <div className="absolute bottom-12 flex flex-col items-center gap-4 w-full px-8">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 p-1.5 flex gap-1 transition-colors duration-300">
                    <button
                        onClick={() => setView('front')}
                        className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${view === 'front' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" /></svg>
                        Front View
                    </button>
                    <button
                        onClick={() => setView('back')}
                        className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${view === 'back' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" /></svg>
                        Back View
                    </button>
                    <div className="w-px bg-gray-100 dark:bg-gray-800 mx-1" />
                    <div className="px-4 py-2 text-gray-400 dark:text-gray-500 text-xs font-medium flex items-center">
                        Export Short Video (MP4)
                    </div>
                </div>
            </div>
        </div>
    );
};
