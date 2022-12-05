import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { HttpServices } from './services/http.service';
interface State {
  name: '',
  abbreviation: ''
}
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

      params.states.map((el:State)=> {
        this.stateName.push(el.name)
        this.stateAbbreviation.push(el.abbreviation)
      })
      console.log(params)
    })
  }

  public onSubmit() {
    this.httpService.submitForm(this.profileForm.value).subscribe()
  }
}
