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

export const isSpaceActive = (openTime: Date, closeTime: Date): boolean => {
	const currentDate = new Date();

	currentDate.setFullYear(1970, 0, 1);

	const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
	const openTimeInMinutes = openTime.getHours() * 60 + openTime.getMinutes();
	const closeTimeInMinutes = closeTime.getHours() * 60 + closeTime.getMinutes();

	return currentTime >= openTimeInMinutes && currentTime <= closeTimeInMinutes;
};
