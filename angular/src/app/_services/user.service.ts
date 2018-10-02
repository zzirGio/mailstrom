import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@models'
 
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getById(id: number) {
      return this.http.get<User>(`/api/user/` + id);
  }

  register(user: User) {
      return this.http.post(`/api/user/register`, user);
  }

  update(user: User) {
      return this.http.put(`/api/user/` + user.id, user);
  }

  update2(data: any, id: number) {
    return this.http.put(`/api/user/` + id, data);
  }

  delete(id: number) {
      return this.http.delete(`/api/user/` + id);
  }

  resetPassword(user: User) {
      return this.http.post(`api/user/resetpassword`, user);
  }
}