import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserSubmitForm } from '../models/user_submit_form';

// Service is one of key feature of Angular, allow developer to create separate directive dependency which then can be inject into any component within the app.
// providedIn: root allow this service to be inject in any components at root level.
@Injectable({
  providedIn: 'root'
})
export class HttpServices {
  private url = 'https://frontend-take-home.fetchrewards.com/form'

  // HttpClient is one of key feature of Angular framework which support REST operation.
  constructor(private http: HttpClient) { }

  public getForm(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  public submitForm(data:UserSubmitForm): Observable<User> {
    return this.http.post<User>(this.url, data);
  }
}
