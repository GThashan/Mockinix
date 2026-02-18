import { useState, Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei';
import { TShirtModel } from './TShirtModel';

function CameraManager({ view }: { view: string }) {
    const orbitRef = useRef<any>(null);

    useEffect(() => {
        if (!orbitRef.current) return;

        if (view === 'front') {
            orbitRef.current.setAzimuthalAngle(0);
            orbitRef.current.update();
        } else if (view === 'back') {
            orbitRef.current.setAzimuthalAngle(Math.PI);
            orbitRef.current.update();
        }
    }, [view]);

    return (
        <OrbitControls
            ref={orbitRef}
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 2}
        />
    );
}

export const PreviewSection = ({ bgType, bgColor, bgImage, shirtColor }: { bgType: 'color' | 'image', bgColor: string, bgImage: string | null, shirtColor: string }) => {
    const [view, setView] = useState('front');

    return (
        <div className="relative flex-1 bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center overflow-hidden transition-colors duration-300">
            <div className="absolute top-8 left-8 z-10">
                <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-gray-100 dark:border-gray-800 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wider">Live 3D Preview</span>
                </div>
            </div>

            {/* Main Mockup Display */}
            <div className="w-full h-full relative overflow-hidden transition-all duration-700">
                <div
                    className="w-full h-full absolute inset-0 flex items-center justify-center"
                    style={{
                        backgroundColor: bgType === 'color' ? bgColor : undefined,
                        backgroundImage: bgType === 'image' && bgImage ? `url(${bgImage})` : undefined,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <Canvas shadows camera={{ position: [0, 0, 5], fov: 40 }}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                        <pointLight position={[-10, -10, -10]} />

                        <Suspense fallback={null}>
                            <TShirtModel color={shirtColor} />
                            <Environment preset="city" />
                            <ContactShadows position={[0, -3.5, 0]} opacity={0.5} scale={10} blur={1.5} far={0.8} />
                        </Suspense>

                        <CameraManager view={view} />
                    </Canvas>
                </div>
            </div>



            {/* View Toggles and Control Bar */}
            <div className="absolute bottom-8 flex flex-col items-center gap-4 w-full px-8">
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
