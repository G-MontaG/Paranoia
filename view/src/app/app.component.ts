import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

@Component({
  selector: 'app',
  template: '<div class="test">Hello hello</div> <router-outlet></router-outlet>',
  providers: []
})
export class AppComponent implements OnInit {
  private x= 1;
  constructor() {
  }

  ngOnInit() {
  }
}