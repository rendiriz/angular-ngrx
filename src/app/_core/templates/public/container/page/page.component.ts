import { Component } from '@angular/core';

@Component({
  selector: 'app-public-page',
  template: `
    <app-public-navbar></app-public-navbar>
    <router-outlet></router-outlet>
  `
})
export class PageComponent {}
