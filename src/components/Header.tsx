function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-md border-b border-gray-800 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <img
            src="/Untitled design.png"
            alt="Algebrix.ai Logo"
            className="h-16 w-16 object-cover rounded-lg"
          />
        </a>

        <nav className="flex items-center gap-6">
          <a
            href="/"
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Home
          </a>
          <a
            href="/chat"
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Lab
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
