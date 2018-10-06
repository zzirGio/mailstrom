import { Component, OnInit } from "@angular/core";
import { Template } from "@app/_models";

@Component({
  selector: "app-template-create",
  templateUrl: "./template-create.component.html",
  styleUrls: ["./template-create.component.scss"]
})
export class TemplateCreateComponent implements OnInit {
    isLoading: boolean = true;
    formHeading: string = "Create Template";
    template: Template;

    constructor(
    ) {}
  
    ngOnInit() {
      this.createTemplate();
    }
  
    createTemplate() {
      const userId = JSON.parse(localStorage.getItem("currentUser")).id;
      this.template = new Template(userId);
    }
}
