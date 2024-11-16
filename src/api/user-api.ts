import { User } from '@/types/user';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '@/lib/firebaseConfig';

const usersRef = collection(db, 'users');

/**
 * Fetches the data of a user from Firestore based on their UID.
 *
 * @param {string} uid - The unique identifier of the user whose data is to be fetched.
 * @returns {Promise<User | null>} A promise that resolves to the User data if it exists, or null if no user is found.
 */
export const fetchUserData = async (uid: string): Promise<User | null> => {
	try {
		const userDocRef = doc(usersRef, uid);
		const userDoc = await getDoc(userDocRef);

		if (userDoc.exists()) {
			return userDoc.data() as User;
		} else {
			console.log('No such user!');
			return null;
		}
	} catch (error) {
		console.error('Error fetching user data:', error);
		return null;
	}
};

/**
 * Write data of a user in Firestore.
 *
 * @param {string} uid - The unique identifier of the user whose data is to be set.
 * @param {User} userData - The User object containing the data to be written to Firestore.
 * @returns {Promise<boolean>} A promise that resolves to true if the data is successfully written, or false if an error occurs.
 */
export const setUserData = async (uid: string, userData: User): Promise<boolean> => {
	try {
		const userDocRef = doc(usersRef, uid);
		await setDoc(userDocRef, userData, { merge: true });

		console.log('User data successfully written!');
		return true;
	} catch (error) {
		console.error('Error writing user data:', error);
		return false;
	}
};
