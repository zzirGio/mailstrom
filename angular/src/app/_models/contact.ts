export class Contact {
	id: number;
	userId: number;
	name: string;
	phoneNumber: string;
	
	constructor(userId) {
		this.userId = userId;
	}
}