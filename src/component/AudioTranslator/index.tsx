import React, { useState } from "react";
import AudioVisualizer from "./AudioVisualizer";
import { Languages, ArrowLeftRight } from "lucide-react";
import SelectLanguages from "./SelectLanguages";

interface AudioTranslatorProps {}

const AudioTranslator: React.FC<AudioTranslatorProps> = ({}) => {
  return (
    <div className="flex flex-col space-y-4 p-2 ">
      <div className=" bg-gray-100 rounded-2xl shadow-sm border">
        <AudioVisualizer />
        <SelectLanguages />
      </div>
    </div>
  );
};

export default AudioTranslator;
