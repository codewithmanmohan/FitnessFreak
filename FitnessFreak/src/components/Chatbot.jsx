import React, { useState } from "react";
import { Send, MessageCircle, X, Zap } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your fitness assistant. How can I help you today?",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = [
    "Workout tips",
    "Nutrition advice",
    "Supplement info",
    "Schedule training",
  ];

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { id: messages.length + 1, text: input, sender: "user" },
    ];

    setMessages(newMessages);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Great question! Here's what I recommend...",
        "That's a great point. Let me help you with that.",
        "I can help you with that. Try incorporating more...",
        "Excellent! Here are some tips for you...",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          text: randomResponse,
          sender: "ai",
        },
      ]);
    }, 500);
  };

  return (
    <>
      {/* Chat Widget */}
      <div
        className={`fixed bottom-4 right-4 transition-all duration-300 z-50 ${
          isOpen ? "w-96" : "w-0"
        }`}
      >
        {isOpen && (
          <div className="bg-[#0f172a] rounded-2xl shadow-2xl border border-[#22c55e]/30 flex flex-col h-96 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#22c55e] to-[#38bdf8] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-white" />
                <h3 className="font-bold text-white">AI Fitness Coach</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "user"
                        ? "bg-[#22c55e] text-white rounded-br-none"
                        : "bg-[#1e293b] text-gray-100 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-3 border-t border-slate-600">
                <p className="text-xs text-gray-400 mb-2">Quick suggestions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {suggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(suggestion);
                      }}
                      className="text-xs px-3 py-1 bg-slate-600 text-gray-300 rounded hover:bg-slate-500 transition"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-slate-600 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-slate-600 text-white placeholder-gray-400 rounded-lg px-3 py-2 border border-slate-500 focus:border-cyan-500 focus:outline-none transition text-sm"
              />
              <button
                onClick={sendMessage}
                className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Float Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all flex items-center justify-center group z-50"
        >
          <MessageCircle className="w-6 h-6 group-hover:scale-110 transition" />
        </button>
      )}
    </>
  );
};

export default Chatbot;
