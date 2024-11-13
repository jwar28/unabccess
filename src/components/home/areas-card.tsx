import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

const accessibleAreas = [
	{ name: 'Biblioteca', status: 'Abierto', accessUntil: '10:00 PM' },
	{ name: 'Laboratorio', status: 'Cerrado', accessUntil: '9:00 AM Mañana' },
	{ name: 'Gimnasio', status: 'Abierto', accessUntil: '11:00 PM' },
	{ name: 'Centro de estudios', status: 'Cerrado', accessUntil: '12:00 AM' },
];

export const AreasCard = () => {
	return (
		<>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Tus areas permitidas</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					{accessibleAreas.map((area, index) => (
						<div key={index} className="flex items-center justify-between border-b p-4 last:border-b-0">
							<div>
								<p className="font-medium">{area.name}</p>
								<p className="text-muted-foreground text-sm">Hasta {area.accessUntil}</p>
							</div>
							<span className={`text-sm ${area.status === 'Abierto' ? 'text-green-500' : 'text-red-500'}`}>
								{area.status}
							</span>
						</div>
					))}
					<Button variant="ghost" className="w-full py-5">
						Mostrar todos
					</Button>
				</CardContent>
			</Card>
		</>
	);
};
