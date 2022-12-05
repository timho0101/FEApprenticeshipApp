import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServices {

  private url = 'https://frontend-take-home.fetchrewards.com/form'

  constructor(private http: HttpClient) { }

  public getForm(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  public submitForm(data:any): Observable<any> {
    console.log(data)
    return this.http.post<any>(this.url, data);
  }
}
