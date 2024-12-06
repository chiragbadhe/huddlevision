import { useState } from "react";
import FeedsView from "./FeedsView";
import SummaryView from "./SummaryView";
import TranscriptionView from "./TranscriptionView";
import AiPanelButton from "./AiPanelButton";

interface LeftAiPanelProps {}

const LeftAiPanel = ({}: LeftAiPanelProps) => {
  const [activeView, setActiveView] = useState<
    "transcription" | "summary" | "feeds"
  >("transcription");

  return ( 
    <div className="w-full space-y-4 mt-[16px]">
      <div className="flex gap-1 p-1 bg-gray-200 rounded-lg border">
        <AiPanelButton
          label="Transcription"
          isActive={activeView === "transcription"}
          onClick={() => setActiveView("transcription")}
        />
        <AiPanelButton
          label="Summary"
          isActive={activeView === "summary"}
          onClick={() => setActiveView("summary")}
        />
        <AiPanelButton
          label="Feeds"
          isActive={activeView === "feeds"}
          onClick={() => setActiveView("feeds")}
        />
      </div>

      {activeView === "transcription" ? (
        <TranscriptionView />
      ) : activeView === "summary" ? (
        <SummaryView />
      ) : (
        <FeedsView />
      )}
    </div>
  );
};

export default LeftAiPanel;