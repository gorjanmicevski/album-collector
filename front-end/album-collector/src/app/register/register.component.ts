import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private authService: AuthService) {}
  name = '';
  surname = '';
  password = '';
  email = '';
  confirmPassword = '';
  ngOnInit(): void {}
  register() {}
}
