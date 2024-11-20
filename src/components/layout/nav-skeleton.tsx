import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuItem,
	SidebarProvider,
	SidebarSeparator,
} from '../ui/sidebar';
import { Skeleton } from '../ui/skeleton';

export const NavSkeleton = () => {
	return (
		<SidebarProvider>
			{/* Desktop Sidebar */}
			<Sidebar className="hidden w-64 md:flex">
				<SidebarHeader>
					<Skeleton className="h-[67px] w-[240px]" />
				</SidebarHeader>
				<SidebarSeparator />
				<SidebarContent className="mt-3 flex justify-between">
					<SidebarMenu>
						<SidebarMenuItem>
							<Skeleton className="mx-2 h-[32px] w-[240px]" />
						</SidebarMenuItem>
						<SidebarMenuItem>
							<Skeleton className="mx-2 h-[32px] w-[240px]" />
						</SidebarMenuItem>
						<SidebarMenuItem>
							<Skeleton className="mx-2 h-[32px] w-[240px]" />
						</SidebarMenuItem>
						<SidebarMenuItem>
							<Skeleton className="mx-2 h-[32px] w-[240px]" />
						</SidebarMenuItem>
						<SidebarMenuItem>
							<Skeleton className="mx-2 h-[32px] w-[240px]" />
						</SidebarMenuItem>
					</SidebarMenu>
					<SidebarFooter>
						<Skeleton className="h-[50px] w-[240px]" />
					</SidebarFooter>
				</SidebarContent>
			</Sidebar>

			{/* Main Content Area with Header */}
			<SidebarInset className="flex flex-col">
				<header className="flex h-16 items-center justify-between border-b bg-[#232122] px-4 sm:hidden">
					<div className="flex items-center gap-3">
						<Skeleton className="h-[30px] w-[200px] bg-gray-200" />
					</div>
					<Skeleton className="size-10 rounded-full bg-gray-200" />
				</header>

				<main className="flex h-dvh flex-col gap-3 p-4">
					<Skeleton className="h-1/2 w-full" />
					<Skeleton className="h-full w-full" />
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
};
