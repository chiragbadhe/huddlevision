import { FC, useEffect, useState } from "react";
import PanelWrapper from "./PanelWrapper";
import { FileText, RefreshCw, AlertCircle } from "lucide-react";
import useTranscriptionStore from "@/hooks/useTranscriptionStore";

interface SummaryItem {
  keyPoints: string[];
  actionItems: string[];
  nextSteps: string;
}

interface SummaryViewProps {}

const SummaryView: FC<SummaryViewProps> = () => {
  const [summaryData, setSummaryData] = useState<SummaryItem>({
    keyPoints: [],
    actionItems: [],
    nextSteps: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getWholeTranscript } = useTranscriptionStore();

  const generateSummary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const transcript = getWholeTranscript();

      if (!transcript) {
        setSummaryData({
          keyPoints: ["No discussion points recorded yet"],
          actionItems: ["Start speaking to generate meeting notes"],
          nextSteps: "Waiting for conversation to begin",
        });
        return;
      }

      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "system",
                content:
                  "You are a helpful assistant that generates meeting summaries. Please analyze the transcript and provide key points, action items, and next steps.",
              },
              {
                role: "user",
                content: transcript,
              },
            ],
            temperature: 0.7,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();

      const formattedData = {
        keyPoints: [data.choices[0].message.content],
        actionItems: [data.choices[0].message.content],
        nextSteps: data.choices[0].message.content,
      };

      setSummaryData(formattedData);
    } catch (error) {
      console.error("Failed to generate summary:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setSummaryData({
        keyPoints: ["Error generating summary"],
        actionItems: ["Please try again"],
        nextSteps: "Refresh to retry",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateSummary();
  }, []);

  if (isLoading) {
    return (
      <PanelWrapper>
        <div className="flex items-center justify-center h-[200px]">
          <RefreshCw className="w-8 h-8 text-teal-500 animate-spin" />
        </div>
      </PanelWrapper>
    );
  }

  if (error) {
    return (
      <PanelWrapper>
        <div className="flex flex-col items-center justify-center h-[200px] space-y-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
          <p className="text-red-500 text-sm text-center">{error}</p>
          <button
            onClick={generateSummary}
            className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </PanelWrapper>
    );
  }

  return (
    <PanelWrapper>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Meeting Summary
          </h3>
        </div>
        <button
          className={`p-2 hover:bg-gray-100 rounded-lg ${
            isLoading ? "animate-spin" : "hover:rotate-45"
          } duration-200 transition`}
          onClick={generateSummary}
          disabled={isLoading}
        >
          <RefreshCw className="w-5 h-5 text-teal-500" />
        </button>
      </div>
      <div className="min-h-[200px] p-4 bg-white border rounded-lg space-y-4 overflow-scroll h-[200px]">
        <div>
          <h4 className="font-medium text-gray-900 mb-2">
            Key Discussion Points
          </h4>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
            {/* {summaryData} */}
            {summaryData?.keyPoints?.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Action Items</h4>
          <ul className="list-disc pl-5 text-gray-600 text-sm space-y-2">
            {summaryData?.actionItems?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-2">Next Steps</h4>
          <p className="text-gray-600 text-sm">{summaryData?.nextSteps}</p>
        </div>
      </div>
    </PanelWrapper>
  );
};

export default SummaryView;
