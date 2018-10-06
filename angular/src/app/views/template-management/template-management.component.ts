import { Component, OnInit } from "@angular/core";
import { AlertService } from "@app/_services";

@Component({
  selector: "app-template-management",
  templateUrl: "./template-management.component.html",
  styleUrls: ["./template-management.component.scss"]
})
export class TemplateManagementComponent implements OnInit {
    isLoading: boolean = true;
    currentUsername: string;
  
    constructor(
      private alertService: AlertService
    ) {}
  
    ngOnInit() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.currentUsername = currentUser.username;
      this.alertService.error("Template Management Loaded");
    }
}
