import { Header } from './components/Header';
import { PreviewSection } from './components/PreviewSection';
import { EditorSidebar } from './components/EditorSidebar';

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-blue-100">
      <Header />
      <main className="flex flex-1 overflow-hidden">
        <PreviewSection />
        <EditorSidebar />
      </main>
    </div>
  );
}

export default App;
