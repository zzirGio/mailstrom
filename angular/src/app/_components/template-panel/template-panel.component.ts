import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";

import { Template } from "@app/_models";

@Component({
  selector: "app-template-panel",
  templateUrl: "./template-panel.component.html",
  styleUrls: ["./template-panel.component.scss"]
})
export class TemplatePanelComponent implements OnInit {
  @Input()
  template: Template;
  
  constructor(
    private router: Router
  ) {}

  ngOnInit(){

  }

  routeTemplate(){
    this.router.navigate(['/template/' + this.template.id]);
  }
}
