import { QrCode } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export const QrCard = () => {
	return (
		<>
			<Card>
				<CardHeader className="pb-2">
					<CardTitle>Acceso rapido</CardTitle>
					<CardDescription>Escanea este codigo en la entrada</CardDescription>
				</CardHeader>
				<CardContent className="flex justify-center py-4">
					<QrCode className="h-40 w-40" />
				</CardContent>
			</Card>
		</>
	);
};
