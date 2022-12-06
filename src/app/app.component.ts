import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpServices } from './services/http.service';

// interface is one of key feature of Typescript which keep track of any data type of variables.
interface State {
  name: '',
  abbreviation: ''
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // its a good pratice to declare global variables as public and local variables as private.
  // variables should always have a type of their own instead of any types. This is one of key feature of Typescript.
  public hide: boolean = true;
  public profileForm: FormGroup;
  public occupations: string[] = [];
  public stateName:string[] = [];
  public stateAbbreviation: string[] = [];
  public subscription!: Subscription 

  // inject http service into app.component as dependency 
  constructor(private httpService: HttpServices) {
    // *it is not recommend to initilized any variables or form within the constructor in Angular.
    // sometime it is neccessary to do so in this case.
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      occupation: new FormControl(''),
      state: new FormControl('')
    });
  }
  
  ngOnInit(): void {
    // using httpService to send a get request to 'https://frontend-take-home.fetchrewards.com/form' as a Observable
    // subscribing to Observable for data
    // * Observable data cannot be modify after subscription, and can only be read after subscription.
    // * any modification can only be happend within subscription.
    // Think of Observable as a river flow down from top to bottom and we can only subscribe or tap into this observable without modifying it. (this is my own analogy, and im not sure if this is the correct way to describe it)  
    this.subscription = this.httpService.getForm().subscribe(params => {
      this.occupations = params.occupations

      params.states.map((el:State)=> {
        this.stateName.push(el.name)
        this.stateAbbreviation.push(el.abbreviation)
      })
      console.log(params)
    })
  }

  // this method using angular service to send the user submited form to 'https://frontend-take-home.fetchrewards.com/form'
  // after submited form send, the subscription will be destroy.
  public onSubmit() {
    this.subscription  = this.httpService.submitForm(this.profileForm.value).subscribe()
  }

  // In Angular, to prevent this memory leaks we have to unsubscribe from the subscriptions when the component is being destroyed. 
  // To do so by calling the unsubscribe method in the Observable.
  // * it is consider a good pratice to unsubscribe whenever subcription is used.
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
