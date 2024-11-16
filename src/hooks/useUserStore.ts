import { User } from '@/types/user';
import { create } from 'zustand';

/**
 * Interface for the User store state.
 *
 * This interface defines the structure of the store responsible for managing the user state,
 * including the user data and the method to update the user information.
 *
 * @interface IUserStore
 * @property {User | null} user - The user object, or null if no user is set.
 * @property {function} setUser - Function to update the user object in the store.
 */
interface IUserStore {
	user: User | null;
	setUser: (user: User) => void;
}

/**
 * Custom store to manage user data.
 *
 * This store contains the user state and provides a method for updating the user information.
 *
 * @returns {IUserStore} The state and actions for managing the user data.
 */
export const useUserStore = create<IUserStore>((set) => ({
	/**
	 * The current user object, initially set to null.
	 *
	 * This will hold the user data once it's set.
	 *
	 * @type {User | null}
	 */
	user: null,

	/**
	 * Method to set the user data in the store.
	 *
	 * This function allows updating the `user` state by passing a new `User` object.
	 *
	 * @param {User} user - The new user object to be set in the store.
	 */
	setUser: (user: User) => set({ user }),
}));
