import { Component, OnInit } from '@angular/core';
import { CollectorService } from '../collector.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  constructor(
    private service: CollectorService,
    public dropdownConfig: NgbDropdownConfig
  ) {}

  ngOnInit(): void {}
  isLoggedIn() {
    return this.service.isLoggedIn();
  }
  logout() {
    return this.service.logout();
  }
}
