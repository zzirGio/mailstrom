import { Component, OnInit } from "@angular/core";
import { MatModule } from '@app/_modules';
import { Router } from '@angular/router';

@Component({
  selector: "app-template",
  templateUrl: "./template-detail.component.html",
  styleUrls: ["./template-detail.component.scss"]
})
export class TemplateDetailComponent implements OnInit {
    isLoading: boolean = true;

    constructor(
    ) {}
  
    ngOnInit() {
      
    }
}
