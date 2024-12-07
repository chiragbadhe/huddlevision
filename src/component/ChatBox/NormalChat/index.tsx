import React, { useState } from "react";
import { User, Send, MessageCircle } from "lucide-react";
import { useDataMessage, useLocalPeer } from "@huddle01/react/hooks";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

export type TMessage = {
  text: string;
  sender: string;
};

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [text, setText] = useState<string>("");

  const { peerId } = useLocalPeer();
  const { sendData } = useDataMessage({
    onMessage: (payload, from, label) => {
      if (label === "chat") {
        // Only add message if it's from another peer
        if (from !== peerId) {
          setMessages((prev) => [...prev, { text: payload, sender: from }]);
        }
      }
    },
  });

  const sendMessage = () => {
    if (!text.trim()) return;

    // Send message to other peers
    sendData({
      to: "*",
      payload: text,
      label: "chat",
    });

    // Add message to local state
    setMessages((prev) => [...prev, { text, sender: peerId || "" }]);
    setText("");
  };

  return (
    <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-200 h-[330px]">
      <div className="border-b pb-[12px] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-teal-500" />
          <span className="font-medium text-gray-900">Chat</span>
        </div>
        <div className="text-xs text-gray-500">
          {messages.length} messages
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 bg-white scrollbar-track-transparent p-4 rounded-lg">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageBubble
              key={index}
              message={message}
              isOwnMessage={message.sender === peerId}
            />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-gray-500">
            <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm font-medium">No messages yet</p>
            <p className="text-xs opacity-75">Be the first to send a message!</p>
          </div>
        )}
      </div>

      <ChatInput 
        text={text}
        setText={setText}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default Chat;
