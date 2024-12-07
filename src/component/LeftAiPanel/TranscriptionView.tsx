import { FC } from "react";
import PanelWrapper from "./PanelWrapper";
import { MessageSquare } from "lucide-react";
import useTranscriptionStore from "@/hooks/useTranscriptionStore";

interface TranscriptionItem {
  peerId: string;
  text: string;
  timestamp: string;
}

interface TranscriptionViewProps {}

const TranscriptionView: FC<TranscriptionViewProps> = () => {
  const { translations } = useTranscriptionStore();

  return (
    <PanelWrapper>
      <div className="flex items-center gap-2 ">
        <MessageSquare className="w-5 h-5 text-teal-500" />
        <h3 className="text-lg font-semibold text-gray-900">
          Live Transcription
        </h3>
      </div>
      <div className="min-h-[200px] p-4 bg-white border rounded-lg space-y-4 overflow-scroll h-[200px]">
        {translations.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-teal-500">
                {item.peerId}
              </span>
              <span className="text-xs text-gray-400">{item.timestamp}</span>
            </div>
            <p className="text-sm text-gray-700">{item.originalText}</p>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
};

export default TranscriptionView;
