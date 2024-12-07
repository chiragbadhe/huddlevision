import { User } from "lucide-react";
import { TMessage } from "../NormalChat";

interface MessageBubbleProps {
  message: TMessage;
  isOwnMessage: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwnMessage,
}) => {
  return (
    <div className={`flex gap-3 ${isOwnMessage ? "justify-end" : ""}`}>
      {!isOwnMessage && (
        <div className="p-2 bg-teal-50 rounded-full h-fit shadow-sm">
          <User className="w-5 h-5 text-teal-600" />
        </div>
      )}
      <div className="flex-1 max-w-[80%]">
        <div
          className={`text-xs text-gray-500 mb-1 ${
            isOwnMessage ? "text-right" : ""
          }`}
        >
          {isOwnMessage ? "You" : `Peer #${message.sender.slice(0, 8)}`}
        </div>
        <p
          className={`text-sm text-gray-700 p-3 rounded-lg border shadow-sm ${
            isOwnMessage
              ? "bg-teal-50 rounded-tr-none border-teal-200 ml-auto"
              : "bg-white rounded-tl-none border-gray-200"
          }`}
        >
          {message.text}
        </p>
      </div>
      {isOwnMessage && (
        <div className="p-2 bg-teal-100 rounded-full h-fit shadow-sm">
          <User className="w-5 h-5 text-teal-600" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
