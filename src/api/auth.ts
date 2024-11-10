/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { auth } from "../lib/firebaseConfig";
import { fetchUserData } from "./userApi";

/**
 * Log in with email and password.
 * @param {string} email - User email.
 * @param {string} password - User password.
 * @returns {Promise<User | null>} Authenticaded user or null if an error occur.
 */
export const signInWithEmail = async (
	email: string,
	password: string
): Promise<User | null> => {
	try {
		const result = await signInWithEmailAndPassword(auth, email, password);
		fetchUserData(result.user.uid);
		return result.user;
	} catch (error) {
		console.error("Log in error:", error);
		return null;
	}
};

const writeUserData = (
	UUID: string,
	userID: string,
	name: string,
	lastName: string,
	email: string,
	career: string
) => {
	const db = getDatabase();
	set(ref(db, "users/" + UUID), {
		userId: userID,
		name: name,
		lastName: lastName,
		email: email,
		career: career,
	});
};

export const createUser = async (
	userID: string,
	name: string,
	lastName: string,
	email: string,
	password: string,
	career: string
) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);
		const user = userCredential.user;
		writeUserData(user.uid, userID, name, lastName, email, career);
		return user;
	} catch (error: any) {
		console.error("Error al crear el usuario:", error.message);
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
		console.error("Log out error:", error);
	}
};
