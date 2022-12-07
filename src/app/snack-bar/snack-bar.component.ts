import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  template: '<span class="snack">Submit Successful !!!</span>',
  styles: [`
    .snack {
      display: flex;
      justify-content: center;
      font-size: 1.1rem;
      font-weight: 400;
      line-height: 1.3rem;
      color: hotpink
    }
`]
})
export class SnackBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
