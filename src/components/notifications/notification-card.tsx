import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

interface Notification {
	id: number;
	title: string;
	description: string;
	time: string;
	read: boolean;
}

export const NotificationCard = ({
	notification,
}: {
	notification: Notification;
}) => {
	return (
		<>
			<Card
				key={notification.id}
				className={notification.read ? "opacity-60" : ""}
			>
				<CardHeader className="flex flex-row items-center gap-4 pb-2">
					<Avatar className="h-9 w-9">
						<AvatarImage
							src="/placeholder.svg?height=36&width=36"
							alt="Notification icon"
						/>
						<AvatarFallback>
							<Bell className="h-4 w-4" />
						</AvatarFallback>
					</Avatar>
					<div className="flex-1 space-y-1">
						<CardTitle className="text-base">{notification.title}</CardTitle>
						<CardDescription className="text-sm">
							{notification.time}
						</CardDescription>
					</div>
					{!notification.read && (
						<div className="h-2 w-2 rounded-full bg-blue-600" />
					)}
				</CardHeader>
				<CardContent>
					<p className="text-sm">{notification.description}</p>
				</CardContent>
			</Card>
		</>
	);
}
