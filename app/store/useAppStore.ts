import { create } from 'zustand';
import { Section } from '../types';

interface AppState {
    activeSection: Section;
    setActiveSection: (section: Section) => void;
}

export const useAppStore = create<AppState>((set) => ({
    activeSection: 'spark',
    setActiveSection: (section) => set({ activeSection: section }),
}));
