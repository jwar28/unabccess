'use client';
import useAuth from '@/hooks/useAuth';

import { AreasCard } from '@/components/home/areas-card';
import { QrCard } from '@/components/home/qr-card';
import Layout from '@/components/layout/layout';

export default function Home() {
	const { user } = useAuth();
	return (
		<>
			<Layout>
				<QrCard />
				{user && <AreasCard userId={user.uid} />}
			</Layout>
		</>
	);
}
