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

@Injectable({
  providedIn: 'root'
})
export class HttpServices {

  private url = 'https://frontend-take-home.fetchrewards.com/form'

  constructor(private http: HttpClient) { }

  public getForm(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  public submitForm(data:UserSubmitForm): Observable<User> {
    console.log(data)
    return this.http.post<User>(this.url, data);
  }
}
