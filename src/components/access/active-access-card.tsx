import { Reservation } from '@/types/reservation';
import { AlertCircle, Calendar } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';

interface ActiveAccessCardProps {
	activeReserves: Reservation[];
}

export const ActiveAccessCard = ({ activeReserves }: ActiveAccessCardProps) => {
	return (
		<>
			<h2 className="mb-4 text-xl font-semibold">Accesos activos</h2>
			<Card className="h-fit">
				<CardHeader>
					<CardTitle>Tus accesos</CardTitle>
					<CardDescription>Áreas con acceso permitido</CardDescription>
				</CardHeader>
				<CardContent>
					{activeReserves.length > 0 ? (
						<ScrollArea>
							<ul className="space-y-4">
								{activeReserves.map((access) => (
									<li
										key={access.id}
										className="flex flex-wrap items-center justify-between gap-3 rounded-lg py-2 hover:bg-gray-100"
									>
										<div className="flex items-center space-x-4">
											<Badge variant="secondary">Activo</Badge>
											<span className="font-medium">{access.reservationLocation.name}</span>
										</div>
										<div className="text-muted-foreground pr-2 text-sm">
											<Calendar className="mr-1 inline-block h-4 w-4" />
											Hasta: {access.finishDate.toLocaleString()}
										</div>
									</li>
								))}
							</ul>
						</ScrollArea>
					) : (
						<div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-6 text-center text-gray-500">
							<AlertCircle className="mb-4 h-12 w-12 text-gray-400" />
							<p className="text-lg font-semibold text-gray-600">¡No tienes accesos activos!</p>
							<p className="text-sm text-gray-500">Solicita un acceso para comenzar a usar las áreas disponibles.</p>
							<Button className="mt-4 rounded-lg px-4 py-2 text-white">Solicitar acceso</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
};
