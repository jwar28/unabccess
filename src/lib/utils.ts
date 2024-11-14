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

export const isReservationActive = (startDate: any, finishDate: any): boolean => {
	const start = startDate.toDate ? startDate.toDate() : new Date(startDate);
	const finish = finishDate.toDate ? finishDate.toDate() : new Date(finishDate);

	const now = new Date();

	const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

	const startHour = start.getHours();
	const startMinute = start.getMinutes();
	const startTimeInMinutes = startHour * 60 + startMinute;

	const finishHour = finish.getHours();
	const finishMinute = finish.getMinutes();
	const finishTimeInMinutes = finishHour * 60 + finishMinute;

	return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= finishTimeInMinutes;
};
