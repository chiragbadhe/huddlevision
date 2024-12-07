import { create } from "zustand";

interface PeerState {
  peerId: string | null;
  toLanguage: string;
  fromLanguage: string;
  audioStream: MediaStream | null;
  setPeerId: (id: string) => void;
  setToLanguage: (language: string) => void;
  setFromLanguage: (language: string) => void;
  setAudioStream: (stream: MediaStream) => void;
  resetState: () => void;
}

const usePeerStore = create<PeerState>((set) => ({
  peerId: null,
  toLanguage: "en", // Default to English
  fromLanguage: "en", // Default to English
  audioStream: null,
  setPeerId: (id) => set({ peerId: id }),
  setToLanguage: (language) => set({ toLanguage: language }),
  setFromLanguage: (language) => set({ fromLanguage: language }),
  setAudioStream: (stream) => set({ audioStream: stream }),
  resetState: () =>
    set({
      peerId: null,
      toLanguage: "en",
      fromLanguage: "en",
      audioStream: null,
    }),
}));

export default usePeerStore;
