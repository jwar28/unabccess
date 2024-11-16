'use client';

import { useReservationStore } from '@/hooks/useReservationStore';

import { ActiveAccessCard } from '@/components/access/active-access-card';
import { ExpiredAccessCard } from '@/components/access/expired-access-card';
import { RequestAccessCard } from '@/components/access/request-access-card';
import Layout from '@/components/layout/layout';

export default function AccessPage() {
	const { reservations } = useReservationStore();

	const activeReservations = reservations.filter((reservation) => reservation.finishDate > new Date());
	const inactiveReservations = reservations.filter((reservation) => reservation.finishDate <= new Date());

	return (
		<>
			<Layout>
				<RequestAccessCard />
				<div className="flex w-full flex-col gap-8 sm:flex-row">
					<div className="sm:basis-1/2">
						<ActiveAccessCard activeReserves={activeReservations} />
					</div>

					<div className="sm:basis-1/2">
						<ExpiredAccessCard expiredReserves={inactiveReservations} />
					</div>
				</div>
			</Layout>
		</>
	);
}
