import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getInitials = (name: string, lastName: string): string => {
	const inicialNombre = name.charAt(0).toUpperCase();
	const inicialApellido = lastName.charAt(0).toUpperCase();
	return `${inicialNombre}${inicialApellido}`;
};
