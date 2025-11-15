import { ArrowRight, Brain, Search, Shield, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Beta Version
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Autonomous. Intelligent.<br />
            <span className="text-blue-600">Everywhere.</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Your personal AI research and math assistant
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/chat"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Start Chatting
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-white text-slate-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-slate-200"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-blue-600" />}
              title="Advanced Math Solver"
              description="Get step-by-step solutions to complex mathematical problems with clear explanations at every stage."
            />

            <FeatureCard
              icon={<Search className="w-8 h-8 text-blue-600" />}
              title="Web Research Agent"
              description="Automatically search, extract, and synthesize information from multiple web sources with downloadable CSV reports."
            />

            <FeatureCard
              icon={<Shield className="w-8 h-8 text-blue-600" />}
              title="Privacy & Security"
              description="Your data stays secure. We never request credentials, perform logins, or access sensitive information."
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-8">
            Über Algebrix.ai Beta
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-lg">
            <p className="text-slate-700 leading-relaxed mb-4">
              <strong>Algebrix.ai Beta</strong> ist ein hochmoderner, autonomer KI-Agent, der entwickelt wurde,
              um die Art und Weise zu revolutionieren, wie Nutzer mit Informationen interagieren und komplexe
              Aufgaben bewältigen.
            </p>

            <p className="text-slate-700 leading-relaxed mb-4">
              Im Gegensatz zu herkömmlichen Chatbots beschränkt sich Algebrix nicht auf einfache Texteingaben.
              Es nutzt fortschrittliche KI-Modelle, um eigenständig Recherchen durchzuführen, mathematische
              Probleme zu lösen und Webinhalte zu analysieren.
            </p>

            <p className="text-slate-700 leading-relaxed">
              Mit integrierter Web-Scraping-Technologie kann Algebrix relevante Daten aus verschiedenen Quellen
              extrahieren, diese intelligent zusammenfassen und in strukturierten Formaten wie CSV bereitstellen.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join the Algebrix Beta and discover what autonomous AI can do for you.
          </p>
          <a
            href="/chat"
            className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-shadow border border-slate-200">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default LandingPage;
