import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

import { Template } from "@app/_models";
import { TemplateService, AlertService } from "@app/_services";

@Component({
  selector: "app-template-edit",
  templateUrl: "./template-edit.component.html",
  styleUrls: ["./template-edit.component.scss"]
})
export class TemplateEditComponent implements OnInit {
    isLoading: boolean = true;
    formHeading: string = "Edit Template";
    template: Template;

    constructor(
      private activatedRoute: ActivatedRoute,
      private alertService: AlertService,
      private templateService: TemplateService
    ) {}
  
    ngOnInit() {
      this.getTemplate();
    }
  
    getTemplate() {
      const id = +this.activatedRoute.snapshot.paramMap.get("id");
      this.templateService.getTemplateById(id).subscribe(
        template => {
          this.template = template;
          this.isLoading = false;
        },
        error => {
          this.alertService.error("Unable to load message.");
          this.isLoading = false;
        }
      );
    }
}
