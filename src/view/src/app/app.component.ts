import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app',
  template: '<div class="test">Hello</div> <router-outlet></router-outlet>',
  providers: []
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}