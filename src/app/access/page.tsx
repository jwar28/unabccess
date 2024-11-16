'use client';

import { useReservationStore } from '@/hooks/useReservationStore';
import { Reservation } from '@/types/reservation';

import { ActiveAccessCard } from '@/components/access/active-access-card';
import { ExpiredAccessCard } from '@/components/access/expired-access-card';
import { RequestAccessCard } from '@/components/access/request-access-card';
import Layout from '@/components/layout/layout';

const sortReservations = (reservations: Reservation[], isActive: boolean, isAscendente: boolean) => {
	const filteredReservations = reservations.filter((reservation) =>
		isActive ? reservation.finishDate > new Date() : reservation.finishDate <= new Date(),
	);

	return filteredReservations.sort((a, b) =>
		isAscendente ? a.finishDate.getTime() - b.finishDate.getTime() : b.finishDate.getTime() - a.finishDate.getTime(),
	);
};

export default function AccessPage() {
	const { reservations } = useReservationStore();

	const activeReservations = sortReservations(reservations, true, true);
	const inactiveReservations = sortReservations(reservations, false, false);

	return (
		<>
			<Layout>
				<RequestAccessCard />
				<div className="flex w-full flex-col gap-8 sm:flex-row">
					<div className="sm:basis-1/2">
						<ActiveAccessCard activeReserves={activeReservations} />
					</div>

					<div className="w-full sm:basis-1/2">
						<ExpiredAccessCard expiredReserves={inactiveReservations} />
					</div>
				</div>
			</Layout>
		</>
	);
}
