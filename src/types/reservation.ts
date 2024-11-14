import { Space } from './space';
import { User } from './user';

export interface Reservation {
	id: string;
	reservedBy: User;
	reservationLocation: Space;
	startDate: Date;
	finishDate: Date;
	requestReason: string;
}
