import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Contact } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }
  
  getContactById(id: number) {
  	return this.http.get<Contact>(`/api/contact/${id}`);
  }
  
  getContactsList(userId: number) {
  	return this.http.get<Contact[]>(`/api/contact/list/${userId}`);
  }
  
  addContact(contact: Contact) {
  	return this.http.post(`/api/contact/create`, contact);
  }
  
  updateContact(contact: Contact) {
  	return this.http.put(`/api/contact/${contact.id}`, contact);
  }
  
  deleteContact(id: number) {
  	return this.http.delete(`/api/contact/${id}`);
  }
}
