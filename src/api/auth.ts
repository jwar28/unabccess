import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "../lib/firebaseConfig";

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
    return result.user;
  } catch (error) {
    console.error("Log in error:", error);
    return null;
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
