import { Component } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public hide = true;
  public profileForm: FormGroup;

  constructor() {
    this.profileForm = new FormGroup({
      fullname: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      occupation: new FormControl(''),
      state: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    console.log(this.profileForm.value)
  }
}
