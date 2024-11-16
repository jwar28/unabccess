'use client';

import useAuth from '@/hooks/useAuth';
import { useReservations } from '@/hooks/useReservation';

import { Navigation } from './navigation';

interface LayoutProps {
	children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const { user, loading } = useAuth();
	useReservations();

	if (loading) return <p>Cargando...</p>;
	if (!user) return null;

	return (
		<>
			<Navigation uid={user.uid}>
				<main className="flex flex-col gap-4 pb-16 sm:pb-3">{children}</main>
			</Navigation>
		</>
	);
}
