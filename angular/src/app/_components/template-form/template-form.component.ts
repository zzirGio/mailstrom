import { Component, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

import { Template } from "@app/_models";
import { TemplateService, AlertService } from "@app/_services";
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.scss"]
})
export class TemplateFormComponent implements OnInit, OnChanges {
  @Input()
  isEditing = false;
  @Input()
  template: Template;
  @Input()
  formHeading: string;
  
  maxTitleLength: number = 50;
  maxContentLength: number = 160;

  // this component acts as the caretaker 
  // the template is the originator of the memento
  templateMemento: TemplateMemento;

  constructor(
    private location: Location,
    private router: Router,
    private templateService: TemplateService,
    private alertService: AlertService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // detect when template is initialised before creating the memento
    if (changes['template']) {
      this.templateMemento = new TemplateMemento(this.template.title, this.template.content);
    }
  }

  cancel() {
    this.location.back();
  }

  save() {
    if (this.template.title && this.template.content){
      if (this.isEditing) {
        this.updateTemplate();
      } else {
        this.createTemplate();
      }
    } else {
      this.snackBar.open("You cannot have a template with an empty title or content!", null, {
        duration: 2000
      });
    }
  }

  createTemplate() {
    this.templateService.addTemplate(this.template).subscribe(
      data => {
        this.alertService.success("Template created", true);
        this.router.navigate(["/template-management"]);
      },
      error => {
        console.log(error);
        this.alertService.error("Unable to create template");
      }
    );
  }

  updateTemplate() {
    this.templateService.updateTemplate(this.template).subscribe(
      data => {
        this.alertService.success("Template updated", true);
        this.router.navigate(["/template-management"]);
      },
      error => {
        this.alertService.error("Unable to update template");
      }
    );
  }

  revert(){
    this.template.title = this.templateMemento.getTitle();
    this.template.content = this.templateMemento.getContent();
  }
}

class TemplateMemento{
  constructor (
    private title: string,
    private content: string
  ) {}

  getTitle(){
    return this.title;
  }

  getContent(){
    return this.content;
  }
}
