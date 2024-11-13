import { useUserStore } from "@/hooks/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { getInitials } from "@/lib/utils";

export const ProfileCard = () => {
	const { user } = useUserStore();

	return (
		<>
			<Card>
				<CardContent className="flex items-center space-x-4 py-4">
					<Avatar className="h-20 w-20">
						<AvatarImage
							src="/placeholder.svg?height=80&width=80"
							alt="Profile picture"
						/>
						<AvatarFallback>
							{getInitials(user.name, user.lastName)}
						</AvatarFallback>
					</Avatar>
					<div>
						<h2 className="text-2xl font-bold">
							{user.name} {user.lastName}
						</h2>
						<p className="text-muted-foreground">ID: {user.studentId}</p>
						<p className="text-muted-foreground">{user.career}</p>
					</div>
				</CardContent>
			</Card>
		</>
	);
}
