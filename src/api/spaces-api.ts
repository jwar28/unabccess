import { Space } from '@/types/space';
import { getFirestore, collection, getDocs, Timestamp, getDoc, doc } from 'firebase/firestore';

const db = getFirestore();
const spacesCollection = collection(db, 'spaces');

export const getSpaces = async (): Promise<Space[]> => {
	try {
		const querySnapshot = await getDocs(spacesCollection);
		const spaces = querySnapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				name: data.name || '',
				capacity: data.capacity || 0,
				openTime: data.openTime instanceof Timestamp ? data.openTime.toDate() : new Date(),
				closeTime: data.closeTime instanceof Timestamp ? data.closeTime.toDate() : new Date(),
			} as Space;
		});
		return spaces;
	} catch (error) {
		console.error('Error al obtener los espacios:', error);
		return [];
	}
};

export const getSpaceById = async (spaceId: string): Promise<Space> => {
	const spaceDoc = await getDoc(doc(spacesCollection, spaceId));
	return { id: spaceDoc.id, ...spaceDoc.data() } as Space;
};
