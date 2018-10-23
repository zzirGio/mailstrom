import { Component, OnInit } from "@angular/core";
import { TemplateService, AlertService } from "@app/_services";
import { Router } from '@angular/router';
import { User, Template } from "@app/_models";

@Component({
  selector: "app-template-management",
  templateUrl: "./template-management.component.html",
  styleUrls: ["./template-management.component.scss"]
})
export class TemplateManagementComponent implements OnInit {
    isLoading: boolean = true;
    publicTemplates: Template[];
    privateTemplates: Template[];
  
    constructor(
      private router: Router,
      private alertService: AlertService,
      private templateService: TemplateService
    ) { }
  
    ngOnInit() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.alertService.success("Template Management Loaded", true);

      this.getPrivateTemplates(currentUser);
      this.getPublicTemplates();
    }

    getPrivateTemplates(currentUser:User){
      this.templateService.getTemplatesList(currentUser.id).subscribe(
        data => {
          this.privateTemplates = data;
        },
        error => {
          this.alertService.error("Unable to load templates.");
        }
      );
    }

    getPublicTemplates(){
      this.templateService.getPublicTemplates().subscribe(
        data => {
          this.publicTemplates = data;
          this.isLoading = false;
        },
        error => {
          this.alertService.error("Unable to load templates.");
          this.isLoading = false;
        }
      );
    }

    routeCreateTemplate(){
      this.router.navigate(['/create-template']);
    }
}
