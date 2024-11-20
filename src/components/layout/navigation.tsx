'use client';

import { fetchUserData } from '@/api/user-api';
import { useUserStore } from '@/hooks/useUserStore';
import { Bell, Home, Key, Settings, User as UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarSeparator,
} from '@/components/ui/sidebar';

import { cn, getInitials } from '@/lib/utils';

import { NavSkeleton } from './nav-skeleton';
import { NavUser } from './nav-user';

interface NavigationProps {
	children: React.ReactNode;
	uid: string;
}

export const Navigation = ({ children, uid }: NavigationProps) => {
	const [currentPath, setCurrentPath] = useState('');
	const { user, setUser } = useUserStore();
	const router = useRouter();

	useEffect(() => {
		const loadUserData = async () => {
			const fetchedUser = await fetchUserData(uid);
			if (fetchedUser) {
				setUser(fetchedUser);
			}
		};

		loadUserData();
		setCurrentPath(window.location.pathname);
	}, [setUser, uid]);

	if (!user) {
		return <NavSkeleton />;
	}

	const menuItems = [
		{
			icon: Home,
			href: '/',
			label: 'Home',
		},
		{
			icon: Key,
			href: '/access',
			label: 'Acceso',
		},
		{
			icon: UserIcon,
			href: '/profile',
			label: 'Perfil',
		},
		{
			icon: Settings,
			href: '/settings',
			label: 'Ajustes',
		},
	];

	const desktopMenuItems = [...menuItems, { icon: Bell, href: '/notifications', label: 'Notificaciones' }];

	return (
		<SidebarProvider>
			{/* Desktop Sidebar */}
			<Sidebar className="hidden w-64 md:flex">
				<SidebarHeader>
					<Link className="flex items-center" href="/">
						<Image src="/logo.png" alt="logo" width={60} height={20} />
						<span className="text px-4 text-2xl font-bold">UNABccess</span>
					</Link>
				</SidebarHeader>
				<SidebarSeparator />
				<SidebarContent className="mt-3 flex justify-between">
					<SidebarMenu>
						{desktopMenuItems.map((item) => (
							<SidebarMenuItem key={item.href} className="w-60">
								<SidebarMenuButton asChild>
									<Link
										href={item.href}
										className={cn(
											'mx-2 flex items-center gap-2 transition-colors',
											currentPath === item.href ? 'bg-[#232122] text-white hover:bg-[#232122]' : 'hover:bg-gray-100',
										)}
									>
										<item.icon className={cn('h-5 w-5', currentPath === item.href && 'text-white')} />
										<span className={cn('', currentPath === item.href && 'text-white')}>{item.label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
					<SidebarFooter>
						<NavUser user={user} />
					</SidebarFooter>
				</SidebarContent>
			</Sidebar>

			{/* Main Content Area with Header */}
			<SidebarInset className="flex flex-col">
				<header className="flex h-16 items-center justify-between border-b bg-[#232122] px-4 sm:hidden">
					<div className="flex items-center gap-3">
						<Avatar>
							<AvatarImage src="/placeholder.svg" alt="User avatar" />
							<AvatarFallback>{getInitials(user.name, user.lastName)}</AvatarFallback>
						</Avatar>
						<span className="text-sm font-medium text-white">
							{user.name} {user.lastName}
						</span>
					</div>
					<button className="rounded-full p-2 hover:bg-gray-800" onClick={() => router.push('/notifications')}>
						<Bell className="h-5 w-5 text-white" />
						<span className="sr-only">Notifications</span>
					</button>
				</header>

				<main className="flex-1 p-4">{children}</main>

				{/* Mobile Bottom Navigation */}
				<nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t bg-[#232122] lg:hidden">
					{menuItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`flex h-full w-full flex-col items-center justify-center gap-[2px] transition-colors ${
								currentPath === item.href ? 'text-white hover:text-white' : 'text-gray-400 hover:text-foreground'
							}`}
						>
							<item.icon className="h-5 w-5" />
							<span className="text-[12px]">{item.label}</span>
						</Link>
					))}
				</nav>
			</SidebarInset>
		</SidebarProvider>
	);
};
