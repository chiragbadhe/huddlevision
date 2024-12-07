import { FC } from "react";
import PanelWrapper from "./PanelWrapper";
import { MessageSquare } from "lucide-react";

interface TranscriptionItem {
  peerId: string;
  text: string;
  timestamp: string;
}

interface TranscriptionViewProps {}

const TranscriptionView: FC<TranscriptionViewProps> = () => {
  const demoTranscriptions: TranscriptionItem[] = [
    {
      peerId: "peer-123",
      text: "I think we should focus on improving the user onboarding flow first.",
      timestamp: "10:15 AM",
    },
    {
      peerId: "peer-456",
      text: "Agreed. The current conversion rates show there's room for improvement.",
      timestamp: "10:16 AM",
    },
    {
      peerId: "peer-789",
      text: "We could start by analyzing the drop-off points in the funnel.",
      timestamp: "10:17 AM",
    },
  ];

  return (
    <PanelWrapper>
      <div className="flex items-center gap-2 ">
        <MessageSquare className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Live Transcription
        </h3>
      </div>
      <div className="min-h-[200px] p-4 bg-white border rounded-lg space-y-4 overflow-scroll h-[200px]">
        {demoTranscriptions.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-teal-500">
                {item.peerId}
              </span>
              <span className="text-xs text-gray-400">{item.timestamp}</span>
            </div>
            <p className="text-sm text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
};

export default TranscriptionView;
