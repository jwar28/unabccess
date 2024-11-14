/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getInitials = (name: string, lastName: string): string => {
	const inicialNombre = name.charAt(0).toUpperCase();
	const inicialApellido = lastName.charAt(0).toUpperCase();
	return `${inicialNombre}${inicialApellido}`;
};

export const isSpaceOpen = (openTime: Date, closeTime: Date): boolean => {
	const now = new Date();

	const currentHour = now.getHours();
	const currentMinute = now.getMinutes();

	const openHour = openTime.getHours();
	const openMinute = openTime.getMinutes();
	const closeHour = closeTime.getHours();
	const closeMinute = closeTime.getMinutes();

	const currentTimeInMinutes = currentHour * 60 + currentMinute;
	const openTimeInMinutes = openHour * 60 + openMinute;
	const closeTimeInMinutes = closeHour * 60 + closeMinute;

	return currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes <= closeTimeInMinutes;
};
