'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Send, X, Loader, Cross } from 'lucide-react'

interface ChatMessage {
  id: string
  type: 'user' | 'bot'
  content: string
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'bot',
      content: "✝️ **Peace be with you!** I'm **ASK A PADRE AI**, your Catholic faith companion. I'm here to help answer questions about:\n\n📖 **Scripture & Bible**\n⛪ **Catholic doctrine & teachings**\n🙏 **Saints & their lives**\n💒 **Sacraments & liturgy**\n🌹 **Prayers & devotions**\n\nHow can I assist you in your faith journey today?",
      timestamp: new Date()
    }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const data = await response.json()
      
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: data.response,
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again later, or for urgent spiritual matters, please consult your parish priest directly.\n\n🙏 **Remember:** For personal spiritual guidance, confession, or urgent pastoral care, always speak with a priest in person.",
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessage = (content: string) => {
    // Simple markdown-like formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />')
  }

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className={`chatbot-container ${isOpen ? 'hidden' : 'block'} bg-church-primary hover:bg-church-secondary text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 animate-glow`}
        title="Ask A Padre AI - Catholic Q&A Assistant"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6" />
          <Cross className="w-3 h-3 absolute -top-1 -right-1 text-white" />
        </div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col z-50 max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]"
          >
            {/* Header */}
            <div className="bg-church-primary text-white p-4 rounded-t-lg flex items-center justify-between">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <MessageCircle className="w-5 h-5" />
                  <Cross className="w-2 h-2 absolute -top-0.5 -right-0.5" />
                </div>
                <div>
                  <h3 className="font-semibold">ASK A PADRE AI</h3>
                  <p className="text-xs opacity-90">Catholic Q&A Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-church-primary text-white rounded-br-sm'
                        : 'bg-white text-church-text rounded-bl-sm shadow-sm border'
                    }`}
                  >
                    <div 
                      dangerouslySetInnerHTML={{ 
                        __html: formatMessage(message.content) 
                      }} 
                    />
                    <div className={`text-xs mt-1 opacity-70 ${
                      message.type === 'user' ? 'text-white' : 'text-gray-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-lg rounded-bl-sm flex items-center shadow-sm border">
                    <Loader className="w-4 h-4 animate-spin mr-2 text-church-primary" />
                    <span className="text-sm text-gray-500">ASK A PADRE AI is thinking...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Catholic faith, Bible, saints..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-church-primary focus:border-transparent text-sm"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-church-primary hover:bg-church-secondary disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                ⛪ For personal spiritual matters, always consult your parish priest
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}