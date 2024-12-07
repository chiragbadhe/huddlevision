import React, { useState, useCallback, useEffect } from "react";
import { createClient, LiveTranscriptionEvents } from "@deepgram/sdk";

const AudioTranscriber: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [isSupported, setIsSupported] = useState(true);

  // Check browser compatibility on component mount
  useEffect(() => {
    if (!navigator.mediaDevices || !window.MediaRecorder) {
      setIsSupported(false);
      setError("Your browser does not support audio recording");
    }
  }, []);

  const startTranscription = useCallback(async () => {
    // Reset previous states
    setError("");
    setTranscription("");

    try {
      // Validate API key
      const apiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY;
      if (!apiKey) {
        throw new Error("Deepgram API key is not configured");
      }

      // Request microphone access with error handling
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
        });
      } catch (accessError) {
        const errorMessages = {
          NotAllowedError:
            "Microphone access was denied. Please grant permission.",
          NotFoundError: "No microphone found on this device.",
          AbortError: "Microphone access was aborted.",
          OverconstrainedError:
            "No microphone meets the specified constraints.",
        } as const;
        const message =
          errorMessages[
            (accessError as Error).name as keyof typeof errorMessages
          ] || `Microphone access error: ${(accessError as Error).message}`;

        setError(message);
        return;
      }

      const deepgram = createClient(apiKey);
      const dgConnection = deepgram.listen.live({
        model: "nova-2",
        language: "en-US",
        encoding: "opus",
        punctuate: true,
        interim_results: true,
      });

      // Comprehensive connection event listeners
      const openListener = () => {
        console.log("Deepgram WebSocket connection opened successfully");
      };

      const transcriptListener = (data: any) => {
        try {
          const transcript =
            data.channel?.alternatives?.[0]?.transcript ||
            data.results?.channel?.alternatives?.[0]?.transcript ||
            "";

          if (transcript) {
            setTranscription((prev) => {
              const updatedTranscript = prev
                ? `${prev} ${transcript}`
                : transcript;
              return updatedTranscript.trim();
            });
          }
        } catch (transcriptError) {
          console.error("Transcript Extraction Error:", transcriptError);
        }
      };

      const errorListener = (err: any) => {
        console.error("Deepgram Connection Error:", err);
        setError(`Transcription Error: ${JSON.stringify(err)}`);
      };

      const closeListener = () => {
        console.log("Deepgram WebSocket connection closed");
        stopTranscription();
      };

      // Add event listeners
      dgConnection.addListener(LiveTranscriptionEvents.Open, openListener);
      dgConnection.addListener(
        LiveTranscriptionEvents.Transcript,
        transcriptListener
      );
      dgConnection.addListener(LiveTranscriptionEvents.Error, errorListener);
      dgConnection.addListener(LiveTranscriptionEvents.Close, closeListener);

      // Create MediaRecorder with improved codec support
      const recorder = new MediaRecorder(stream, {
        mimeType: "audio/webm;codecs=opus",
      });

      // Robust audio chunk handling
      recorder.ondataavailable = async (event) => {
        if (
          event.data.size > 0 &&
          dgConnection.getReadyState() === WebSocket.OPEN
        ) {
          try {
            const audioData = await event.data.arrayBuffer();
            await dgConnection.send(audioData);
          } catch (sendError: unknown) {
            console.error("Audio Chunk Send Error:", sendError);
            setError(`Audio Transmission Error: ${sendError instanceof Error ? sendError.message : String(sendError)}`);
          }
        }
      };

      // Cleanup function to remove listeners
      const cleanup = () => {
        dgConnection.removeListener(LiveTranscriptionEvents.Open, openListener);
        dgConnection.removeListener(
          LiveTranscriptionEvents.Transcript,
          transcriptListener
        );
        dgConnection.removeListener(
          LiveTranscriptionEvents.Error,
          errorListener
        );
        dgConnection.removeListener(
          LiveTranscriptionEvents.Close,
          closeListener
        );
      };

      // Start recording with optimized chunk size
      recorder.start(250);
      setMediaRecorder(recorder);
      setIsRecording(true);

      // Return cleanup function
      return cleanup;
    } catch (err: unknown) {
      console.error("Transcription Initialization Error:", err);
      setError(`Failed to start transcription: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, []);

  const stopTranscription = useCallback(() => {
    if (mediaRecorder) {
      // Stop all media tracks
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      mediaRecorder.stop();

      // Reset states
      setMediaRecorder(null);
      setIsRecording(false);
    }
  }, [mediaRecorder]);

  // Prevent interaction if browser is not supported
  if (!isSupported) {
    return (
      <div className="text-red-500 p-4 text-center">
        Your browser does not support audio recording.
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      {error && (
        <div className="bg-red-100 text-red-800 p-2 rounded">
          Error: {error}
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button
          onClick={isRecording ? stopTranscription : startTranscription}
          className={`px-4 py-2 rounded ${
            isRecording
              ? "bg-red-500 hover:bg-red-600 text-white"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isRecording ? "Stop Transcription" : "Start Transcription"}
        </button>
      </div>

      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Transcription:</h3>
        <p className="text-gray-800">
          {transcription || "No transcription yet"}
        </p>
      </div>
    </div>
  );
};

export default AudioTranscriber;
