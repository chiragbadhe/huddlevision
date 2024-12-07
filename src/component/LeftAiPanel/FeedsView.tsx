import { FC, useEffect, useState } from "react";
import PanelWrapper from "./PanelWrapper";
import { RefreshCw, BookOpen, AlertCircle, ExternalLink } from "lucide-react";
import useTranscriptionStore from "@/hooks/useTranscriptionStore";

interface CitationItem {
  title: string;
  description: string;
  link: string;
  relevance: string;
  type: "paper" | "article" | "resource";
}

interface FeedsViewProps {}

const FeedsView: FC<FeedsViewProps> = () => {
  const [citations, setCitations] = useState<CitationItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { getWholeTranscript } = useTranscriptionStore();

  const generateCitations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const transcript = getWholeTranscript();

      if (!transcript) {
        setCitations([
          {
            title: "No Citations Available",
            description:
              "Start a discussion to get relevant citations and resources",
            link: "#",
            relevance: "Waiting for conversation to begin",
            type: "resource",
          },
        ]);
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
                content: `You are a research assistant that provides relevant academic citations and resources. 
                         For each topic in the transcript, provide 2-3 high quality citations in valid JSON format like:
                         [{"title": "Example Paper", "description": "Description text", "link": "https://example.com", "relevanceScore": 8, "type": "paper"}]`,
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
      const suggestions = JSON.parse(data.choices[0].message.content);

      // Format the response into structured citations
      const formattedCitations = suggestions.map((suggestion: any) => ({
        title: suggestion.title,
        description: suggestion.description,
        link: suggestion.link,
        relevance: `${suggestion.relevanceScore}/10 relevance score`,
        type: suggestion.type,
      }));

      setCitations(formattedCitations);
    } catch (error) {
      console.error("Failed to generate citations:", error);
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
      setCitations([
        {
          title: "Error Loading Citations",
          description: "Please try again",
          link: "#",
          relevance: "Error occurred",
          type: "resource",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateCitations();
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
            onClick={generateCitations}
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
          <BookOpen className="w-5 h-5 text-teal-500" />
          <h3 className="text-lg font-semibold text-gray-900">
            Relevant Citations
          </h3>
        </div>
        <button
          className={`p-2 hover:bg-gray-100 rounded-lg ${
            isLoading ? "animate-spin" : "hover:rotate-45"
          } duration-200 transition`}
          onClick={generateCitations}
          disabled={isLoading}
        >
          <RefreshCw className="w-5 h-5 text-teal-500" />
        </button>
      </div>
      <div className="min-h-[200px] p-4 bg-white border rounded-lg space-y-4 overflow-scroll h-[200px]">
        {citations.map((citation, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-3 last:border-0"
          >
            <a
              href={citation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-gray-50 rounded p-2 transition-colors"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{citation.title}</h4>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </div>
              <p className="text-gray-600 text-sm mt-1">
                {citation.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400 text-xs">
                  {citation.relevance}
                </span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    citation.type === "paper"
                      ? "bg-blue-100 text-blue-700"
                      : citation.type === "article"
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {citation.type}
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </PanelWrapper>
  );
};

export default FeedsView;
