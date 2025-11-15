import { ArrowRight, Brain, Search, Shield, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div className="smoke-bg absolute inset-0 opacity-30"></div>
      <Header />

      <section className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-gray-800/80 text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-gray-700">
            <Zap className="w-4 h-4" />
            Beta Version
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Autonomous. Intelligent.<br />
            <span className="text-gray-300">Everywhere.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
            Your personal AI research and math assistant
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/chat"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-all shadow-lg hover:shadow-2xl"
            >
              Enter Lab
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-900 transition-colors border-2 border-gray-700"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-white" />}
              title="Advanced Math Solver"
              description="Get step-by-step solutions to complex mathematical problems with clear explanations at every stage."
            />

            <FeatureCard
              icon={<Search className="w-8 h-8 text-white" />}
              title="Web Research Agent"
              description="Automatically search, extract, and synthesize information from multiple web sources with downloadable CSV reports."
            />

            <FeatureCard
              icon={<Shield className="w-8 h-8 text-white" />}
              title="Privacy & Security"
              description="Your data stays secure. We never request credentials, perform logins, or access sensitive information."
            />
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-black border-y border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            About Algebrix.ai Beta
          </h2>

          <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 shadow-2xl border border-gray-800">
            <p className="text-gray-300 leading-relaxed mb-4">
              <strong className="text-white">Algebrix.ai Beta</strong> is a cutting-edge autonomous AI agent designed
              to revolutionize how users interact with information and tackle complex tasks.
            </p>

            <p className="text-gray-300 leading-relaxed mb-4">
              Unlike traditional chatbots, Algebrix doesn't limit itself to simple text inputs.
              It uses advanced AI models to independently conduct research, solve mathematical
              problems, and analyze web content.
            </p>

            <p className="text-gray-300 leading-relaxed">
              With integrated web scraping technology, Algebrix can extract relevant data from various sources,
              intelligently summarize it, and provide it in structured formats like CSV.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-black text-white border-t border-gray-800 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl mb-8 text-gray-400">
            Join the Algebrix Beta and discover what autonomous AI can do for you.
          </p>
          <a
            href="/chat"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-200 transition-colors shadow-lg"
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
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 hover:shadow-2xl transition-all border border-gray-700 hover:border-gray-500">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

export default LandingPage;