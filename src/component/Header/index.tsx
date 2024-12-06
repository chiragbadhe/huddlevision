import { useRoom } from "@huddle01/react/hooks";
import { Video, Wallet } from "lucide-react";

const Header = () => {
  const { state } = useRoom({});

  return (
    <header className="flex justify-between items-center p-4 border-b border-teal-500 bg-gradient-to-r from-white to-gray-100 backdrop-blur-sm">
      <div className="flex items-center justify-center space-x-4">
        <div className="flex items-center group">
          <Video className="w-8 h-8 text-teal-500 mr-2 transform group-hover:scale-110 transition-transform" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent hover:from-teal-500 hover:to-blue-500 transition-colors">
            HuddleVision
          </h1>
        </div>
        <span className="text-xs text-gray-600 font-medium px-4 py-1.5 bg-gray-100 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors">
          Video Meetings Made Simple
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div>
          <span className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-sm font-medium border border-teal-200">
            Status: {state}
          </span>
        </div>

        <button
          className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-400 flex items-center space-x-2.5 shadow-sm hover:shadow-md focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 active:scale-95"
          onClick={() => {
            // Wallet connection logic would go here
            console.log("Connecting wallet...");
          }}
          aria-label="Connect Wallet"
        >
          <Wallet className="w-5 h-5" />
          <span>Connect Wallet</span>
        </button>
      </div>
    </header>
  );
};

export default Header;