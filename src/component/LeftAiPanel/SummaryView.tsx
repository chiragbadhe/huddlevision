import { FC } from "react";
import PanelWrapper from "./PanelWrapper";
import { FileText } from "lucide-react";

interface SummaryItem {
  keyPoints: string[];
  actionItems: string[];
  nextSteps: string;
}

interface SummaryViewProps {}

const SummaryView: FC<SummaryViewProps> = () => {
  const summaryData: SummaryItem = {
    keyPoints: [
      "Reviewed Q4 2023 performance metrics and set targets for Q1 2024",
      "Discussed new product feature roadmap and prioritized upcoming releases",
      "Assigned action items for improving customer onboarding process",
    ],
    actionItems: [
      "Sarah to prepare detailed analytics report by Friday",
      "Dev team to begin implementation of new authentication system",
      "Marketing to draft communication plan for feature launch",
    ],
    nextSteps:
      "Follow-up meeting scheduled for next Tuesday to review progress. All team members to update their tasks in project management system by EOD.",
  };

  return (
    <PanelWrapper>
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-semibold text-gray-900">Meeting Summary</h3>
      </div>
      <div className="min-h-[200px] p-4 bg-white border rounded-lg space-y-4 overflow-scroll h-[200px]">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">
            Key Discussion Points
          </h4>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
            {summaryData.keyPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Action Items</h4>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
            {summaryData.actionItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
          <p className="text-gray-600 text-sm">{summaryData.nextSteps}</p>
        </div>
      </div>
    </PanelWrapper>
  );
};

export default SummaryView;
