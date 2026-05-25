import { create } from 'zustand';

const useTravelStore = create((set, get) => ({
  // Quiz state
  currentQuestion: 0,
  answers: {},
  quizComplete: false,

  // Results state
  personality: null,
  dreamCountry: null,
  countryData: null,
  itinerary: null,
  moodBoard: null,

  // UI state
  isLoading: false,
  hasGenerated: false,

  // Actions
  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestion: state.currentQuestion + 1,
    })),

  prevQuestion: () =>
    set((state) => ({
      currentQuestion: Math.max(0, state.currentQuestion - 1),
    })),

  completeQuiz: () =>
    set({ quizComplete: true }),

  setPersonality: (personality) =>
    set({ personality, hasGenerated: true }),

  setDreamCountry: (dreamCountry) =>
    set({ dreamCountry }),

  setCountryData: (countryData) =>
    set({ countryData }),

  setItinerary: (itinerary) =>
    set({ itinerary }),

  setMoodBoard: (moodBoard) =>
    set({ moodBoard }),

  setLoading: (isLoading) =>
    set({ isLoading }),

  resetQuiz: () =>
    set({
      currentQuestion: 0,
      answers: {},
      quizComplete: false,
      personality: null,
      dreamCountry: null,
      countryData: null,
      itinerary: null,
      moodBoard: null,
      isLoading: false,
      hasGenerated: false,
    }),
}));

export default useTravelStore;
