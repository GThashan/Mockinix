import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PreviewSection } from './components/PreviewSection';
import { EditorSidebar } from './components/EditorSidebar';

function App() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' ||
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [bgType, setBgType] = useState<'color' | 'image'>('color');
  const [bgColor, setBgColor] = useState('#e6a282');
  const [shirtColor, setShirtColor] = useState('#ffffff');
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [bgImages, setBgImages] = useState<string[]>([]);


  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col font-sans transition-colors duration-300 selection:bg-blue-100 dark:selection:bg-blue-900">
      <Header isDark={isDark} toggleTheme={() => setIsDark(!isDark)} />
      <main className="flex flex-1 overflow-hidden">
        <PreviewSection bgType={bgType} bgColor={bgColor} bgImage={bgImage} shirtColor={shirtColor} />
        <EditorSidebar
          bgType={bgType}
          setBgType={setBgType}
          bgColor={bgColor}
          setBgColor={setBgColor}
          shirtColor={shirtColor}
          setShirtColor={setShirtColor}
          bgImage={bgImage}
          setBgImage={setBgImage}
          bgImages={bgImages}
          setBgImages={setBgImages}
        />
      </main>

    </div>
  );
}


export default App;
