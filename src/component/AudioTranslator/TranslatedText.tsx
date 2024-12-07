import { FC, useEffect } from "react";
import { MonitorSpeaker, Loader2 } from "lucide-react";
import OpenAI from "openai";
import usePeerStore from "@/hooks/usePeerStore";
import useTranscriptionStore from "@/hooks/useTranscriptionStore";

interface TranslatedTextProps {
  peerId: string;
  transcriptedText: string;
}

const TranslatedText: FC<TranslatedTextProps> = ({
  peerId,
  transcriptedText,
}) => {
  const { toLanguage, fromLanguage } = usePeerStore();
  const {
    currentTranslation,
    translations,
    addTranslation,
    updateLatestTranslation,
  } = useTranscriptionStore();

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  useEffect(() => {
    const translateText = async () => {
      if (!transcriptedText || !peerId) return;

      const newTranslation = {
        peerId,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        originalText: transcriptedText,
        translatedText: "",
        isLoading: true,
      };

      addTranslation(newTranslation);

      try {
        const prompt = `Translate the following text from ${fromLanguage} to ${toLanguage}: "${transcriptedText}"`;

        const completion = await openai.chat.completions.create({
          messages: [{ role: "user", content: prompt }],
          model: "gpt-3.5-turbo",
        });

        const translatedText =
          completion.choices[0]?.message?.content || "Translation failed";

        updateLatestTranslation({ translatedText, isLoading: false });
      } catch (error) {
        console.error("Translation error:", error);
        updateLatestTranslation({
          translatedText: "Translation failed",
          isLoading: false,
        });
      }
    };

    translateText();
  }, [
    transcriptedText,
    peerId,
    fromLanguage,
    toLanguage,
    addTranslation,
    updateLatestTranslation,
  ]);

  return (
    <div className="bg-white border border-teal-500 rounded-2xl p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-teal-50 rounded-lg">
          <MonitorSpeaker className="w-5 h-5 text-teal-500" />
        </div>
        <h2 className="font-semibold text-gray-900">Translated Text</h2>
      </div>
      <div className="h-[200px] overflow-y-auto bg-gray-100 border rounded-xl p-4 space-y-2">
        {translations
          .slice()
          .reverse()
          .map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-teal-500">
                  {item.peerId}
                </span>
                <span className="text-xs text-gray-400">{item.timestamp}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-700">{item.originalText}</p>
                {item.isLoading ? (
                  <div className="flex items-center gap-2 text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">Translating...</span>
                  </div>
                ) : (
                  <p className="text-sm text-teal-600 italic">
                    {item.translatedText}
                  </p>
                )}
              </div>
            </div>
          ))}
        {translations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-2">
            <MonitorSpeaker className="w-8 h-8 opacity-40" />
            <p className="text-sm">Waiting for translations...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranslatedText;
