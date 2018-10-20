import { Component, OnInit } from "@angular/core";
import { AlertService } from "@app/_services";
import { Router } from '@angular/router';

@Component({
  selector: "app-template-management",
  templateUrl: "./template-management.component.html",
  styleUrls: ["./template-management.component.scss"]
})
export class TemplateManagementComponent implements OnInit {
    isLoading: boolean = true;
    currentUsername: string;
  
    constructor(
      private router: Router,
      private alertService: AlertService
    ) {}
  
    ngOnInit() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.currentUsername = currentUser.username;
      this.alertService.error("Template Management Loaded");
    }

    routeNewTemplate(){
      this.router.navigate(['/create-template']);
    }
}
