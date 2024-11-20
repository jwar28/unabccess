'use client';

import { useReservationStore } from '@/hooks/useReservationStore';
import Image from 'next/image';
import Link from 'next/link';

import { isSpaceActive } from '@/lib/utils';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const AreasCard = () => {
	const { reservations, error } = useReservationStore();

	const activeReservations = reservations
		.filter((reservation) => reservation.finishDate > new Date())
		.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
		.slice(0, 5);

	if (error) {
		return (
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Error al cargar reservas</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<p className="text-center text-red-500">{error}</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle>Tus reservas</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				{activeReservations.length === 0 ? (
					<div className="flex flex-col items-center">
						<p className="p-4 text-center">No tienes reservas activas.</p>
						<Image src="/empty.png" alt="empty" width={300} height={200} />
					</div>
				) : (
					<div>
						{activeReservations.map((reservation) => (
							<div
								key={reservation.id}
								className="flex items-center justify-between border-b p-4 last:border-b-0 sm:ml-2"
							>
								<div>
									<p className="font-medium">{reservation.reservationLocation.name}</p>
									<p className="text-muted-foreground text-sm">Hasta {reservation.finishDate.toLocaleString()}</p>
								</div>
								<span
									className={`mr-2 text-sm ${
										isSpaceActive(reservation.reservationLocation.openTime, reservation.reservationLocation.closeTime)
											? 'text-green-500'
											: 'text-red-500'
									}`}
								>
									{isSpaceActive(reservation.reservationLocation.openTime, reservation.reservationLocation.closeTime)
										? 'Abierto'
										: 'Cerrado'}
								</span>
							</div>
						))}
						<Link href="/access">
							<Button variant="ghost" className="w-full py-5">
								Mostrar todos
							</Button>
						</Link>
					</div>
				)}
			</CardContent>
		</Card>
	);
};
