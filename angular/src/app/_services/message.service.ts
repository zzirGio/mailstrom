import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '@models'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient) { }

  getById(id: number) {
      return this.http.get<Message>(`/api/message/${id}`);
  }

  getMessagesByUsername(username: string) {
    return this.http.get<Message[]>(`/api/message/by-username/${username}`)
  }

  deleteMessageById(id: number) {
    return this.http.delete(`/api/message/${id}`);
  }
}
