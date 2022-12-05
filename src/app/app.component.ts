import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpServices } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public hide: boolean = true;
  public profileForm: FormGroup;
  public occupations: string[] = [];
  public stateName:string[] = [];
  public stateAbbreviation: string[] = [];

  constructor(private httpService: HttpServices) {
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      occupation: new FormControl(''),
      state: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.httpService.getForm().subscribe(params => {
      this.occupations = params.occupations

      params.states.map((el:any )=> {
        this.stateName.push(el.name)
        this.stateAbbreviation.push(el.abbreviation)
      })
      console.log(params)
    })
  }

  public onSubmit() {
    var submitForm = {
      name: this.profileForm.value.fullname,
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
      occupation: this.profileForm.value.occupation,
      state: this.profileForm.value.state
    }
    this.httpService.submitForm(this.profileForm.value).subscribe()
  }
}
