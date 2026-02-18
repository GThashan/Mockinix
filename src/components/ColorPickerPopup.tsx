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

const rgbToHex = (r: number, g: number, b: number) =>
    "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();

const hexToHsv = (hex: string): { h: number; s: number; v: number } => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return { h: 0, s: 0, v: 1 };
    const r = parseInt(result[1], 16) / 255;
    const g = parseInt(result[2], 16) / 255;
    const b = parseInt(result[3], 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const d = max - min;
    const v = max;
    const s = max === 0 ? 0 : d / max;
    let h = 0;
    if (max !== min) {
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return { h, s, v };
};

interface ColorPickerPopupProps {
    color: string;
    title?: string;
    onChange: (hex: string) => void;
    onClose: () => void;
    savedColors: string[];
    onSaveColor: (hex: string) => void;
}

export const ColorPickerPopup = ({
    color,
    title = 'Color Picker',
    onChange,
    onClose,
    savedColors,
    onSaveColor,
}: ColorPickerPopupProps) => {
    const [hsv, setHsv] = useState(() => hexToHsv(color));
    const [alpha, setAlpha] = useState(1);
    const [hexInput, setHexInput] = useState(color);
    const satRectRef = useRef<HTMLDivElement>(null);

    // Sync outgoing color when HSV changes
    useEffect(() => {
        const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
        setHexInput(hex);
        onChange(hex);
    }, [hsv]);

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
        move(e.nativeEvent as any);
    };

    const handleHexInput = (val: string) => {
        setHexInput(val);
        if (/^#[0-9a-fA-F]{6}$/.test(val)) {
            setHsv(hexToHsv(val));
            onChange(val);
        }
    };

    const curHueRgb = hsvToRgb(hsv.h, 1, 1);
    const curHueHex = rgbToHex(curHueRgb.r, curHueRgb.g, curHueRgb.b);
    const currentColor = (() => {
        const rgb = hsvToRgb(hsv.h, hsv.s, hsv.v);
        return rgbToHex(rgb.r, rgb.g, rgb.b);
    })();

    return (
        <div className="absolute top-0 left-0 z-[100] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 p-6 w-[320px]">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{title}</h4>
                <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Saturation / Value Box */}
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
                {/* Hue Slider */}
                <div className="relative h-3 rounded-full cursor-pointer group" style={{ background: 'linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00)' }}>
                    <input
                        type="range" min="0" max="1" step="0.001" value={hsv.h}
                        onChange={(e) => setHsv(prev => ({ ...prev, h: parseFloat(e.target.value) }))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-white shadow-md rounded-full pointer-events-none transition-transform group-hover:scale-110"
                        style={{ left: `calc(${hsv.h * 100}% - 8px)` }}
                    />
                </div>

                {/* Alpha Slider */}
                <div className="relative h-3 rounded-full cursor-pointer overflow-hidden group checkered-bg">
                    <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${currentColor})` }} />
                    <input
                        type="range" min="0" max="1" step="0.01" value={alpha}
                        onChange={(e) => setAlpha(parseFloat(e.target.value))}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-white shadow-md rounded-full pointer-events-none transition-transform group-hover:scale-110"
                        style={{ left: `calc(${alpha * 100}% - 8px)` }}
                    />
                </div>

                {/* Hex + Alpha fields */}
                <div className="flex gap-2">
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 border border-gray-100 dark:border-gray-700 flex flex-col">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Hex</span>
                        <input
                            type="text"
                            value={hexInput}
                            onChange={(e) => handleHexInput(e.target.value)}
                            className="bg-transparent border-none focus:ring-0 text-xs font-bold text-gray-900 dark:text-white w-full uppercase p-0"
                        />
                    </div>
                    <div className="w-16 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2 border border-gray-100 dark:border-gray-700 flex flex-col">
                        <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wider">Alpha</span>
                        <span className="text-xs font-bold text-gray-900 dark:text-white">{Math.round(alpha * 100)}%</span>
                    </div>
                </div>

                {/* Saved Colors */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase">Saved Colors</span>
                        <button
                            onClick={() => onSaveColor(currentColor)}
                            className="text-[10px] font-bold text-blue-600 hover:text-blue-700"
                        >
                            + Add
                        </button>
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                        {savedColors.map((c, i) => (
                            <button
                                key={i}
                                onClick={() => { setHsv(hexToHsv(c)); onChange(c); }}
                                className={`aspect-square rounded-full border border-black/5 shadow-sm hover:scale-110 transition-transform ${currentColor === c ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900' : ''}`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
