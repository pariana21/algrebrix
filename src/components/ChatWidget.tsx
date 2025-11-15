import { useState, useRef, useEffect } from 'react';
import { Send, Search, Loader2 } from 'lucide-react';
import AgentResults from './AgentResults';
import MathSteps from './MathSteps';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentResults?: any;
  timestamp: Date;
}

function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentStatus, setAgentStatus] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleAgentSearch = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: `🔍 Search & Summarize: ${input}`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setAgentStatus('Searching...');

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: input })
      });

      setAgentStatus('Extracting pages...');

      const data = await response.json();

      setAgentStatus('Generating CSV...');

      if (data.success) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.summary,
          agentResults: {
            results: data.results,
            csvUrl: data.csvUrl
          },
          timestamp: new Date()
        };
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        throw new Error(data.error || 'Failed to process agent request');
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Agent Error: ${error instanceof Error ? error.message : 'Something went wrong'}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
      setAgentStatus('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-12rem)] flex flex-col p-4">
      <div className="mb-4 bg-gradient-to-r from-gray-900 to-black border border-gray-700 rounded-lg px-6 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold text-lg">Research Lab</h2>
            <p className="text-gray-400 text-xs">AI-Powered Analysis Workspace</p>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-gray-400">System Active</span>
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto mb-4 space-y-4 bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-2xl p-6 border border-gray-800">
        {messages.length === 0 && (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg mb-2 text-white">Welcome to the Research Lab</p>
            <p className="text-sm">Initialize your research query or activate Search & Summarize protocol.</p>
          </div>
        )}

        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-3xl rounded-lg px-4 py-3 border ${
                message.role === 'user'
                  ? 'bg-white text-black border-gray-300'
                  : 'bg-gray-800 text-white border-gray-700'
              }`}
            >
              <MathSteps content={message.content} />

              {message.agentResults && (
                <AgentResults
                  results={message.agentResults.results}
                  csvUrl={message.agentResults.csvUrl}
                />
              )}

              <p className="text-xs opacity-70 mt-2">
                {message.timestamp.toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}

        {loading && agentStatus && (
          <div className="flex items-center gap-2 text-white">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm font-medium">{agentStatus}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-black rounded-lg shadow-2xl p-4 border border-gray-800">
        <div className="flex gap-2 mb-2">
          <button
            onClick={handleAgentSearch}
            disabled={loading || !input.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
          >
            <Search className="w-4 h-4" />
            Search & Summarize
          </button>
        </div>

        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter research query or analysis request..."
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
            rows={2}
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWidget;
