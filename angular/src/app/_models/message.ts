import { Contact } from "@models";

export class Message {
    id: number;
    userId: number;
    contact: Contact;
    content: string = "";
    timeToBeSent: Date;
    isSent: boolean;

    constructor(userId) {
        this.userId = userId;
    }
}
