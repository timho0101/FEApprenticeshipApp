import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface User {
  occupations: [],
  states: [] 
}

interface UserSubmitForm {
  name: '',
  email: '',
  password: '',
  occupation: '',
  state: ''
}

// Service is one of key feature of Angular, allow developer to create separate directive dependency which then can be inject into any component within the app.
// providedIn: root allow this service to be inject in any component at root level.
@Injectable({
  providedIn: 'root'
})
export class HttpServices {

  private url = 'https://frontend-take-home.fetchrewards.com/form'

  // HttpClient is one of key feature of Angular framework that support REST operation.
  constructor(private http: HttpClient) { }

  public getForm(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  public submitForm(data:UserSubmitForm): Observable<User> {
    console.log(data)
    return this.http.post<User>(this.url, data);
  }
}
