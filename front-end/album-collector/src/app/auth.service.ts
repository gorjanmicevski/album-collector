import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(emal: string, password: string) {
    return this.http.post<{ token: string }>('api/auth/login', {
      emal,
      password,
    });
  }
  setSession(authResult: { token: string }) {
    // const expiresAt= moment().add()
    localStorage.setItem('id_token', authResult.token);
  }
  logout() {
    localStorage.removeItem('id_token');
  }
  // public isLoggedIn() {
  //     return moment().isBefore(this.getExpiration());
  // }

  // isLoggedOut() {
  //     return !this.isLoggedIn();
  // }

  // getExpiration() {
  //     const expiration = localStorage.getItem("expires_at");
  //     const expiresAt = JSON.parse(expiration);
  //     return moment(expiresAt);
  // }
}