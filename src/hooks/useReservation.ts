import useAuth from '@/hooks/useAuth';
import { useReservationStore } from '@/hooks/useReservationStore';
import { useEffect } from 'react';

export const useReservations = () => {
	const { user } = useAuth();
	const { reservations, fetchReservations } = useReservationStore();

	useEffect(() => {
		if (user?.uid && !reservations.length) {
			fetchReservations(user.uid);
		}
	}, [user?.uid, fetchReservations, reservations.length]);
};
