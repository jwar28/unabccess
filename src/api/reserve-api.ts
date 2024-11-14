import { getFirestore, collection, getDocs } from 'firebase/firestore';

import { getSpaceById } from './spaces-api';
import { fetchUserData } from './user-api';

export const getReservations = async () => {
	const db = getFirestore();
	const reservationsCollection = collection(db, 'reservations');

	try {
		const querySnapshot = await getDocs(reservationsCollection);

		const reservations = await Promise.all(
			querySnapshot.docs.map(async (docSnapshot) => {
				const reservationData = docSnapshot.data();

				const reservedBy = await fetchUserData(reservationData.reservedBy.id);
				const reservationLocation = await getSpaceById(reservationData.reservationLocation.id);

				return {
					id: docSnapshot.id,
					reservedBy,
					reservationLocation,
					startDate: reservationData.startDate.toDate(),
					finishDate: reservationData.finishDate.toDate(),
					requestReason: reservationData.requestReason,
				};
			}),
		);

		return reservations;
	} catch (error) {
		console.error('Error al obtener las reservas:', error);
		return [];
	}
};
