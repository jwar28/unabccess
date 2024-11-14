import { collection, getDocs, Timestamp } from 'firebase/firestore';

import { db } from '@/lib/firebaseConfig';

import { getSpaceById } from './spaces-api';
import { fetchUserData } from './user-api';

export const getReservations = async () => {
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
					startDate: reservationData.startDate instanceof Timestamp ? reservationData.startDate.toDate() : new Date(),
					finishDate:
						reservationData.finishDate instanceof Timestamp ? reservationData.finishDate.toDate() : new Date(),
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
