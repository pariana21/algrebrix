import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import SafetyModal from '../components/SafetyModal';

function ChatPage() {
  const [showSafetyModal, setShowSafetyModal] = useState(true);

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">
      <div className="smoke-bg absolute inset-0 opacity-20"></div>
      <div className="grid-bg absolute inset-0 opacity-10"></div>
      <Header />

      <main className="flex-1 pt-20 relative z-10">
        <ChatWidget />
      </main>

      <Footer />

      {showSafetyModal && (
        <SafetyModal onClose={() => setShowSafetyModal(false)} />
      )}
    </div>
  );
}

export default ChatPage;
