'use client';

import { useSpaces } from '@/hooks/useSpaces';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

export const RequestAccessForm = () => {
	const [selectedArea, setSelectedArea] = useState('');
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');

	const spaces = useSpaces();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Access request submitted');
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
									{spaces.map((space) => (
										<SelectItem key={space.id} value={space.name}>
											{space.name} (Capacidad: {space.capacity})
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</CardContent>
					</Card>

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

					<Card>
						<CardHeader>
							<CardTitle>Razón de acceso</CardTitle>
							<CardDescription>Explica brevemente la razón para la solicitud</CardDescription>
						</CardHeader>
						<CardContent>
							<Textarea placeholder="Escribe aquí..." />
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
