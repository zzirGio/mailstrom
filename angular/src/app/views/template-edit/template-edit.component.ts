import { Component, OnInit } from "@angular/core";
import { MatModule } from '@app/_modules';
import { Router } from '@angular/router';

@Component({
  selector: "app-template-edit",
  templateUrl: "./template-edit.component.html",
  styleUrls: ["./template-edit.component.scss"]
})
export class TemplateEditComponent implements OnInit {
    isLoading: boolean = true;
    formHeading: string = "Edit Template";

    constructor(
    ) {}
  
    ngOnInit() {
      
    }
}
