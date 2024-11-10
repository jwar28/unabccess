import Layout from "@/components/layout/layout";
import NotificationCard from "@/components/notifications/notification-card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";

const notifications = [
	{
		id: 1,
		title: "Acceso a Laboratorio de Ciencias",
		description: "Tu acceso al Laboratorio de Ciencias ha sido aprobado.",
		time: "Hace 1 hora",
		read: false,
	},
	{
		id: 2,
		title: "Nueva Sala de Estudio",
		description: "La nueva Sala de Estudio ya está disponible para reserva.",
		time: "Hace 2 días",
		read: true,
	},
	{
		id: 3,
		title: "Tu acceso expira pronto!!!",
		description: "Tu acceso al biblioteca expira en 2 días.",
		time: "Hace 2 dias",
		read: true,
	},
];

export default function NotificationsPage() {
	return (
		<>
			<Layout>
				<main className="flex-1 overflow-hidden">
					<ScrollArea className="h-full">
						<div className="sm:p-4 space-y-4">
							{notifications.map((notification) => (
								<NotificationCard
									key={notification.id}
									notification={notification}
								/>
							))}
						</div>
					</ScrollArea>
				</main>

				<footer className="p-4 border-t">
					<div className="flex justify-between">
						<Button variant="outline" size="sm">
							<X className="mr-2 h-4 w-4" />
							Clear All
						</Button>
						<Button size="sm">
							<Check className="mr-2 h-4 w-4" />
							Mark All as Read
						</Button>
					</div>
				</footer>
			</Layout>
		</>
	);
}
