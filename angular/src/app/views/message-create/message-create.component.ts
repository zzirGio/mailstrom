import { Component, OnInit } from "@angular/core";
import { Message } from "@app/_models";

import { TemplateService } from "@app/_services";

@Component({
  selector: "app-message-create",
  templateUrl: "./message-create.component.html",
  styleUrls: ["./message-create.component.scss"]
})
export class MessageCreateComponent implements OnInit {
  isLoading: boolean = true;
  formHeading: string = "Create new message";
  message: Message;

  constructor(private templateService: TemplateService) {}

  ngOnInit() {
    this.createMessage();
    this.setTemplateContent();
  }

  createMessage() {
    const userId = JSON.parse(localStorage.getItem("currentUser")).id;
    this.message = new Message(userId);
  }

  setTemplateContent() {
    const templateContent = this.templateService.getTemplateToSend();
    this.message.content = templateContent;
  }
}
