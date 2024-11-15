'use client';

import { createReservation } from '@/api/reserve-api';
import { toast } from '@/hooks/use-toast';
import useAuth from '@/hooks/useAuth';
import { useReservationStore } from '@/hooks/useReservationStore';
import { useSpacesStore } from '@/hooks/useSpacesStore';
import { User } from '@/types/user';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface RequestAccessFormProps {
	currentUser: User | null;
}

export const RequestAccessForm = ({ currentUser }: RequestAccessFormProps) => {
	const [selectedArea, setSelectedArea] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [requestReason, setRequestReason] = useState('');
	const router = useRouter();

	const { user } = useAuth();
	const { addReservation } = useReservationStore();
	const { spaces, loading, error, fetchSpaces } = useSpacesStore();

	useEffect(() => {
		if (spaces.length === 0) {
			fetchSpaces();
		}
	}, [spaces, fetchSpaces]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!user) {
			toast({
				title: 'Error',
				description: 'No estás autenticado',
				variant: 'destructive',
			});
			return;
		}

		const startDateTime = new Date(`${startDate}T${startTime}`);
		const endDateTime = new Date(`${endDate}T${endTime}`);

		if (!currentUser) {
			toast({
				title: 'Error',
				description: 'No se ha encontrado el usuario actual',
				variant: 'destructive',
			});
			return;
		}

		const newReservation = await createReservation(
			user.uid,
			selectedArea,
			startDateTime,
			endDateTime,
			requestReason,
			currentUser,
		);

		if (newReservation) {
			addReservation(newReservation);

			toast({
				title: 'Reserva creada',
				description: `Tu reserva ha sido creada con éxito. ID: ${newReservation.id}`,
			});

			router.push('/access');
		} else {
			toast({
				title: 'Error',
				description: 'Hubo un error al crear la reserva. Intenta nuevamente.',
				variant: 'destructive',
			});
		}
	};

	return (
		<div className="flex flex-col bg-background text-foreground">
			<header className="bg-primary text-primary-foreground flex items-center py-4">
				<Link href="/access" className="mr-2">
					<Button variant="ghost" size="icon" className="mr-2">
						<ArrowLeft className="h-6 w-6" />
					</Button>
				</Link>
				<h1 className="text-xl font-bold">Solicitar acceso</h1>
			</header>

			<main className="flex-1 max-sm:pb-4">
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Selección de área */}
					<Card>
						<CardHeader>
							<CardTitle>Seleccionar área</CardTitle>
							<CardDescription>Selecciona el área a la que necesitas acceso</CardDescription>
						</CardHeader>
						<CardContent>
							<Select value={selectedArea} onValueChange={setSelectedArea}>
								<SelectTrigger>
									<SelectValue placeholder="Seleccionar área" />
								</SelectTrigger>
								<SelectContent>
									{loading ? (
										<SelectItem value="loading" disabled>
											Cargando...
										</SelectItem>
									) : error ? (
										<SelectItem value="loading" disabled>
											{error}
										</SelectItem>
									) : (
										spaces.map((space) => (
											<SelectItem key={space.id} value={space.id}>
												{space.name} (Capacidad: {space.capacity})
											</SelectItem>
										))
									)}
								</SelectContent>
							</Select>
						</CardContent>
					</Card>

					{/* Periodo de acceso */}
					<Card>
						<CardHeader>
							<CardTitle>Periodo de acceso</CardTitle>
							<CardDescription>Especifica la hora y fecha que necesitas para el acceso</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="start-date">Fecha inicio</Label>
									<div className="relative">
										<Calendar className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform" />
										<Input
											id="start-date"
											type="date"
											value={startDate}
											onChange={(e) => setStartDate(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="end-date">Fecha fin</Label>
									<div className="relative">
										<Calendar className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform" />
										<Input
											id="end-date"
											type="date"
											value={endDate}
											onChange={(e) => setEndDate(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
							</div>
							<div className="grid gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="start-time">Hora inicio</Label>
									<div className="relative">
										<Clock className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform" />
										<Input
											id="start-time"
											type="time"
											value={startTime}
											onChange={(e) => setStartTime(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
								<div className="space-y-2">
									<Label htmlFor="end-time">Hora fin</Label>
									<div className="relative">
										<Clock className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 transform" />
										<Input
											id="end-time"
											type="time"
											value={endTime}
											onChange={(e) => setEndTime(e.target.value)}
											className="pl-10"
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Razón de acceso */}
					<Card>
						<CardHeader>
							<CardTitle>Razón de acceso</CardTitle>
							<CardDescription>Explica brevemente la razón para la solicitud</CardDescription>
						</CardHeader>
						<CardContent>
							<Textarea
								placeholder="Escribe aquí..."
								value={requestReason}
								onChange={(e) => setRequestReason(e.target.value)}
							/>
						</CardContent>
						<CardFooter>
							<Button type="submit" className="w-full">
								Solicitar acceso
							</Button>
						</CardFooter>
					</Card>
				</form>
			</main>
		</div>
	);
};
