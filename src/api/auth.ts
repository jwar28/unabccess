/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	User,
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { fetchUserData, setUserData } from "./userApi";
import { useUserStore } from "@/hooks/useUserStore";

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
		fetchUserData(result.user.uid).then((userData) => {
			if (userData) {
				useUserStore.getState().setUser(userData);
			} else {
				console.error("Error fetching user data");
			}
		});
		return result.user;
	} catch (error) {
		console.error("Log in error:", error);
		return null;
	}
};


export const registerUser = async (
	studentId: string,
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
		const userData = { email, name, lastName, studentId, career };
		setUserData(userCredential.user.uid, userData).then(success => {
			if (success) {
				console.log("Datos del usuario guardados exitosamente.");
			} else {
				console.log("Hubo un error al guardar los datos del usuario.");
			}
		});
		return userData;
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
