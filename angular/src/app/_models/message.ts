export class Message {
    id: number;
    contact: TempContact;
    content: string;
    timeToBeSent: Date;
}

class TempContact {
    name: string;
}
