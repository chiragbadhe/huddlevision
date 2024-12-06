import { FC, ReactNode } from "react";

interface PanelWrapperProps {
  children: ReactNode;
}

const PanelWrapper: FC<PanelWrapperProps> = ({ children }) => {
  return (
    <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-100">
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default PanelWrapper;
