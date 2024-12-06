import { Languages, ArrowLeftRight } from "lucide-react";

interface SelectLanguagesProps {}

const SelectLanguages: React.FC<SelectLanguagesProps> = () => {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-gray-100 rounded-2xl">
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <Languages className="w-5 h-5 text-teal-500" />
          <select className="px-4 w-[300px] py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-gray-50">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>

      <button className="p-3 bg-teal-50 rounded-full hover:bg-teal-100 transition-colors duration-200 hover:scale-105 transform active:scale-95">
        <ArrowLeftRight className="w-6 h-6 text-teal-500" />
      </button>

      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <Languages className="w-5 h-5 text-teal-500" />
          <select className="px-4 py-2 w-[300px] rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 hover:bg-gray-50">
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="it">Italiano</option>
            <option value="pt">Português</option>
            <option value="ru">Русский</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SelectLanguages;
