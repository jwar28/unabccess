import { useUserStore } from '@/hooks/useUserStore';

import { getInitials } from '@/lib/utils';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardContent } from '../ui/card';

export const ProfileCard = () => {
	const { user } = useUserStore();

	return (
		<>
			<Card>
				<CardContent className="flex items-center space-x-4 py-4">
					<Avatar className="h-20 w-20">
						<AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile picture" />
						<AvatarFallback>{user ? getInitials(user.name, user.lastName) : 'N/A'}</AvatarFallback>
					</Avatar>
					<div>
						{user ? (
							<>
								<h2 className="text-2xl font-bold">
									{user.name} {user.lastName}
								</h2>
								<p className="text-muted-foreground">ID: {user.studentId}</p>
								<p className="text-muted-foreground">{user.career}</p>
							</>
						) : (
							<p className="text-muted-foreground">No user data available</p>
						)}
					</div>
				</CardContent>
			</Card>
		</>
	);
};
