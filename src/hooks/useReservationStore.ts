import { getReservationsByUser } from '@/api/reserve-api';
import { Reservation } from '@/types/reservation';
import { create } from 'zustand';

interface ReservationStore {
	reservations: Reservation[];
	loading: boolean;
	error: string | null;
	fetchReservations: (uid: string) => Promise<void>;
	addReservation: (newReservation: Reservation) => void;
	resetReservations: () => void;
}

export const useReservationStore = create<ReservationStore>((set) => ({
	reservations: [],
	loading: false,
	error: null,

	fetchReservations: async (uid) => {
		set({ loading: true, error: null });
		try {
			const reservations = await getReservationsByUser(uid);
			set({ reservations, loading: false });
		} catch {
			set({ error: 'Error al obtener las reservas', loading: false });
		}
	},

	addReservation: (newReservation) =>
		set((state) => ({
			reservations: [...state.reservations, newReservation],
		})),

	resetReservations: () => set({ reservations: [], error: null }),
}));
