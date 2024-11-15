'use client';

import useAuth from '@/hooks/useAuth';
import { useReservationStore } from '@/hooks/useReservationStore';
import Link from 'next/link';
import { useEffect } from 'react';

import { isReservationActive } from '@/lib/utils';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export const AreasCard = () => {
	const { user } = useAuth();
	const { reservations, loading, error, fetchReservations } = useReservationStore();

	useEffect(() => {
		if (user?.uid) {
			fetchReservations(user.uid);
		}
	}, [user?.uid, fetchReservations]);

	if (loading) {
		return (
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Cargando reservas...</CardTitle>
				</CardHeader>
				<CardContent className="py-4">
					<p className="text-center">Cargando...</p>
				</CardContent>
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
			<CardHeader className="pb-2">
				<CardTitle>Tus reservas</CardTitle>
			</CardHeader>
			<CardContent className="p-0">
				{reservations.length === 0 ? (
					<p className="p-4 text-center">No tienes reservas activas.</p>
				) : (
					reservations.map((reservation) => (
						<div key={reservation.id} className="flex items-center justify-between border-b p-4 last:border-b-0">
							<div>
								<p className="font-medium">{reservation.reservationLocation.name}</p>
								<p className="text-muted-foreground text-sm">Hasta {reservation.finishDate.toLocaleString()}</p>
							</div>
							<span
								className={`text-sm ${
									isReservationActive(reservation.startDate, reservation.finishDate) ? 'text-green-500' : 'text-red-500'
								}`}
							>
								{isReservationActive(reservation.startDate, reservation.finishDate) ? 'Abierto' : 'Cerrado'}
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
