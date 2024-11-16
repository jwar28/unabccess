import { Reservation } from '@/types/reservation';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface ActiveAccessCardProps {
	activeReserves: Reservation[];
}

export const ActiveAccessCard = ({ activeReserves }: ActiveAccessCardProps) => {
	return (
		<>
			<h2 className="mb-4 text-xl font-semibold">Accesos activos</h2>
			<Card>
				<CardTitle>
					<div className="flex flex-col gap-4 p-4 sm:flex-row sm:flex-wrap sm:justify-around">
						{activeReserves.map((reserve) => (
							<Card key={reserve.id} className="w-full sm:w-[230px]">
								<CardHeader>
									<CardTitle>{reserve.reservationLocation.name}</CardTitle>
									<CardDescription>Valido hasta {reserve.finishDate.toLocaleString()}</CardDescription>
								</CardHeader>
								<CardContent>
									<Badge variant="secondary">Activo</Badge>
								</CardContent>
							</Card>
						))}
					</div>
				</CardTitle>
			</Card>
		</>
	);
};
