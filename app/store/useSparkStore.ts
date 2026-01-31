import { create } from 'zustand';
import { SparkForm, Suggestion } from '../types';

interface SparkState {
    form: SparkForm;
    suggestions: Suggestion[];
    isLoading: boolean;
    setForm: (form: Partial<SparkForm>) => void;
    setSuggestions: (suggestions: Suggestion[]) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export const useSparkStore = create<SparkState>((set) => ({
    form: {
        budget: '50000',
        time: '30',
        energy: 'medium',
        useLocation: false,
        latitude: null,
        longitude: null,
    },
    suggestions: [],
    isLoading: false,
    setForm: (newForm) => set((state) => ({ form: { ...state.form, ...newForm } })),
    setSuggestions: (suggestions) => set({ suggestions }),
    setIsLoading: (isLoading) => set({ isLoading }),
}));
