import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app',
  template: `<menu></menu>
            <router-outlet></router-outlet>`,
  providers: []
})
export class AppComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }
}