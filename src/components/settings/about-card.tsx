import { Button } from "../ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

export default function AboutCard() {
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle>Acerca de</CardTitle>
					<CardDescription>
						ste proyecto, desarrollado por Javier Guerra, Santiago Áviles y
						Lucas Porras, consiste en un software de gestión de reservas y
						accesos a salones de la Universidad Autónoma de Bucaramanga (UNAB).
						El objetivo principal de la aplicación es facilitar y optimizar el
						proceso de asignación de espacios dentro de la universidad,
						asegurando que los salones sean utilizados de manera eficiente y
						organizada, de acuerdo con las necesidades de los usuarios.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-2">
					<p>Version: 1.0.0</p>
					<p>© 2024 UNABCCESS</p>
					<Button variant="link" className="p-0">
						Privacy Policy
					</Button>
					<Button variant="link" className="p-0">
						Terms of Service
					</Button>
				</CardContent>
			</Card>
		</>
	);
}
