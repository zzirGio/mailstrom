import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Template } from '@app/_models';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  constructor(private http: HttpClient) { }
  
  getTemplateById(id: number) {
  	return this.http.get<Template>(`/api/template/${id}`);
  }
  
  getTemplatesList(userId: number) {
  	return this.http.get<Template[]>(`/api/template/private-list/${userId}`);
  }

  getPublicTemplates() {
    return this.http.get<Template[]>(`/api/template/public-list/`);
  }
  
  addTemplate(template: Template) {
  	return this.http.post(`/api/template/create`, template);
  }
  
  updateTemplate(template: Template) {
  	return this.http.put(`/api/template/${template.id}`, template);
  }
  
  deleteTemplate(id: number) {
  	return this.http.delete(`/api/template/${id}`);
  }
}
