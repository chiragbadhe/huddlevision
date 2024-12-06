import { useLocalAudio } from "@huddle01/react/hooks";
import { useEffect, useState } from "react";
import { Visualizer, VisualizerChildrenProps } from "react-sound-visualizer";

interface VisualizerRenderProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  stop: () => void;
  start: () => void;
  reset: () => void;
}

const App: React.FC = () => {
  const { stream, isAudioOn, enableAudio, disableAudio } = useLocalAudio({
    onProduceStart(producer) {},
    onProduceClose(label: string) {},
    onProduceError() {},
  });

  return (
    <Visualizer audio={stream}>
      {(props: VisualizerChildrenProps) => (
        <>
          <canvas ref={props.canvasRef} width={500} height={100} />

          <div>
            <button onClick={props.start}>Start</button>
            <button onClick={props.stop}>Stop</button>
            <button onClick={props.reset}>Reset</button>
            <button
              onClick={async () => {
                isAudioOn ? await disableAudio() : await enableAudio();
              }}
            >
              {isAudioOn ? "Disable Audio" : "Enable Audio"}
            </button>
          </div>
        </>
      )}
    </Visualizer>
  );
};

export default App;
