'use client';

import { useReservationStore } from '@/hooks/useReservationStore';

import { AreasCard } from '@/components/home/areas-card';
import { QrCard } from '@/components/home/qr-card';
import Layout from '@/components/layout/layout';
import { NavSkeleton } from '@/components/layout/nav-skeleton';

export default function Home() {
	const { loading } = useReservationStore();

	if (loading) {
		return <NavSkeleton />;
	}

	return (
		<>
			<Layout>
				<QrCard />
				<AreasCard />
			</Layout>
		</>
	);
}
