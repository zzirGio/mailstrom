import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Greeting {
  id: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  constructor(private http: HttpClient) { }

  greetingUrl = 'api/greeting'

  getGreeting() {
    return this.http.get<Greeting>(this.greetingUrl);
  }
}
