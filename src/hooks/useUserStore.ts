import { User } from '@/types/user';
import { create } from 'zustand';

interface IUserStore {
	user: User | null;
	setUser: (user: User) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
	user: null,
	setUser: (user: User) => set({ user }),
}));
