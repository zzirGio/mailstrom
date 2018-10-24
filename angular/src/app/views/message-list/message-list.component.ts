import { Component, OnInit } from "@angular/core";

import { Message } from "@models";
import { AlertService, MessageService } from "@app/_services";

@Component({
  selector: "app-message-list",
  templateUrl: "./message-list.component.html",
  styleUrls: ["./message-list.component.scss"]
})
export class MessageListComponent implements OnInit {
  private _searchTerm: string;
  isLoading: boolean = true;
  messages: Message[];
  filteredMessages: Message[];
  currentUsername: string;

  constructor(
    private messageService: MessageService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    this.currentUsername = currentUser.username;
    this.getMessages();
  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(term: string) {
    this._searchTerm = term;
    this.filteredMessages = this._filterMessages(term);
  }

  _messageContainsSearchTerm(message: Message, searchTerm: string): boolean {
    const termInContact: boolean =
      message.contact.name.search(new RegExp(searchTerm, "i")) !== -1;
    const termInContent: boolean = 
      message.content.search(new RegExp(searchTerm, "i")) !== -1;
    return termInContact || termInContent;
  }

  _filterMessages(searchString: string): Message[] {
    return this.messages.filter(message =>
      this._messageContainsSearchTerm(message, searchString)
    );
  }

  _sortMessagesByTimeSent(messages: Message[]): Message[] {
    return messages
      .filter(d => !d.isSent)
      .sort(
        (a, b) =>
          new Date(a.timeToBeSent).getTime() -
          new Date(b.timeToBeSent).getTime()
      );
  }

  getMessages() {
    this.messageService.getMessagesByUsername(this.currentUsername).subscribe(
      data => {
        this.messages = this._sortMessagesByTimeSent(data);
        this.filteredMessages = this.messages;
        this.isLoading = false;
      },
      error => {
        this.alertService.error("Unable to load messages.");
        this.isLoading = false;
      }
    );
  }
}
