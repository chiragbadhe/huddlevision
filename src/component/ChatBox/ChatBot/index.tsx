import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatInput from "../NormalChat/ChatInput";
import OpenAI from "openai";
import Typewriter from "typewriter-effect";

type Message = {
  text: string;
  isBot: boolean;
  sentTimestamp: string;
  receivedTimestamp?: string;
  loading?: boolean;
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const sendMessage = async () => {
    if (!text.trim()) return;

    const sentTimestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add user message
    const userMessage = { text, isBot: false, sentTimestamp };
    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setIsLoading(true);

    // Add loading message
    const loadingMessage = {
      text: "",
      isBot: true,
      loading: true,
      sentTimestamp: sentTimestamp,
    };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: text }],
        model: "gpt-3.5-turbo",
      });

      console.log(completion)

      const botResponse =
        completion.choices[0]?.message?.content ||
        "Sorry, I couldn't process that.";

      const receivedTimestamp = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      // Replace loading message with actual response
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          text: botResponse,
          isBot: true,
          sentTimestamp: receivedTimestamp,
          receivedTimestamp,
        };
        return newMessages;
      });
    } catch (error) {
      // Replace loading message with error message
      setMessages((prev) => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1] = {
          text: "Sorry, there was an error processing your request.",
          isBot: true,
          sentTimestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-100 rounded-lg border border-gray-200 h-[330px]">
      <div className="border-b pb-[12px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-teal-500" />
          <span className="font-medium text-gray-900">AI Chat</span>
        </div>
        <div className="text-xs text-gray-500">{messages.length} messages</div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 bg-white border scrollbar-track-transparent p-4 rounded-lg">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                message.isBot ? "items-start" : "items-end"
              }`}
            >
              <div className="text-xs text-gray-400 mb-1">
                {message.isBot ? (
                  <>
                    <span>Response: {message.receivedTimestamp}</span>
                  </>
                ) : (
                  <span>Sent: {message.sentTimestamp}</span>
                )}
              </div>
              <div
                className={`max-w-[80%] px-4 py-2 rounded-lg ${
                  message.isBot
                    ? "bg-gray-100 text-gray-900"
                    : "bg-teal-500 text-white"
                }`}
              >
                {message.loading ? (
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                  </div>
                ) : message.isBot ? (
                  <Typewriter
                    options={{
                      delay: 30,
                      cursor: "",
                    }}
                    onInit={(typewriter) => {
                      typewriter.typeString(message.text).start();
                    }}
                  />
                ) : (
                  message.text
                )}
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

      <ChatInput
        text={text}
        setText={setText}
        sendMessage={sendMessage}
        disabled={isLoading}
      />
    </div>
  );
};

export default ChatBot;
