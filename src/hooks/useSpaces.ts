import { getSpaces } from '@/api/spaces-api';
import { Space } from '@/types/space';
import { useState, useEffect } from 'react';

export const useSpaces = () => {
	const [spaces, setSpaces] = useState<Space[]>([]);

	useEffect(() => {
		const fetchSpaces = async () => {
			const spacesData = await getSpaces();
			setSpaces(spacesData);
		};

		fetchSpaces();
	}, []);

	return spaces;
};
