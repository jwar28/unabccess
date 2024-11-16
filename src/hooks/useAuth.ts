'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { auth } from '@/lib/firebaseConfig';

import useAuthStore from './useAuthStore';

/**
 * Custom hook to manage user authentication state.
 * It listens to the authentication state changes and updates the user data in the store.
 * If the user is not authenticated, it redirects to the authentication page.
 *
 * @returns {Object} An object containing the user's authentication state: `user`, `token`, `loading`, and the `setLoading` function.
 */
const useAuth = () => {
	const router = useRouter();
	const { user, token, loading, setUser, setToken, setLoading } = useAuthStore();

	useEffect(() => {
		// Subscribes to the authentication state changes
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setLoading(false);
				// Redirects to authentication page if no user is logged in
				router.push('/auth');
			} else {
				// Sets the user and token in the store if the user is authenticated
				setUser(user);
				setToken(await user?.getIdToken());
			}
		});

		// Cleanup the subscription on component unmount
		return () => {
			unsubscribe();
		};
	}, [router, setLoading, setToken, setUser]);

	return { user, token, loading, setLoading };
};

export default useAuth;
