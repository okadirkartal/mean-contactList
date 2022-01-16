import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  template: `<div class="login-container">
  <form class="ui big form" #loginForm="ngForm" (submit)="onSubmit(loginForm)">
  <div class="field">
    <label>Username</label>
    <input type="text" name="username" placeholder="Username" ngModel>
  </div>
  <div class="field">
    <label>Password</label>
    <input type="password" name="password" placeholder="Password" ngModel>
  </div>
  <button type="submit" class="ui primary button float right floated">Login</button>
  </form>
</div>
`,
  styles: [`.login-container {
    max-width: 500px; margin: 50px auto;
 }
 `]
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
     if(this.auth.isLoggedIn()) {
       this.router.navigate(['/contacts']);
     }
  }

  onSubmit(form: NgForm) {
    const values = form.value;

    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
      .subscribe(data => {
        this.auth.setToken(data.token);
        this.router.navigate(['/contacts']);
      });
  }

}
