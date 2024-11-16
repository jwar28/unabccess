import { Reservation } from '@/types/reservation';
import { User } from '@/types/user';
import { collection, getDocs, query, where, addDoc, Timestamp, DocumentSnapshot } from 'firebase/firestore';

import { db } from '@/lib/firebaseConfig';

import { getSpaceById } from './spaces-api';

const reservationsCollection = collection(db, 'reservations');

/**
 * Extracts the space ID from a given path.
 *
 * @param {string} path - The path of the reservation that includes the space ID.
 * @returns {string} The extracted space ID.
 */
export const extractSpaceId = (path: string): string => {
	const parts = path.split('/');
	return parts[2] || '';
};

/**
 * Transforms Firestore document data into a Reservation object.
 *
 * @param {DocumentSnapshot} doc - The Firestore document snapshot to transform.
 * @returns {Promise<Reservation>} A promise that resolves to the transformed Reservation object.
 * @throws {Error} If the reservation data is invalid or the space ID cannot be extracted.
 */
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

/**
 * Retrieves reservations made by a specific user.
 *
 * @param {string} uid - The UID of the user whose reservations are to be retrieved.
 * @returns {Promise<Reservation[]>} A promise that resolves to an array of Reservation objects.
 */
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

/**
 * Creates a new reservation in the Firestore database.
 *
 * @param {string} uid - The UID of the user making the reservation.
 * @param {string} selectedArea - The ID of the area to be reserved.
 * @param {Date} startDateTime - The start date and time of the reservation.
 * @param {Date} endDateTime - The end date and time of the reservation.
 * @param {string} requestReason - The reason for the reservation.
 * @param {User} user - The user who is making the reservation.
 * @returns {Promise<Reservation | null>} A promise that resolves to the newly created Reservation object, or null if an error occurred.
 */
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
