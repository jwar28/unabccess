'use client';

import { onAuthStateChanged } from 'firebase/auth';
import useAuthStore from './useAuthStore';
import { useEffect } from 'react';
import { auth } from '@/lib/firebaseConfig';
import { useRouter } from 'next/navigation';

const useAuth = () => {
	const router = useRouter();
	const { user, token, loading, setUser, setToken, setLoading } = useAuthStore();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (!user) {
				setLoading(false);
				router.push('/auth');
			} else {
				setUser(user);
				setToken(await user?.getIdToken());
			}
		});

		return () => {
			unsubscribe();
		};
	}, [router, setLoading, setToken, setUser]);

	return { user, token, loading, setLoading };
};

export default useAuth;
