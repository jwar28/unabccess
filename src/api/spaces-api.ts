import { Space } from '@/types/space';
import { collection, getDocs, getDoc, doc, DocumentSnapshot } from 'firebase/firestore';

import { db } from '@/lib/firebaseConfig';

const spacesCollection = collection(db, 'spaces');

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

export const getSpaceById = async (spaceId: string): Promise<Space> => {
	try {
		const spaceDoc = await getDoc(doc(spacesCollection, spaceId));
		return transformSpaceData(spaceDoc);
	} catch (error) {
		console.error('Error al obtener el espacio:', error);
		return {} as Space;
	}
};
