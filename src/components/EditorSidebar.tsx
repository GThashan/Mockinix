import { useState, useRef, useEffect } from 'react';

// Color conversion helpers
const hsvToRgb = (h: number, s: number, v: number) => {
    let r = 0, g = 0, b = 0;
    const i = Math.floor(h * 360 / 60);
    const f = (h * 360 / 60) - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v; g = t; b = p; break;
        case 1: r = q; g = v; b = p; break;
        case 2: r = p; g = v; b = t; break;
        case 3: r = p; g = q; b = v; break;
        case 4: r = t; g = p; b = v; break;
        case 5: r = v; g = p; b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
};

const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
};

export const EditorSidebar = ({
    bgType, setBgType, bgColor, setBgColor, bgImage, setBgImage, bgImages, setBgImages
}: {
    bgType: 'color' | 'image',
    setBgType: (t: 'color' | 'image') => void,
    bgColor: string,
    setBgColor: (c: string) => void,
    bgImage: string | null,
    setBgImage: (i: string | null) => void,
    bgImages: string[],
    setBgImages: (imgs: string[]) => void
}) => {
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [hsv, setHsv] = useState({ h: 0.5, s: 0.5, v: 0.9 });
    const [alpha, setAlpha] = useState(1);
    const [savedColors, setSavedColors] = useState(['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899']);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const satRectRef = useRef<HTMLDivElement>(null);

    // Update bgColor when HSV or Alpha changes
    useEffect(() => {
        const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        setBgColor(hex);
    }, [hsv, setBgColor]);

    const handleSatMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        const move = (event: MouseEvent | TouchEvent) => {
            if (!satRectRef.current) return;
            const rect = satRectRef.current.getBoundingClientRect();
            const clientX = 'touches' in event ? event.touches[0].clientX : (event as MouseEvent).clientX;
            const clientY = 'touches' in event ? event.touches[0].clientY : (event as MouseEvent).clientY;

            let s = (clientX - rect.left) / rect.width;
            let v = 1 - (clientY - rect.top) / rect.height;

            s = Math.max(0, Math.min(1, s));
            v = Math.max(0, Math.min(1, v));

            setHsv(prev => ({ ...prev, s, v }));
            setBgType('color');
        };

        const stop = () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', stop);
            window.removeEventListener('touchmove', move);
            window.removeEventListener('touchend', stop);
        };

        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', stop);
        window.addEventListener('touchmove', move);
        window.addEventListener('touchend', stop);

        // Initial call
        move(e.nativeEvent as any);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const newImg = event.target?.result as string;
                setBgImages([...bgImages, newImg]);
                setBgImage(newImg);
                setBgType('image');
            };
            reader.readAsDataURL(file);
        }
    };

    const curHueRgb = hsvToRgb(hsv.h, 1, 1);
    const curHueHex = rgbToHex(curHueRgb.r, curHueRgb.g, curHueRgb.b);

    return (
        <aside className="w-[400px] border-l border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col h-[calc(100vh-64px)] transition-colors duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editor Controls</h2>
                <button className="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 dark:text-gray-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                        <path d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>

            <div className="p-6 space-y-8 flex-1 overflow-y-auto scrollbar-hide">

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

                {/* Background */}
                <section>
                    <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">Background</h3>
                    <div className="bg-gray-50/50 dark:bg-gray-800/50 rounded-3xl p-6 transition-colors duration-300">
                        <div className="grid grid-cols-4 gap-4">
                            {/* Color Selector Swatch */}
                            <div className="space-y-2 relative">
                                <div
                                    onClick={() => {
                                        setShowColorPicker(!showColorPicker);
                                    }}
                                    className={`aspect-square rounded-2xl border-2 transition-all cursor-pointer p-1 overflow-hidden flex items-center justify-center ${bgType === 'color' ? 'border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                >
                                    <div className="w-full h-full rounded-xl shadow-inner border border-black/5" style={{ backgroundColor: bgColor }} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 text-center block">Color</span>

                                {/* Color Picker Popup */}
                                {showColorPicker && (
                                    <div className="absolute top-0 left-0 z-[100] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 w-[320px] transition-all duration-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white">Color Picker</h4>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowColorPicker(false);
                                                }}
                                                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                                            >
                                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                    <path d="M18 6L6 18M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div
                                            ref={satRectRef}
                                            onMouseDown={handleSatMouseDown}
                                            onTouchStart={handleSatMouseDown}
                                            className="w-full aspect-video rounded-xl mb-4 relative cursor-crosshair overflow-hidden border border-black/5"
                                            style={{ backgroundColor: curHueHex }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                            <div
                                                className="absolute w-4 h-4 border-2 border-white rounded-full shadow-md -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                                style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
                                            />
                                        </div>

                                        <div className="space-y-4">
                                            <div className="relative h-2 rounded-full hue-spectrum cursor-pointer group">
                                                <input
                                                    type="range"
                                                    min="0" max="1" step="0.001"
                                                    value={hsv.h}
                                                    onChange={(e) => setHsv(prev => ({ ...prev, h: parseFloat(e.target.value) }))}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div
                                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-white shadow-md rounded-full pointer-events-none transition-transform group-hover:scale-110"
                                                    style={{ left: `calc(${hsv.h * 100}% - 8px)` }}
                                                />
                                            </div>

                                            <div className="relative h-2 rounded-full checkered-bg cursor-pointer overflow-hidden group">
                                                <div
                                                    className="absolute inset-0"
                                                    style={{ background: `linear-gradient(to right, transparent, ${bgColor})` }}
                                                />
                                                <input
                                                    type="range"
                                                    min="0" max="1" step="0.01"
                                                    value={alpha}
                                                    onChange={(e) => setAlpha(parseFloat(e.target.value))}
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                />
                                                <div
                                                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-white shadow-md rounded-full pointer-events-none transition-transform group-hover:scale-110"
                                                    style={{ left: `calc(${alpha * 100}% - 8px)` }}
                                                />
                                            </div>

                                            <div className="flex gap-2">
                                                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 border border-gray-100 dark:border-gray-700 flex flex-col">
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Hex</span>
                                                    <input
                                                        type="text"
                                                        value={bgColor}
                                                        onChange={(e) => setBgColor(e.target.value)}
                                                        className="bg-transparent border-none focus:ring-0 text-xs font-bold text-gray-900 dark:text-white w-full uppercase p-0"
                                                    />
                                                </div>
                                                <div className="w-16 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 border border-gray-100 dark:border-gray-700 flex flex-col">
                                                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Alpha</span>
                                                    <span className="text-xs font-bold text-gray-900 dark:text-white">{Math.round(alpha * 100)}%</span>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Saved Colors</span>
                                                    <button
                                                        onClick={() => !savedColors.includes(bgColor) && setSavedColors([...savedColors, bgColor])}
                                                        className="text-[10px] font-bold text-blue-600 hover:text-blue-700"
                                                    >
                                                        + Add
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-7 gap-2">
                                                    {savedColors.map((color, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => {
                                                                setBgColor(color);
                                                                setBgType('color');
                                                            }}
                                                            className={`aspect-square rounded-full border border-black/5 shadow-sm hover:scale-110 transition-transform ${bgColor === color ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''}`}
                                                            style={{ backgroundColor: color }}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Image Swatches */}
                            {bgImages.map((img, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div
                                        onClick={() => {
                                            setBgImage(img);
                                            setBgType('image');
                                        }}
                                        className={`aspect-square rounded-2xl border-2 transition-all cursor-pointer p-1 overflow-hidden flex items-center justify-center ${bgType === 'image' && bgImage === img ? 'border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                    >
                                        <div className="w-full h-full rounded-xl bg-cover bg-center shadow-inner" style={{ backgroundImage: `url(${img})` }} />
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 text-center block line-clamp-1">Image {idx + 1}</span>
                                </div>
                            ))}

                            {/* Add Image Button */}
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                    accept="image/*"
                                    className="hidden"
                                />
                                <div
                                    onClick={() => fileInputRef.current?.click()}
                                    className="aspect-square rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all cursor-pointer flex flex-col items-center justify-center gap-1 group"
                                >
                                    <div className="w-6 h-6 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-blue-500 transition-colors">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4"><path d="M12 5v14M5 12h14" /></svg>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 text-center block">Upload</span>
                            </div>
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><path d="M12 10v6m0 0l-3-3m3 3l3-3m5 2v2a2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" /></svg>
                    Download Image (PNG / JPG)
                </button>
            </div>
        </aside>
    );
};
