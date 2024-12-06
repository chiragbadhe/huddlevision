import { FC } from "react";
import PanelWrapper from "./PanelWrapper";
import { FileText } from "lucide-react";

interface SummaryViewProps {}

const SummaryView: FC<SummaryViewProps> = () => {
  return (
    <PanelWrapper>
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-semibold text-gray-900">Meeting Summary</h3>
      </div>
      <div className="min-h-[200px] p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-sm">
          Summary content will appear here...
        </p>
      </div>
    </PanelWrapper>
  );
};

export default SummaryView;
