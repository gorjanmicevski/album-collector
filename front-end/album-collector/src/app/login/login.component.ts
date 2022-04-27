import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private service: CollectorService, private router: Router) {}
  username = '';
  password = '';
  ngOnInit(): void {}
  login() {
    console.log(this.username, this.password);
    console.log('login');
    this.service.login(this.username, this.password).subscribe((authResult) => {
      console.log('loged in', authResult);
      this.service.setSession(authResult);
      this.router.navigateByUrl('/profile');
    });
  }
}
