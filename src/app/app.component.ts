import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Subscription } from 'rxjs';
import { State } from './models/state';
import { HttpServices } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // its good pratice to declare global variables as public and local variables as private.
  // variables should always have a type of their own instead of any types. This is one of key feature of Typescript.
  public profileForm: FormGroup;
  public subscription!: Subscription 
  public hide: boolean = true;
  public occupations: string[] = [];
  public stateName: string[] = [];
  public stateAbbreviation: string[] = [];

  // inject http service into app.component as dependency 
  constructor(private httpService: HttpServices) {
    // *it is not recommend to initilizes any variables or form within the constructor in Angular.
    // sometime it is neccessary to do so in this case for FormGroup.
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      occupation: new FormControl(''),
      state: new FormControl('')
    });
  }
  
  ngOnInit(): void {
    // using httpService to get requests from 'https://frontend-take-home.fetchrewards.com/form' as a Observable
    // subscribing to Observable for datas
    // * Observable datas cannot be modify after subscription, and can only be read after subscription.
    // * any modification can only be happend within subscription.
    // Think of Observable as a river flow down from top to bottom and we can only subscribe or tap into this observable without modifying it. (this is my own analogy, and im not sure if this is the correct way to describe it)  
    this.subscription = this.httpService.getForm().subscribe(params => {
      this.occupations = params.occupations

      params.states.map((el:State)=> {
        this.stateName.push(el.name)
        this.stateAbbreviation.push(el.abbreviation)
      })
    })
  }

  // this method using angular service to send user submited form to 'https://frontend-take-home.fetchrewards.com/form'
  // after submited form sended to 'https://frontend-take-home.fetchrewards.com/form', this subscription will be destroy to prevent memory leak or any other problem happen later on.
  // this is another best pratice when using subscription.
  public onSubmit(): void {
    this.subscription  = this.httpService.submitForm(this.profileForm.value).subscribe()
  }

  // this is an Angular method allow subscription to unsubscribe from Observable.
  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
