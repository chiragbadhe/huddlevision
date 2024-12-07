import { Send } from "lucide-react";

interface ChatInputProps {
  text: string;
  setText: (text: string) => void;
  sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  text,
  setText,
  sendMessage,
}) => {
  return (
    <div className="flex gap-2 pt-2 border-t">
      <input
        type="text"
        placeholder="Type your message..."
        className="flex-1 px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
      />
      <button
        className="p-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={sendMessage}
        disabled={!text.trim()}
      >
        <Send className="w-5 h-5" />
      </button>
    </div>
  );
};

export default ChatInput;
