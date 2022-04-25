import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  isLoggedIn() {
    // console.log(localStorage.getItem('id_token'));
    if (localStorage.getItem('id_token') != undefined) return true;
    return false;
  }
}
