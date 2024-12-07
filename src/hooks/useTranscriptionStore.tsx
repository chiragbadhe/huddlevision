import { create } from "zustand";

interface TranscriptionItem {
  peerId: string;
  timestamp: string;
  originalText: string;
  translatedText: string;
  isLoading?: boolean;
}

interface TranscriptionStore {
  currentTranslation: TranscriptionItem | null;
  translations: TranscriptionItem[];
  setCurrentTranslation: (translation: TranscriptionItem | null) => void;
  addTranslation: (translation: TranscriptionItem) => void;
  updateLatestTranslation: (
    updatedTranslation: Partial<TranscriptionItem>
  ) => void;
  getWholeTranscript: () => string;
}

const useTranscriptionStore = create<TranscriptionStore>((set, get) => ({
  currentTranslation: null,
  translations: [],
  setCurrentTranslation: (translation) =>
    set({ currentTranslation: translation }),
  addTranslation: (translation) =>
    set((state) => ({
      translations: [...state.translations, translation],
    })),
  updateLatestTranslation: (updatedTranslation) =>
    set((state) => {
      const updatedTranslations = [...state.translations];
      if (updatedTranslations.length > 0) {
        const lastIndex = updatedTranslations.length - 1;
        updatedTranslations[lastIndex] = {
          ...updatedTranslations[lastIndex],
          ...updatedTranslation,
        };
      }
      return { translations: updatedTranslations };
    }),
  getWholeTranscript: () => {
    const state = get();
    return state.translations
      .filter((item) => !item.isLoading)
      .map((item) => item.originalText)
      .join(" ");
  },
  getSingleTranscript: (peerId: string) => {
    const state = get();
    return state.translations
      .filter((item) => !item.isLoading && item.peerId === peerId)
      .map((item) => item.originalText)
      .join(" ");
  },
}));

export default useTranscriptionStore;
