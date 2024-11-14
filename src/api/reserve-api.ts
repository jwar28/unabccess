import { Reservation } from '@/types/reservation';
import { collection, getDocs, query, Timestamp, where, getDoc, doc } from 'firebase/firestore';

import { db } from '@/lib/firebaseConfig';

import { getSpaceById } from './spaces-api';

export const getReservationsByUser = async (userUid: string) => {
	const reservationsCollection = collection(db, 'reservations');

	try {
		const q = query(reservationsCollection, where('reservedBy', '==', doc(db, `/users/${userUid}`)));

		const querySnapshot = await getDocs(q);

		const reservations = await Promise.all(
			querySnapshot.docs.map(async (docSnapshot) => {
				const reservationData = docSnapshot.data();
				const reservedByRef = reservationData.reservedBy;
				const reservedByDoc = await getDoc(reservedByRef);
				const reservedBy = reservedByDoc.exists() ? reservedByDoc.data() : null;
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

		return reservations as Reservation[];
	} catch (error) {
		console.error('Error al obtener las reservas del usuario:', error);
		return [];
	}
};
