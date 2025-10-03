import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { magisteriumQuery, scrapeCatholic } from '../lib/api';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await magisteriumQuery(input);
      const aiMessage: Message = { text: response, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      try {
        const fallback = await scrapeCatholic(input);
        const aiMessage: Message = { text: fallback, sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);
      } catch (fallbackError) {
        const aiMessage: Message = { text: "I'm sorry, I couldn't find an answer. Please try again.", sender: 'ai' };
        setMessages(prev => [...prev, aiMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-warmGold text-navyBlue w-16 h-16 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform"
          aria-label="Open Chatbot"
        >
          <span className="text-2xl">👑</span>
        </button>
      </div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] max-w-md h-[70vh] bg-white rounded-lg shadow-2xl flex flex-col"
          >
            {/* Header */}
            <header className="bg-navyBlue p-4 rounded-t-lg text-white flex justify-between items-center">
              <h3 className="font-heading text-xl">Ask a Padre AI</h3>
              <button onClick={() => setIsOpen(false)} className="text-white text-xl">×</button>
            </header>

            {/* Message Area */}
            <div className="flex-grow p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`} >
                  <div className={`max-w-xs lg:max-w-md p-3 rounded-lg my-1 ${msg.sender === 'user' ? 'bg-navyBlue text-white' : 'bg-gray-200 text-darkText'}`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && <p className="text-center text-gray-500">Thinking...</p>}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about faith, Bible..."
                className="flex-grow p-2 border border-warmGold rounded-l-md focus:outline-none focus:ring-2 focus:ring-warmGold"
              />
              <button onClick={handleSend} className="bg-navyBlue text-white p-3 rounded-r-md hover:bg-blue-800">
                <span className="text-white">➤</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
