import React, { useEffect } from "react";
import { useLocalAudio } from "@huddle01/react/hooks";
import { Visualizer, VisualizerChildrenProps } from "react-sound-visualizer";
import { AudioLines, Disc2 } from "lucide-react";

interface AudioVisualizerProps {}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({}) => {
  const { stream, isAudioOn } = useLocalAudio({
    onProduceStart(producer) {
      console.log("Audio production started", producer);
    },
    onProduceClose(label: string) {
      console.log("Audio production closed", label);
    },
    onProduceError() {
      console.error("Audio production error");
    },
  });

  console.log(isAudioOn);

  return (
    <Visualizer audio={stream}>
      {(props: VisualizerChildrenProps) => {
        useEffect(() => {
          if (isAudioOn && props?.start) {
            props.start();
          } else if (props?.stop) {
            props.stop();
          }
        }, [isAudioOn, props]);

        return (
          <div className="flex items-center justify-between px-[24px] space-x-8 py-3  border-b">
            <div className="flex space-x-3 items-center justify-center">
              <div className="p-3 bg-teal-50 rounded-full shadow-sm hover:bg-teal-100 transition-colors">
                <AudioLines className="w-6 h-6 text-teal-500" />
              </div>
              <div className="flex flex-col items-start leading-7">
                <span className="text-md font-medium text-gray-700 tracking-tight">
                  Audio Visualizer
                </span>
                <span className="text-xs text-gray-500">
                  Real-time waveform
                </span>
              </div>
            </div>

            <div>
              {isAudioOn ? (
                <canvas
                  className="w-[500px] h-[60px] rounded-lg border border-gray-200 bg-white/80 shadow-inner backdrop-blur-sm"
                  ref={props.canvasRef}
                />
              ) : (
                <div className="w-[500px] h-[60px] rounded-lg border border-gray-200 bg-white/80 shadow-inner backdrop-blur-sm flex items-center justify-center">
                  --------------------------------------------------------------------
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`p-3 ${
                  isAudioOn ? "bg-teal-50" : "bg-red-50"
                } rounded-full transition-all duration-300 shadow-sm hover:scale-105 ${
                  isAudioOn ? "hover:bg-teal-100" : "hover:bg-red-100"
                }`}
              >
                <div
                  className={`${
                    isAudioOn ? "animate-spin" : ""
                  } transition-transform`}
                >
                  <Disc2
                    className={`w-6 h-6 ${
                      isAudioOn ? "text-teal-500" : "text-red-500"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Visualizer>
  );
};

export default AudioVisualizer;
