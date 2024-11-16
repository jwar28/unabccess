import { Reservation } from '@/types/reservation';
import { Calendar } from 'lucide-react';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface ExpiredAccessCardProps {
	expiredReserves: Reservation[];
}

export const ExpiredAccessCard = ({ expiredReserves }: ExpiredAccessCardProps) => {
	return (
		<>
			<section>
				<h2 className="mb-4 text-xl font-semibold">Access History</h2>
				<Card className="h-fit">
					<CardHeader>
						<CardTitle>Historial de accesos</CardTitle>
						<CardDescription>Mira tus accesos recientes</CardDescription>
					</CardHeader>
					<CardContent>
						<ScrollArea>
							<ul className="space-y-4">
								{expiredReserves.map((reserve) => (
									<li key={reserve.id} className="flex items-center space-x-4 rounded-lg p-2 hover:bg-gray-100">
										<div className="flex-shrink-0">
											<Badge variant="outline">{reserve.reservationLocation.name}</Badge>
										</div>
										<div className="min-w-0 flex-1">
											<p className="truncate text-sm font-medium">
												<Calendar className="mr-1 inline-block h-4 w-4" />
												{reserve.startDate.toLocaleString()} - {reserve.finishDate.toLocaleString()}
											</p>
										</div>
									</li>
								))}
							</ul>
						</ScrollArea>
					</CardContent>
				</Card>
			</section>
		</>
	);
};
