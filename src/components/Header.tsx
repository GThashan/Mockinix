export const Header = () => {
    return (
        <header className="h-16 border-b border-gray-100 flex items-center justify-between px-6 bg-white sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
                        <path d="M12 4v16m8-8H4" />
                    </svg>
                </div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">Mockinix</span>
            </div>

            {/* <nav className="flex items-center gap-8">
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Projects</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Templates</a>
                <a href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Assets</a>
                <div className="h-4 w-px bg-gray-200 mx-2" />
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">Save Project</button>
                <div className="w-8 h-8 rounded-full bg-orange-100 overflow-hidden border border-orange-200">
             
                    <div className="w-full h-full flex items-center justify-center text-xs text-orange-600 font-bold">JD</div>
                </div>
            </nav> */}
        </header>
    );
};
