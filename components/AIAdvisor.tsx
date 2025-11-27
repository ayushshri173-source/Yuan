import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { getFinancialAdvice } from '../services/geminiService';
import { Fund, Transaction } from '../types';

interface AIAdvisorProps {
    funds: Fund[];
    transactions: Transaction[];
}

const AIAdvisor: React.FC<AIAdvisorProps> = ({ funds, transactions }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
        {role: 'ai', text: 'Hello! I am your KingPay Financial Advisor. Ask me about your gaming funds, stock performance, or for general savings advice.'}
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = async () => {
        if (!query.trim()) return;

        const userMsg = query;
        setQuery('');
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setIsLoading(true);

        const response = await getFinancialAdvice(funds, transactions, userMsg);
        
        setMessages(prev => [...prev, { role: 'ai', text: response }]);
        setIsLoading(false);
    };

    return (
        <>
            {/* Floating Trigger Button */}
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 ${isOpen ? 'scale-0 opacity-0' : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-slate-900'}`}
            >
                <Bot size={28} />
            </button>

            {/* Chat Interface */}
            <div className={`fixed bottom-6 right-6 w-80 md:w-96 bg-slate-900 border border-yellow-500/30 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`} style={{ maxHeight: '600px', height: '80vh' }}>
                
                {/* Header */}
                <div className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-yellow-500/20 rounded-lg">
                            <Sparkles size={18} className="text-yellow-500" />
                        </div>
                        <h3 className="font-bold text-white">KingPay AI</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900/95">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                                msg.role === 'user' 
                                ? 'bg-yellow-600 text-white rounded-tr-none' 
                                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="bg-slate-800 px-4 py-3 rounded-2xl rounded-tl-none border border-slate-700 flex items-center gap-2">
                                <Loader2 size={16} className="animate-spin text-yellow-500" />
                                <span className="text-xs text-slate-400">Thinking...</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-3 bg-slate-800 border-t border-slate-700">
                    <div className="flex items-center gap-2 bg-slate-900 rounded-xl p-1 border border-slate-700 focus-within:border-yellow-500/50 transition-colors">
                        <input 
                            type="text" 
                            className="flex-1 bg-transparent px-3 py-2 text-sm text-white focus:outline-none placeholder:text-slate-500"
                            placeholder="Ask for advice..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={isLoading || !query.trim()}
                            className="p-2 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send size={16} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AIAdvisor;
