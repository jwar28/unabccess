import { User } from 'firebase/auth';
import { create } from 'zustand';

/**
 * Interface representing the authentication state.
 *
 * @interface IAuth
 * @property {User | null} user - The authenticated user or null if not authenticated.
 * @property {boolean} loading - Indicates whether the authentication process is loading.
 * @property {string | null} token - The authentication token, or null if not available.
 * @property {Function} setUser - A function to set the user in the store.
 * @property {Function} setLoading - A function to set the loading state in the store.
 * @property {Function} setToken - A function to set the token in the store.
 */
interface IAuth {
	user: User | null;
	loading: boolean;
	token: string | null;
	setUser: (user: User | null) => void;
	setLoading: (loading: boolean) => void;
	setToken: (token: string | null) => void;
}

/**
 * Zustand store for managing the authentication state of the user.
 *
 * It provides the following state and actions:
 * - `user`: Stores the authenticated user or null.
 * - `loading`: Tracks the loading state of the authentication process.
 * - `token`: Stores the authentication token.
 * - `setUser`: Action to set the user state.
 * - `setLoading`: Action to set the loading state.
 * - `setToken`: Action to set the token state.
 *
 * @returns {IAuth} The store state and actions for authentication.
 */
const useAuthStore = create<IAuth>((set) => ({
	setUser: (user) => set({ user }),
	setToken: (token) => set({ token }),
	setLoading: (loading) => set({ loading }),
	user: null,
	token: null,
	loading: false,
}));

export default useAuthStore;
