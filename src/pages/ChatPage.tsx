import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';
import SafetyModal from '../components/SafetyModal';

function ChatPage() {
  const [showSafetyModal, setShowSafetyModal] = useState(true);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header />

      <main className="flex-1 pt-20">
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
