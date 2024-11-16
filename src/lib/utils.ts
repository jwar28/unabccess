import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Generates the initials from a first name and last name.
 *
 * @param {string} name - The first name of the person.
 * @param {string} lastName - The last name of the person.
 * @returns {string} The initials of the person, in uppercase format (e.g., "JD").
 */
export const getInitials = (name: string, lastName: string): string => {
	const inicialNombre = name.charAt(0).toUpperCase();
	const inicialApellido = lastName.charAt(0).toUpperCase();
	return `${inicialNombre}${inicialApellido}`;
};

/**
 * Determines whether the space is currently active based on the provided opening and closing times.
 *
 * @param {Date} openTime - The opening time of the space.
 * @param {Date} closeTime - The closing time of the space.
 * @returns {boolean} Returns `true` if the current time is within the space's open hours, otherwise `false`.
 */
export const isSpaceActive = (openTime: Date, closeTime: Date): boolean => {
	const currentDate = new Date();

	// Set the year, month, and day to a constant value to only compare the time portion.
	currentDate.setFullYear(1970, 0, 1);

	const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();
	const openTimeInMinutes = openTime.getHours() * 60 + openTime.getMinutes();
	const closeTimeInMinutes = closeTime.getHours() * 60 + closeTime.getMinutes();

	return currentTime >= openTimeInMinutes && currentTime <= closeTimeInMinutes;
};
