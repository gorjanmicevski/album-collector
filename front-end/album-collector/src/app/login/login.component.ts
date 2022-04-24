import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  username = '';
  password = '';
  ngOnInit(): void {}
  login() {
    console.log(this.username, this.password);
    console.log('login');
    this.authService
      .login(this.username, this.password)
      .subscribe((authResult) => {
        console.log('loged in', authResult);
        this.authService.setSession(authResult);
        this.router.navigateByUrl('/');
      });
  }
}
