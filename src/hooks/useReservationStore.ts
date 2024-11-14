import { getReservationsByUser } from '@/api/reserve-api';
import { Reservation } from '@/types/reservation';
import { create } from 'zustand';

interface ReservationsStore {
	reservations: Reservation[] | null;
	loading: boolean;
	error: string | null;
	fetchReservations: (userUid: string) => void;
}

export const useReservationsStore = create<ReservationsStore>((set) => ({
	reservations: null,
	loading: true,
	error: null,
	fetchReservations: async (userUid: string) => {
		set({ loading: true });
		try {
			const reservations = await getReservationsByUser(userUid);
			set({ reservations, loading: false });
		} catch {
			set({ error: 'Error al cargar las reservas', loading: false });
		}
	},
}));
