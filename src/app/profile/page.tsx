"use client";

import { logout } from "@/api/auth";
import Layout from "@/components/layout/layout";
import ProfileCard from "@/components/profile/profile-card";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function ProfilePage() {
	return (
		<>
			<Layout>
				<div className="flex flex-col gap-4 pb-16 sm:pb-3">
					<ProfileCard />
					<Button variant="destructive" className="w-full" onClick={logout}>
						<LogOut className="mr-2 h-5 w-5" />
						Cerrar sesión
					</Button>
				</div>
			</Layout>
		</>
	);
}
