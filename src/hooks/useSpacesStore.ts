import { getSpaces } from '@/api/spaces-api';
import { Space } from '@/types/space';
import { create } from 'zustand';

interface SpacesState {
	spaces: Space[];
	loading: boolean;
	error: string | null;
	fetchSpaces: () => Promise<void>;
}

export const useSpacesStore = create<SpacesState>((set) => ({
	spaces: [],
	loading: false,
	error: null,
	fetchSpaces: async () => {
		set({ loading: true, error: null });
		try {
			const spacesData = await getSpaces();
			set({ spaces: spacesData, loading: false });
		} catch (error) {
			set({ loading: false, error: 'Error al cargar los espacios' });
			console.error('Error al cargar los espacios:', error);
		}
	},
}));
