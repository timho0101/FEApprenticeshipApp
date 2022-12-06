import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpServices } from './services/http.service';

// interface is one of key feature of Typescript which keep track of which data type of any variables
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
    // *it is not recommend to initilized within the constructor in Angular
    // sometime it is neccessary to do so in this case
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
    // * Observable data cannot be modify after subscription, can only read only.
    // * any modification happend within the subscription.
    // Think of Observable datas are as similar to a river flow from top down to bottom.
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
