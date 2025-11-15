function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/Untitled design.png"
            alt="Algebrix.ai Logo"
            className="h-10 w-auto"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-900">Algebrix.ai</h1>
            <p className="text-xs text-slate-500">Beta</p>
          </div>
        </a>

        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Home
          </a>
          <a
            href="/chat"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Chat
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
