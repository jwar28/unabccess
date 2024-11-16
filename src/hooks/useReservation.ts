import useAuth from '@/hooks/useAuth';
import { useReservationStore } from '@/hooks/useReservationStore';
import { useEffect } from 'react';

/**
 * Custom hook to fetch user reservations.
 *
 * This hook retrieves the authenticated user's reservations when the user is logged in
 * and the reservations are not yet loaded.
 *
 * It listens for the user's UID and calls the `fetchReservations` function from the
 * `useReservationStore` hook to load the user's reservations.
 *
 * @returns {void}
 */
export const useReservations = () => {
	const { user } = useAuth();
	const { reservations, fetchReservations } = useReservationStore();

	useEffect(() => {
		// Fetch reservations when user is authenticated and no reservations are loaded
		if (user?.uid && !reservations.length) {
			fetchReservations(user.uid);
		}
	}, [user?.uid, fetchReservations, reservations.length]);
};
