"use client";

import { Bell, Home, Key, Settings, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
} from "@/components/ui/sidebar";
import { NavUser } from "./nav-user";
import Image from "next/image";

interface NavigationProps {
  children: React.ReactNode;
}

export default function Navigation({ children }: NavigationProps) {
  const menuItems = [
    {
      icon: Home,
      href: "/",
      label: "Home",
    },
    {
      icon: Key,
      href: "/access",
      label: "Acceso",
    },
    {
      icon: User,
      href: "/profile",
      label: "Perfil",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Ajustes",
    },
  ];

  const desktopMenuItems = [
    ...menuItems,
    { icon: Bell, href: "/notifications", label: "Notificaciones" },
  ];

  const user = {
    name: "test",
    email: "test",
    avatar: "d",
  };

  return (
    <SidebarProvider>
      {/* Desktop Sidebar */}
      <Sidebar className="hidden lg:flex">
        <SidebarHeader>
          <div className="flex items-center">
            <Image src="/logo.png" alt="logo" width={60} height={20} />
            <span className="px-4 text-2xl font-bold text">UNABccess</span>
          </div>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent className="mt-3 flex justify-between">
          <SidebarMenu>
            {desktopMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 px-3"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
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
        <header className="flex h-16 items-center justify-between border-b bg-black px-4 sm:hidden">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="User avatar" />
              <AvatarFallback>JG</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-white">
              Javier Guerra
            </span>
          </div>
          <button className="rounded-full p-2 hover:bg-gray-800">
            <Bell className="h-5 w-5 text-white" />
            <span className="sr-only">Notifications</span>
          </button>
        </header>

        <main className="flex-1 p-4">{children}</main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t bg-[#232122] lg:hidden">
          {menuItems.map((item) => (
            <div key={item.href} className="p-1 w-full">
              <Link
                key={item.href}
                href={item.href}
                className="flex h-full w-full flex-col items-center justify-center gap-[2px] text-muted-foreground transition-colors hover:text-foreground"
              >
                <item.icon className="size-[22px] text-white" />
                <span className="text-[12px] text-white">{item.label}</span>
              </Link>
            </div>
          ))}
        </nav>
      </SidebarInset>
    </SidebarProvider>
  );
}
