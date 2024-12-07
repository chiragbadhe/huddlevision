import { Languages, ArrowLeftRight } from "lucide-react";
import { useState, useEffect } from "react";
import usePeerStore from "@/hooks/usePeerStore";
import LanguageModal from "./LanguageModal";

interface SelectLanguagesProps {}

interface Language {
  code: string;
  name: string;
}

const SelectLanguages: React.FC<SelectLanguagesProps> = () => {
  const { fromLanguage, toLanguage, setFromLanguage, setToLanguage } =
    usePeerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"from" | "to">("from");
  const [searchQuery, setSearchQuery] = useState("");
  const [languages, setLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("/languages.json");
        const data = await response.json();
        const formattedLanguages = Object.entries(data).map(([code, name]) => ({
          code,
          name: name as string,
        }));
        setLanguages(formattedLanguages);
      } catch (error) {
        console.error("Error loading languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  const handleSwapLanguages = () => {
    const temp = fromLanguage;
    setFromLanguage(toLanguage);
    setToLanguage(temp);
  };

  const openModal = (type: "from" | "to") => {
    setModalType(type);
    setIsModalOpen(true);
    setSearchQuery(""); // Reset search when opening modal
  };

  const handleLanguageSelect = (langCode: string) => {
    if (modalType === "from") {
      setFromLanguage(langCode);
    } else {
      setToLanguage(langCode);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 py-3 bg-gray-100 rounded-2xl">
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-teal-500" />
            <button className="px-4 w-[300px] py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-gray-50 text-left">
              {languages.find((lang) => lang.code === fromLanguage)?.name ||
                "English"}
            </button>
          </div>
        </div>

        <button
          onClick={handleSwapLanguages}
          className="p-3 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors duration-200 hover:scale-105 transform active:scale-95"
        >
          <ArrowLeftRight className="w-6 h-6 text-teal-500" />
        </button>

        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <Languages className="w-5 h-5 text-teal-500" />
            <button
              onClick={() => openModal("to")}
              className="px-4 py-2 w-[300px] rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-gray-50 text-left"
            >
              {languages.find((lang) => lang.code === toLanguage)?.name ||
                "Select Language"}
            </button>
          </div>
        </div>
      </div>

      <LanguageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modalType={modalType}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        languages={languages}
        onSelectLanguage={handleLanguageSelect}
      />
    </>
  );
};

export default SelectLanguages;
