import { Component, OnInit } from '@angular/core';
import { CollectorService } from '../collector.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private service: CollectorService, private router: Router) {}
  name = '';
  surname = '';
  password = '';
  email = '';
  confirmPassword = '';
  ngOnInit(): void {}
  register() {
    this.service
      .register(this.name, this.surname, this.email, this.password)
      .subscribe((data) => {
        console.log(data);
        this.service.login(this.email, this.password).subscribe((data) => {
          console.log(data);
          this.service.setSession(data);
          this.router.navigateByUrl('/feed');
        });
      });
  }
}
