import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-menu',
  template: `<div class="ui menu header">
  <div class="ui container">
    <div class="item">
      <a [routerLink]="['/contacts']" aria-label="Contacts">
        <i class="icon users large blue" aria-hidden="true"></i>
      </a>
    </div>
    <div class="header item">
      <h1>Contact Manager</h1>
    </div>
  </div>

  <div class="item" *ngIf="auth.isLoggedIn()">
    <button [routerLink]="['/new']" class="ui basic button" >
      <i class="add user icon" aria-hidden="true"></i>
      Add Contact
    </button>
  </div>
  <div class="right menu" *ngIf="!auth.isLoggedIn()">
    <button class="ui primary button logout" (click)="logout()">Logout</button>
  </div>
</div>
`,
  styles: [`.button.logout {
    margin: 10px 20px;
 }
 `]
})
export class MenuComponent implements OnInit {

  constructor(private auth : AuthService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
  }

}
