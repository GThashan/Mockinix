import { useState, useRef } from 'react';
import { ColorPickerPopup } from './ColorPickerPopup';

const DEFAULT_SAVED_COLORS = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'];

export const EditorSidebar = ({
    bgType, setBgType, bgColor, setBgColor, shirtColor, setShirtColor, bgImage, setBgImage, bgImages, setBgImages
}: {
    bgType: 'color' | 'image',
    setBgType: (t: 'color' | 'image') => void,
    bgColor: string,
    setBgColor: (c: string) => void,
    shirtColor: string,
    setShirtColor: (c: string) => void,
    bgImage: string | null,
    setBgImage: (i: string | null) => void,
    bgImages: string[],
    setBgImages: (imgs: string[]) => void
}) => {
    const [showBgColorPicker, setShowBgColorPicker] = useState(false);
    const [showShirtColorPicker, setShowShirtColorPicker] = useState(false);
    const [savedColors, setSavedColors] = useState(DEFAULT_SAVED_COLORS);

    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const handleSaveColor = (hex: string) => {
        if (!savedColors.includes(hex)) {
            setSavedColors(prev => [...prev, hex]);
        }
    };

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
                            <div className="flex flex-wrap gap-3 relative">
                                {[
                                    { name: 'White', class: 'bg-white', value: '#ffffff' },
                                    { name: 'Black', class: 'bg-gray-900', value: '#111827' },
                                    { name: 'Blue', class: 'bg-blue-600', value: '#2563eb' },
                                    { name: 'Red', class: 'bg-rose-500', value: '#f43f5e' },
                                    { name: 'Green', class: 'bg-emerald-600', value: '#059669' },
                                    { name: 'Amber', class: 'bg-amber-500', value: '#f59e0b' }
                                ].map((color, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setShirtColor(color.value)}
                                        className={`w-8 h-8 rounded-full border border-gray-100 dark:border-gray-700 shadow-sm transition-transform hover:scale-110 ${color.class} ${shirtColor === color.value ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900 scale-110' : ''}`}
                                        title={color.name}
                                    />
                                ))}

                                {/* Custom color picker trigger */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowShirtColorPicker(v => !v)}
                                        title="Custom color"
                                        className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center text-gray-400 dark:text-gray-500 text-lg hover:border-blue-400 hover:text-blue-500 transition-all"
                                        style={shirtColor && !['#ffffff', '#111827', '#2563eb', '#f43f5e', '#059669', '#f59e0b'].includes(shirtColor) ? { backgroundColor: shirtColor, border: '2px solid transparent' } : undefined}
                                    >
                                        {shirtColor && !['#ffffff', '#111827', '#2563eb', '#f43f5e', '#059669', '#f59e0b'].includes(shirtColor) ? null : '+'}
                                    </button>

                                    {showShirtColorPicker && (
                                        <ColorPickerPopup
                                            color={shirtColor}
                                            title="Garment Color"
                                            onChange={(hex) => { setShirtColor(hex); }}
                                            onClose={() => setShowShirtColorPicker(false)}
                                            savedColors={savedColors}
                                            onSaveColor={handleSaveColor}
                                        />
                                    )}
                                </div>
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
                                    onClick={() => { setShowBgColorPicker(!showBgColorPicker); setBgType('color'); }}
                                    className={`aspect-square rounded-2xl border-2 transition-all cursor-pointer p-1 overflow-hidden flex items-center justify-center ${bgType === 'color' ? 'border-blue-500 shadow-lg shadow-blue-100 dark:shadow-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
                                >
                                    <div className="w-full h-full rounded-xl shadow-inner border border-black/5" style={{ backgroundColor: bgColor }} />
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 text-center block">Color</span>

                                {/* Background Color Picker Popup */}
                                {showBgColorPicker && (
                                    <ColorPickerPopup
                                        color={bgColor}
                                        title="Background Color"
                                        onChange={(hex) => { setBgColor(hex); setBgType('color'); }}
                                        onClose={() => setShowBgColorPicker(false)}
                                        savedColors={savedColors}
                                        onSaveColor={handleSaveColor}
                                    />
                                )}
                            </div>

                            {/* Image Swatches */}
                            {bgImages.map((img, idx) => (
                                <div key={idx} className="space-y-2">
                                    <div
                                        onClick={() => { setBgImage(img); setBgType('image'); }}
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
