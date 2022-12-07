import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-snack-bar',
  template: '<span class="snack">Submit success!!!</span>',
  styles: [`
    .snack {
      color: hotpink;
    }
`]
})
export class SnackBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
