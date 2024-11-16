import { Reservation } from '@/types/reservation';
import { User } from '@/types/user';
import { collection, getDocs, query, where, addDoc, Timestamp, DocumentSnapshot } from 'firebase/firestore';

import { db } from '@/lib/firebaseConfig';

import { getSpaceById } from './spaces-api';

const reservationsCollection = collection(db, 'reservations');

export const extractSpaceId = (path: string): string => {
	const parts = path.split('/');
	return parts[2] || '';
};

const transformReservationData = async (doc: DocumentSnapshot): Promise<Reservation> => {
	const data = doc.data();
	if (!data || !data.reservationLocation || typeof data.reservationLocation !== 'string') {
		throw new Error(`Invalid reservation data or reservationLocation for doc ID: ${doc.id}`);
	}

	const spaceId = extractSpaceId(data.reservationLocation);
	if (!spaceId) {
		throw new Error(`Invalid spaceId extracted for reservation ID: ${doc.id}`);
	}

	const reservationLocation = await getSpaceById(spaceId);

	return {
		id: doc.id,
		reservedBy: data.reservedBy,
		reservationLocation,
		startDate: data.startDate.toDate(),
		finishDate: data.finishDate.toDate(),
		requestReason: data.requestReason,
	};
};

export const getReservationsByUser = async (uid: string): Promise<Reservation[]> => {
	const q = query(reservationsCollection, where('reservedBy', '==', `/users/${uid}`));

	try {
		const querySnapshot = await getDocs(q);

		const reserves = await Promise.all(querySnapshot.docs.map(transformReservationData));

		console.log(reserves);
		return reserves;
	} catch (error) {
		console.error('Error al obtener las reservas: ', error);
		return [];
	}
};

export const createReservation = async (
	uid: string,
	selectedArea: string,
	startDateTime: Date,
	endDateTime: Date,
	requestReason: string,
	user: User,
): Promise<Reservation | null> => {
	try {
		const newReservationData = {
			reservedBy: `/users/${uid}`,
			reservationLocation: `/spaces/${selectedArea}`,
			startDate: Timestamp.fromDate(startDateTime),
			finishDate: Timestamp.fromDate(endDateTime),
			requestReason,
		};

		const reservationRef = await addDoc(reservationsCollection, newReservationData);
		const space = await getSpaceById(selectedArea);

		return {
			id: reservationRef.id,
			reservedBy: user,
			reservationLocation: space,
			startDate: startDateTime,
			finishDate: endDateTime,
			requestReason,
		};
	} catch (error) {
		console.error('Error al crear la reserva: ', error);
		return null;
	}
};
