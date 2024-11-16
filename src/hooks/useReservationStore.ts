import { getReservationsByUser } from '@/api/reserve-api';
import { Reservation } from '@/types/reservation';
import { create } from 'zustand';

/**
 * Store for managing reservations.
 *
 * This store is responsible for handling the state of reservations, including fetching,
 * adding new reservations, and resetting the reservation list.
 *
 * @interface ReservationStore
 * @property {Reservation[]} reservations - List of reservations.
 * @property {boolean} loading - Indicates whether the reservations are being fetched.
 * @property {string | null} error - Holds error messages if fetching reservations fails.
 * @property {function} fetchReservations - Function to fetch reservations by user ID.
 * @property {function} addReservation - Function to add a new reservation to the state.
 * @property {function} resetReservations - Function to reset the reservations state.
 */
interface ReservationStore {
	reservations: Reservation[];
	loading: boolean;
	error: string | null;
	fetchReservations: (uid: string) => Promise<void>;
	addReservation: (newReservation: Reservation) => void;
	resetReservations: () => void;
}

/**
 * Custom store to manage the reservation state.
 *
 * This store includes methods for fetching reservations from an API, adding new reservations,
 * and resetting the reservations data.
 *
 * @returns {ReservationStore} Reservation state and actions.
 */
export const useReservationStore = create<ReservationStore>((set) => ({
	reservations: [],
	loading: false,
	error: null,

	/**
	 * Fetches reservations for a specific user based on their UID.
	 *
	 * This function calls the `getReservationsByUser` API method to fetch the user's
	 * reservations and updates the store state accordingly.
	 *
	 * @param {string} uid - The UID of the user whose reservations are to be fetched.
	 * @returns {Promise<void>}
	 */
	fetchReservations: async (uid: string): Promise<void> => {
		set({ loading: true, error: null });
		try {
			const reservations = await getReservationsByUser(uid);
			set({ reservations, loading: false });
		} catch {
			set({ error: 'Error al obtener las reservas', loading: false });
		}
	},

	/**
	 * Adds a new reservation to the state.
	 *
	 * This function adds a new reservation to the existing list of reservations in the store.
	 *
	 * @param {Reservation} newReservation - The reservation to be added to the store.
	 * @returns {void}
	 */
	addReservation: (newReservation: Reservation): void =>
		set((state) => ({
			reservations: [...state.reservations, newReservation],
		})),

	/**
	 * Resets the reservations state.
	 *
	 * This function clears the reservations list and resets any error messages in the store.
	 *
	 * @returns {void}
	 */
	resetReservations: (): void => set({ reservations: [], error: null }),
}));
