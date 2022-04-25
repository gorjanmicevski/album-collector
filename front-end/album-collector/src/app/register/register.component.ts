import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}
  name = '';
  surname = '';
  password = '';
  email = '';
  confirmPassword = '';
  ngOnInit(): void {}
  register() {
    this.authService
      .register(this.name, this.surname, this.email, this.password)
      .subscribe((data) => {
        console.log(data);
        this.authService.login(this.email, this.password).subscribe((data) => {
          console.log(data);
          this.router.navigateByUrl('/feed');
        });
      });
  }
}
