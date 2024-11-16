'use client';

import useAuth from '@/hooks/useAuth';
import { useReservationStore } from '@/hooks/useReservationStore';
import Link from 'next/link';
import { useEffect } from 'react';

import { isSpaceActive } from '@/lib/utils';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const AreasCard = () => {
	const { user } = useAuth();
	const { reservations, loading, error, fetchReservations } = useReservationStore();

	useEffect(() => {
		if (user?.uid && !reservations.length) {
			fetchReservations(user.uid);
		}
	}, [user?.uid, fetchReservations, reservations.length]);

	const activeReservations = reservations
		.filter((reservation) => reservation.finishDate > new Date())
		.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
		.slice(0, 5);

	if (loading) {
		return (
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Cargando...</CardTitle>
				</CardHeader>
				<CardContent className="py-4">Cargando...</CardContent>
			</Card>
		);
	}

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
			<CardHeader className="pb-2 text-center">
				<CardTitle>Tus reservas</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				{activeReservations.length === 0 ? (
					<p className="p-4 text-center">No tienes reservas activas.</p>
				) : (
					activeReservations.map((reservation) => (
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
					))
				)}
			</CardContent>
			<Link href="/access">
				<Button variant="ghost" className="w-full py-5">
					Mostrar todos
				</Button>
			</Link>
		</Card>
	);
};
