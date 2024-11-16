import { getSpaces } from '@/api/spaces-api';
import { Space } from '@/types/space';
import { create } from 'zustand';

/**
 * State for managing spaces data.
 *
 * This store is responsible for handling the state of spaces, including fetching spaces data,
 * handling loading states, and managing errors related to spaces data.
 *
 * @interface SpacesState
 * @property {Space[]} spaces - List of spaces.
 * @property {boolean} loading - Indicates whether spaces data is being fetched.
 * @property {string | null} error - Holds error messages if fetching spaces fails.
 * @property {function} fetchSpaces - Function to fetch the spaces data.
 */
interface SpacesState {
	spaces: Space[];
	loading: boolean;
	error: string | null;
	fetchSpaces: () => Promise<void>;
}

/**
 * Custom store to manage the spaces data state.
 *
 * This store includes a method to fetch spaces data from an API and updates the state
 * accordingly. It also manages the loading state and potential errors.
 *
 * @returns {SpacesState} State and actions for managing spaces data.
 */
export const useSpacesStore = create<SpacesState>((set) => ({
	spaces: [],
	loading: false,
	error: null,

	/**
	 * Fetches spaces data from an API and updates the state.
	 *
	 * This function calls the `getSpaces` API method to fetch all spaces and updates the state
	 * with the result. It also manages the loading and error states.
	 *
	 * @returns {Promise<void>}
	 */
	fetchSpaces: async (): Promise<void> => {
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
