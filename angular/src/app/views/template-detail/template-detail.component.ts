import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { TemplateService, AlertService } from "@app/_services";

import { Template } from "@app/_models";


@Component({
  selector: "app-template",
  templateUrl: "./template-detail.component.html",
  styleUrls: ["./template-detail.component.scss"]
})
export class TemplateDetailComponent implements OnInit {
    isLoading: boolean = true;
    template: Template;
    currentUserId: Number;

    constructor(
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private templateService: TemplateService,
      private alertService: AlertService
    ) {}
  
    ngOnInit() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      this.currentUserId = currentUser.id;

      this.getTemplate();
    }

    getTemplate(){
      const id = +this.activatedRoute.snapshot.paramMap.get('id');
      this.templateService.getTemplateById(id).subscribe(
        data => {
          this.template = data;
          this.isLoading = false;
        },
        error => {
          this.alertService.error("Unable to load template.");
          this.isLoading = false;
        }
      );
    }

    routeTemplateManagement(){
      this.router.navigate(['/template-management']);
    }
    
    send(){
      this.router.navigate(['/create-message']);
    }

    edit(){
      if (this.template.userId == this.currentUserId){
        this.router.navigate(['/edit-template/' + this.template.id]);
      }
    }

    delete(){
      if (this.template.userId == this.currentUserId){
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        this.templateService.deleteTemplate(id).subscribe(
          data => {
            this.router.navigate(['/template-management']);
          },
          error => {
            this.alertService.error("Unable to delete template.");
          } 
        );
      }
    }
}
