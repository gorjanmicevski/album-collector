import { Component, OnInit } from '@angular/core';
import { CollectorService } from '../collector.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(private service: CollectorService) {}

  ngOnInit(): void {}
  isLoggedIn() {
    return this.service.isLoggedIn();
  }
  logout() {
    return this.service.logout();
  }
}
