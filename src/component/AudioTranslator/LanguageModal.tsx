import React, { useMemo } from "react";
import { Search, X } from "lucide-react";

interface Language {
  code: string;
  name: string;
}

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  modalType: "from" | "to";
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  languages: Language[];
  onSelectLanguage: (langCode: string) => void;
}

const LanguageModal: React.FC<LanguageModalProps> = ({
  isOpen,
  onClose,
  modalType,
  searchQuery,
  setSearchQuery,
  languages,
  onSelectLanguage,
}) => {
  const filteredLanguages = useMemo(() => {
    return languages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, languages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[500px] max-h-[80vh] overflow-y-auto shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Select {modalType === "from" ? "Source" : "Target"} Language
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search languages..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2">
          {filteredLanguages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelectLanguage(lang.code)}
              className="w-full text-left px-4 py-3 hover:bg-teal-50 rounded-lg transition-colors duration-200 flex items-center justify-between group"
            >
              <span className="text-gray-700 group-hover:text-teal-700">
                {lang.name}
              </span>
              <span className="text-sm text-gray-400 group-hover:text-teal-500">
                {lang.code}
              </span>
            </button>
          ))}
          {filteredLanguages.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No languages found
            </div>
          )}
        </div>

        <div className="mt-6 pt-4 border-t">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LanguageModal;
