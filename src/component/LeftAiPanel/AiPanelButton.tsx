import React from "react";

interface AiPanelButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const AiPanelButton: React.FC<AiPanelButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
        isActive
          ? "bg-white text-gray-900 shadow-sm"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
};

export default AiPanelButton;
