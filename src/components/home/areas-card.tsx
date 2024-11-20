'use client';

import { useReservationStore } from '@/hooks/useReservationStore';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

import { cn, isSpaceActive } from '@/lib/utils';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export const AreasCard = () => {
	const { reservations, error, loading } = useReservationStore();

	const activeReservations = reservations
		.filter((reservation) => reservation.finishDate > new Date())
		.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
		.slice(0, 5);

	if (loading) {
		return (
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Tus reservas</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{[1, 2, 3].map((index) => (
						<div key={index} className="flex items-center justify-between border-b p-4 last:border-b-0 sm:ml-2">
							<div className="space-y-2">
								<Skeleton className="h-4 w-32" /> {/* Para el nombre del espacio */}
								<Skeleton className="h-3 w-48" /> {/* Para la fecha */}
							</div>
							<Skeleton className="h-4 w-16" /> {/* Para el estado (Abierto/Cerrado) */}
						</div>
					))}
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
			<CardContent className={cn(activeReservations.length === 0 ? 'p-6' : 'p-0')}>
				{activeReservations.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-6 text-center text-gray-500">
						<AlertCircle className="mb-4 h-12 w-12 text-gray-400" />
						<p className="text-lg font-semibold text-gray-600">¡No tienes accesos activos!</p>
						<p className="text-sm text-gray-500">Solicita un acceso para comenzar a usar las áreas disponibles.</p>
						<Link href="/access/request-access">
							<Button className="py-2text-white mt-4 rounded-lg px-4">Solicitar acceso</Button>
						</Link>
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
