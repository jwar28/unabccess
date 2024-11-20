import { Reservation } from '@/types/reservation';
import { Calendar } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '../ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';

interface ExpiredAccessCardProps {
	expiredReserves: Reservation[];
}

export const ExpiredAccessCard = ({ expiredReserves }: ExpiredAccessCardProps) => {
	return (
		<>
			<h2 className="mb-4 text-xl font-semibold">Historial de accesos</h2>
			<Card className="h-fit">
				<CardHeader>
					<CardTitle>Accesos expirados</CardTitle>
					<CardDescription>Mira tus accesos recientes</CardDescription>
				</CardHeader>
				<CardContent>
					{expiredReserves.length > 0 ? (
						<ScrollArea>
							<ul className="space-y-4">
								{expiredReserves.map((reserve) => (
									<li key={reserve.id} className="flex items-center space-x-2 rounded-lg py-2 hover:bg-gray-100">
										<div>
											<Badge variant="outline">{reserve.reservationLocation.name}</Badge>
										</div>
										<div>
											<p className="truncate text-sm font-medium">
												<Calendar className="mr-1 inline-block h-4 w-4" />
												{reserve.finishDate.toLocaleString()}
											</p>
										</div>
									</li>
								))}
							</ul>
						</ScrollArea>
					) : (
						<div className="flex h-[212px] flex-col items-center justify-center py-8 text-center">
							<Image src="/no-data.png" alt="Sin accesos expirados" width={96} height={96} className="mb-4" />
							<p className="text-gray-500">No tienes accesos expirados en tu historial.</p>
						</div>
					)}
				</CardContent>
			</Card>
		</>
	);
};
