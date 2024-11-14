/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserStore } from '@/hooks/useUserStore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';

import { auth } from '../lib/firebaseConfig';
import { fetchUserData, setUserData } from './user-api';

/**
 * Log in with email and password.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Promise<User | null>} Authenticaded user or null if an error occur.
 */
export const signInWithEmail = async (email: string, password: string): Promise<User | null> => {
	try {
		const result = await signInWithEmailAndPassword(auth, email, password);
		const userData = await fetchUserData(result.user.uid);

		if (userData) {
			useUserStore.getState().setUser(userData);
			return result.user;
		}

		return null;
	} catch (error) {
		console.error('Log in error:', error);
		return null;
	}
};

/**
 * Registers a new user by creating a user account with email and password,
 * and then stores the user's additional data in the system.
 *
 * @param {string} studentId - The student's unique identifier.
 * @param {string} name - The user's first name.
 * @param {string} lastName - The user's last name.
 * @param {string} email - The user's email address.
 * @param {string} password - The password for the user's account.
 * @param {string} career - The career or program the user is enrolled in.
 *
 * @returns {Promise<Object>} - The user data that was saved, including email, name, last name, studentId, and career.
 * @throws {Error} - Throws an error if the user creation or data saving fails.
 *
 * @example
 * const userData = await registerUser('12345', 'John', 'Doe', 'john.doe@example.com', 'password123', 'Computer Science');
 */
export const registerUser = async (
	studentId: string,
	name: string,
	lastName: string,
	email: string,
	password: string,
	career: string,
): Promise<object> => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		const userData = { email, name, lastName, studentId, career };

		const success = await setUserData(userCredential.user.uid, userData);
		if (success) {
			console.log('Datos del usuario guardados exitosamente.');
		} else {
			console.log('Hubo un error al guardar los datos del usuario.');
		}

		return userData;
	} catch (error: any) {
		console.error('Error al crear el usuario:', error.message);
		throw new Error(error.message);
	}
};

/**
 * Close user session.
 * @returns {Promise<void>}
 */
export const logout = async (): Promise<void> => {
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Log out error:', error);
	}
};
