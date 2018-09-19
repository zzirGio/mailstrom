export class Message {
    id: number;
    userId: number;
    contact: TempContact = new TempContact(this.id, "PLACEHOLDER USER");
    content: string = "";
    timeToBeSent: Date;

    constructor(userId) {
        this.userId = userId;
    }
}

class TempContact {
    id: number = 1;
    phoneNumber: string = "1234";
    userId: number;
    name: string;

    constructor(userId: number, name: string) {
        this.userId = userId;
        this.name = name;
    }
}
