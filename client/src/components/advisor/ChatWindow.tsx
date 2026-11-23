import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Shield, AlertCircle, RefreshCw, Compass } from 'lucide-react';
import { useEnvironmental } from '../../context/EnvironmentalContext';
import { useProfile } from '../../context/ProfileContext';
import { api } from '../../services/api';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  sources?: string[];
  limitations?: string[];
  timestamp: string;
}

export const ChatWindow: React.FC = () => {
  const { location, airQuality, weather } = useEnvironmental();
  const { profile } = useProfile();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I am your **AirAware AI Environmental & Smog Advisor**.\n\nI am currently tracking conditions in **${location.name}** (AQI: ${airQuality?.aqi ?? '...'}, ${airQuality?.category ?? '...'}).\n\nAsk me anything about safe outdoor activities, optimal window ventilation timings, low-cost air cleaning, commute safety, or protecting your household members.`,
      sources: ['Open-Meteo Air Quality (CAMS)', 'WHO Global Air Quality Guidelines'],
      limitations: ['Informational only; not clinical medical diagnosis.'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    'Is it safe to walk or exercise outdoors right now?',
    'When should I open my windows today?',
    'How can I commute during severe smog?',
    'How can I improve indoor air quality without an air purifier?',
    'How do I protect children and elderly members in this smog?',
    'What low-cost changes can our family make today?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isLoading) return;

    const userMsg: Message = {
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const history = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await api.sendChatMessage(
        history,
        location.latitude,
        location.longitude,
        location.name
      );

      const botMsg: Message = {
        role: 'assistant',
        content: res.reply,
        sources: res.sources,
        limitations: res.limitations,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        role: 'assistant',
        content: `I encountered an issue processing your request: ${err?.message || 'Network error'}. Please try again.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      className="max-w-4xl mx-auto rounded-2xl bg-[var(--bg-card)] border border-[var(--border-main)] shadow-sm overflow-hidden flex flex-col h-[75vh]"
      aria-label="Personalized AI Advisor Conversation"
    >
      {/* Advisor Header */}
      <header className="p-4 border-b border-[var(--border-main)] bg-[var(--bg-card-secondary)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
              Context-Aware AI Smog Advisor
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                Grounded
              </span>
            </h2>
            <p className="text-xs text-[var(--text-muted)]">
              Grounded in {location.city} live metrics (AQI: {airQuality?.aqi ?? '--'}) & household settings
            </p>
          </div>
        </div>

        <button
          onClick={() => setMessages([messages[0]])}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1.5 rounded-lg border border-[var(--border-main)] hover:bg-[var(--bg-hover)]"
          title="Reset conversation"
        >
          Clear Chat
        </button>
      </header>

      {/* Messages list */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((m, idx) => {
          const isUser = m.role === 'user';
          return (
            <div 
              key={idx}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs shadow-sm mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                isUser 
                  ? 'bg-emerald-600 text-white rounded-br-none shadow-sm' 
                  : 'bg-[var(--bg-card-secondary)] text-[var(--text-main)] border border-[var(--border-main)] rounded-bl-none shadow-sm'
              }`}>
                {/* Content formatted with basic line breaks and markdown bolding */}
                <div className="whitespace-pre-line space-y-2">
                  {m.content}
                </div>

                {/* Sources & Limitations metadata for AI messages */}
                {!isUser && (m.sources || m.limitations) && (
                  <div className="mt-3 pt-3 border-t border-[var(--border-main)]/60 text-[11px] text-[var(--text-subtle)] space-y-1">
                    {m.sources && m.sources.length > 0 && (
                      <div>
                        <strong>Verified Data Sources:</strong> {m.sources.join(' • ')}
                      </div>
                    )}
                    {m.limitations && m.limitations.length > 0 && (
                      <div className="italic text-[10px]">
                        <strong>Notice:</strong> {m.limitations.join(' ')}
                      </div>
                    )}
                  </div>
                )}

                <span className={`block text-[10px] mt-2 ${isUser ? 'text-emerald-100' : 'text-[var(--text-subtle)]'}`}>
                  {m.timestamp}
                </span>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-[var(--bg-hover)] border border-[var(--border-main)] text-[var(--text-main)] flex items-center justify-center shrink-0 text-xs shadow-sm mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs shadow-sm">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-[var(--bg-card-secondary)] border border-[var(--border-main)] rounded-2xl rounded-bl-none p-4 text-xs text-[var(--text-muted)] flex items-center gap-2 shadow-sm">
              <RefreshCw className="w-4 h-4 animate-spin text-emerald-600" />
              <span>Analyzing ambient particulate curves and household vulnerabilities...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Chips */}
      <div className="px-4 py-2 border-t border-[var(--border-main)] bg-[var(--bg-card)] overflow-x-auto scrollbar-none flex gap-2">
        {suggestedPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => handleSend(p)}
            className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full border border-[var(--border-main)] bg-[var(--bg-card-secondary)] hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors shrink-0"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form 
        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
        className="p-3 sm:p-4 border-t border-[var(--border-main)] bg-[var(--bg-card-secondary)] flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about smog protection, window schedule, or mask use..."
          className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border-main)] bg-[var(--bg-card)] text-sm text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-50 transition-colors shadow-sm"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </section>
  );
};
