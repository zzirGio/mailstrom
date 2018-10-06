export class Template {
    id: number;
    userId: number;
    title: string;
    content: string;
    isPublic: boolean;

    constructor(userId) {
		  this.userId = userId;
	  }
}