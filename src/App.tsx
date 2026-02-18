function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-700 animate-in fade-in zoom-in duration-700">
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Vite + React
        </h1>
        <p className="text-gray-400 text-lg mb-6">
          TypeScript & Tailwind CSS are ready to go!
        </p>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors cursor-pointer capitalize">
            Modern UI
          </div>
          <div className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-medium transition-colors cursor-pointer capitalize">
            Fast Build
          </div>
        </div>
      </div>
      <p className="mt-8 text-gray-500 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
