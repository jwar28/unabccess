import { Space } from '@/types/space';
import { collection, getDocs, getDoc, doc, DocumentSnapshot } from 'firebase/firestore';

import { db } from '@/lib/firebaseConfig';

const spacesCollection = collection(db, 'spaces');

/**
 * Transforms a Firestore document snapshot into a Space object.
 *
 * @param {DocumentSnapshot} doc - The Firestore document snapshot to transform.
 * @returns {Space} The transformed Space object.
 * @throws {Error} If the space data is not found.
 */
const transformSpaceData = (doc: DocumentSnapshot): Space => {
	const data = doc.data();
	if (!data) {
		throw new Error('Space data not found');
	}

	return {
		id: doc.id,
		name: data.name,
		capacity: data.capacity,
		openTime: data.openTime.toDate(),
		closeTime: data.closeTime.toDate(),
	};
};

/**
 * Retrieves all spaces from the Firestore database.
 *
 * @returns {Promise<Space[]>} A promise that resolves to an array of Space objects.
 */
export const getSpaces = async (): Promise<Space[]> => {
	try {
		const querySnapshot = await getDocs(spacesCollection);
		const spaces = querySnapshot.docs.map(transformSpaceData);
		return spaces;
	} catch (error) {
		console.error('Error al obtener los espacios:', error);
		return [];
	}
};

/**
 * Retrieves a space by its ID from the Firestore database.
 *
 * @param {string} spaceId - The ID of the space to retrieve.
 * @returns {Promise<Space>} A promise that resolves to the Space object.
 */
export const getSpaceById = async (spaceId: string): Promise<Space> => {
	try {
		const spaceDoc = await getDoc(doc(spacesCollection, spaceId));
		return transformSpaceData(spaceDoc);
	} catch (error) {
		console.error('Error al obtener el espacio:', error);
		return {} as Space;
	}
};
