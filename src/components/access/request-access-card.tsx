import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '../ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';

export const RequestAccessCard = () => {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Necesitas un nuevo acceso?</CardTitle>
					<CardDescription>Solicita un nuevo acceso para el campus</CardDescription>
				</CardHeader>
				<CardFooter>
					<Link href="/access/request-access">
						<Button className="w-full">
							Solicitar acceso
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</>
	);
};
