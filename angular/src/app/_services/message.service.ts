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

  getMessagesById(userId: number) {
    return this.http.get<Message[]>(`/api/message/by-user/${userId}`)
  }

  getMessagesByUsername(username: string) {
    return this.http.get<Message[]>(`/api/message/by-username/${username}`)
  }

  addMessage(message: Message) {
    return this.http.post(`/api/message/create`, message);
  }

  deleteMessageById(id: number) {
    return this.http.delete(`/api/message/${id}`);
  }

  updateMessage(message: Message) {
    return this.http.put(`/api/message/${message.id}`, message);
  }
}
