import { Component, Input, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.scss"]
})
export class TemplateFormComponent implements OnInit {
  @Input()
  isEditing = false;
  @Input()
  formHeading: string;
  maxContentLength: number = 160;

  constructor(
    private location: Location,
    private router: Router
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser")).id;
    
  }

  cancel() {
    this.location.back();
  }

  save() {

  }
}
