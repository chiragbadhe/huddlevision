import { FC } from "react";
import { Github } from "lucide-react";

const ConnectWallet: FC = () => {
  return (
    <a
      href="https://github.com/your-username/huddlevision"
      target="_blank"
      rel="noopener noreferrer"
      className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-300 flex items-center space-x-2.5 shadow-sm hover:shadow-md focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 active:scale-95"
      aria-label="View project on GitHub"
    >
      <Github className="w-5 h-5 transition-transform group-hover:rotate-12" />
      <span>View on GitHub</span>
    </a>
  );
};

export default ConnectWallet;
