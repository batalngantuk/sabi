import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CompletedAct } from '../types';

interface VaultState {
    completedActs: CompletedAct[];
    addAct: (act: CompletedAct) => void;
    deleteAct: (id: string) => void;
}


export const useVaultStore = create<VaultState>()(
    persist(
        (set) => ({
            completedActs: [
                {
                    id: '1',
                    title: 'Memberi Makan Kucing Jalanan',
                    story: 'Ketemu kucing lucu di pinggir jalan, untung bawa makanan kucing sasetan. Lahap banget makannya!',
                    category: 'Animal Care',
                    timestamp: '2 jam lalu',
                    likes: 12,
                    comments: 3,
                    user: 'Arnold'
                },
                {
                    id: '2',
                    title: 'Traktir Ojol Minum',
                    story: 'Cuaca panas banget hari ini. Pesen Gojek, sekalian beliin es teh buat abangnya. Senyumnya mahal banget!',
                    category: 'Random Act',
                    timestamp: '5 jam lalu',
                    likes: 45,
                    comments: 8,
                    user: 'Sarah'
                }
            ],
            addAct: (act) => set((state) => ({ completedActs: [act, ...state.completedActs] })),
            deleteAct: (id) => set((state) => ({
                completedActs: state.completedActs.filter((act) => act.id !== id)
            })),
        }),
        {
            name: 'vault-storage',
        }
    )
);
