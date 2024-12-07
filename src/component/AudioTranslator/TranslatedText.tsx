import { FC } from "react";
import { MonitorSpeaker } from "lucide-react";

interface TranslationItem {
  peerId: string;
  timestamp: string;
  originalText: string;
  translatedText: string;
}

const TranslatedText: FC = () => {
  const demoTranslations: TranslationItem[] = [
    {
      peerId: "peer-123",
      timestamp: "10:15 AM",
      originalText: "I think we should focus on improving the user onboarding flow first.",
      translatedText: "Je pense que nous devrions d'abord nous concentrer sur l'amélioration du flux d'intégration des utilisateurs."
    },
    {
      peerId: "peer-456", 
      timestamp: "10:16 AM",
      originalText: "Agreed. The current conversion rates show there's room for improvement.",
      translatedText: "D'accord. Les taux de conversion actuels montrent qu'il y a une marge d'amélioration."
    },
    {
      peerId: "peer-789",
      timestamp: "10:17 AM", 
      originalText: "We could start by analyzing the drop-off points in the funnel.",
      translatedText: "Nous pourrions commencer par analyser les points d'abandon dans l'entonnoir."
    }
  ];

  return (
    <div className="bg-white border border-teal-500 rounded-2xl p-4 shadow-sm ">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-teal-50 rounded-lg">
          <MonitorSpeaker className="w-5 h-5 text-teal-500" />
        </div>
        <h2 className="font-semibold text-gray-900">Translated Text</h2>
      </div>
      <div className="h-[200px] overflow-y-auto bg-gray-50 border rounded-xl p-4 space-y-2">
        {demoTranslations.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-teal-500">
                {item.peerId}
              </span>
              <span className="text-xs text-gray-400">{item.timestamp}</span>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-700">{item.originalText}</p>
              <p className="text-sm text-teal-600 italic">{item.translatedText}</p>
            </div>
          </div>
        ))}
        {demoTranslations.length === 0 && (
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
