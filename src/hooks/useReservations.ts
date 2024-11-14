import { getReservations } from '@/api/reserve-api';
import { Reservation } from '@/types/reservation';
import { useEffect, useState } from 'react';

export const useReservations = () => {
	const [reservations, setReservations] = useState<Reservation[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchReservations = async () => {
			try {
				const data = await getReservations();
				setReservations(data);
			} catch (error) {
				setError('Error al obtener las reservas.');
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchReservations();
	}, []);

	return {
		reservations,
		loading,
		error,
	};
};
