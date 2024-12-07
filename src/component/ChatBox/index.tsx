import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import NormalChat from "./NormalChat";
import ChatBoxButton from "./ChatBoxButton";
import ChatBot from "./ChatBot";

const Chat: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"normal" | "ai">("normal");

  return (
    <div className="flex flex-col">
      <div className="w-full space-y-4 mt-[16px] flex flex-col">
        <div className="flex gap-1 p-1 bg-gray-200 rounded-lg border">
          <ChatBoxButton
            label="Normal Chat"
            isActive={activeTab === "normal"}
            onClick={() => setActiveTab("normal")}
          />
          <ChatBoxButton
            label="AI Chatbot"
            isActive={activeTab === "ai"}
            onClick={() => setActiveTab("ai")}
          />
        </div>

        {activeTab === "normal" ? <NormalChat /> : <ChatBot />}
      </div>
    </div>
  );
};

export default Chat;
