'use client';

import { useUserStore } from '@/hooks/useUserStore';

import { RequestAccessForm } from '@/components/access/request-access-form';
import Layout from '@/components/layout/layout';

export default function AccessPage() {
	const { user } = useUserStore();

	return (
		<>
			<Layout>
				<RequestAccessForm currentUser={user} />
			</Layout>
		</>
	);
}
