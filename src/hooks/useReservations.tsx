import { getReservationsByUser } from '@/api/reserve-api';
import useAuth from '@/hooks/useAuth';
import { Reservation } from '@/types/reservation';
import { useEffect, useState } from 'react';

export const useUserReservations = () => {
	const { user } = useAuth();
	const [reservations, setReservations] = useState<Reservation[] | null>(null);
	const [loading, setLoading] = useState(true); // Inicialmente en `true`
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchReservations = async () => {
			if (!user?.uid) {
				setReservations([]);
				setLoading(false); // Detenemos el loading si no hay usuario
				return;
			}

			setLoading(true);
			setError(null);

			try {
				const fetchedReservations = await getReservationsByUser(user.uid);
				setReservations(fetchedReservations);
			} catch {
				setError('Error al cargar las reservaciones');
				setReservations([]);
			} finally {
				setLoading(false);
			}
		};

		fetchReservations();
	}, [user?.uid]); // Escuchamos cambios en el `user.uid`

	return { reservations, loading, error };
};
