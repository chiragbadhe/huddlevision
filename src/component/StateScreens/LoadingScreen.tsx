import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingScreenProps {}

const LoadingScreen: React.FC<LoadingScreenProps> = () => {
  return (
    <div className="mt-[250px] bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-teal-50 rounded-full animate-pulse">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin" />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-medium text-gray-700">Loading...</h2>
          <p className="text-sm text-gray-500">
            Please wait while we set things up
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
