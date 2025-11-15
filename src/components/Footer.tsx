import { Shield } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Algebrix.ai Beta</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your autonomous AI research and math assistant. Intelligent, secure, and always ready to help.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-sm hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/chat" className="text-sm hover:text-white transition-colors">
                  Chat
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security Promise
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Algebrix will NEVER request account credentials, perform login actions, or make purchases on your behalf.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Algebrix.ai Beta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
