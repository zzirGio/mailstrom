import { Component, OnInit } from "@angular/core";
import { AlertService } from "@app/_services";
import { Router } from '@angular/router';

@Component({
  selector: "app-template-create",
  templateUrl: "./template-create.component.html",
  styleUrls: ["./template-create.component.scss"]
})
export class TemplateCreateComponent implements OnInit {
    isLoading: boolean = true;
    formHeading: string = "Create new template";

    constructor(
    ) {}
  
    ngOnInit() {
      
    }
}
