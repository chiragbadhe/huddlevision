import { useEffect, useState } from "react";

interface UseTranscriptionOptions {
  language?: string; // Language code, e.g., 'en-US'
  continuous?: boolean; // Whether to continue listening after a pause
}

interface UseTranscriptionReturn {
  transcription: string; // Transcribed text
  isListening: boolean; // Whether the microphone is active
  error: string | null; // Any errors during transcription
  startListening: () => void; // Start transcription
  stopListening: () => void; // Stop transcription
}

const useTranscription = ({
  language = "en-US",
  continuous = true,
}: UseTranscriptionOptions): UseTranscriptionReturn => {
  const [transcription, setTranscription] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      (!window.SpeechRecognition && !window.webkitSpeechRecognition)
    ) {
      setError("Speech Recognition API is not supported in this browser.");
      return;
    }
  }, []);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech Recognition API is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = continuous;

    recognition.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const currentTranscription = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ");
      setTranscription(currentTranscription);
    };

    recognition.onerror = (event) => {
      setError(event.error || "An unknown error occurred.");
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const stopListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.stop();
    setIsListening(false);
  };

  return {
    transcription,
    isListening,
    error,
    startListening,
    stopListening,
  };
};

export default useTranscription;
