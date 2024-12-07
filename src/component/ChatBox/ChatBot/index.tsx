import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatInput from "../NormalChat/ChatInput";

type Message = {
  text: string;
  isBot: boolean;
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  const sendMessage = async () => {
    if (!text.trim()) return;
    // Add user message
    const userMessage = { text, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setText("");
    // Simulate bot response
    // TODO: Replace with actual AI integration
    setTimeout(() => {
      const botMessage = {
        text: "This is a simulated bot response. AI integration coming soon!",
        isBot: true
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200 h-[330px]">
      <div className="border-b pb-[12px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-teal-500" />
          <span className="font-medium text-gray-900">AI Chat</span>
        </div>
        <div className="text-xs text-gray-500">
          {messages.length} messages
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 bg-white scrollbar-track-transparent p-4 rounded-lg">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.isBot
                    ? "bg-gray-100 text-gray-900"
                    : "bg-teal-500 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs opacity-75">Ask me anything!</p>
          </div>
        )}
      </div>

      <ChatInput text={text} setText={setText} sendMessage={sendMessage} />
    </div>
  );
};

export default ChatBot;
