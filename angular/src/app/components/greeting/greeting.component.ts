import { Component, OnInit } from '@angular/core';
import { Greeting, GreetingService } from '@services/greeting.service'


@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css']
})
export class GreetingComponent implements OnInit {

  constructor(private greetingService: GreetingService) { }

  ngOnInit() {
    this.showGreeting();
  }

  greeting : Greeting;

  showGreeting() {
    this.greetingService.getGreeting()
    // clone the data object, using its known Config shape
    .subscribe((data: Greeting) => this.greeting = { ...data });
  }

}
