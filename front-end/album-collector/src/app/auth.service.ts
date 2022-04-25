import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  register(name: string, surname: string, email: string, password: string) {
    return this.http.post('http://localhost:8080/api/auth/registerCollector', {
      name,
      surname,
      email,
      password,
    });
  }
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      'http://localhost:8080/api/auth/login',
      {
        email,
        password,
      }
    );
  }
  setSession(authResult: any) {
    localStorage.setItem('expires_at', authResult.expiration);
    localStorage.setItem('id_token', authResult.token);
  }
  logout() {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
  }
  public isLoggedIn() {
    var expiresat = localStorage.getItem('expires_at');
    if (expiresat != null) {
      var now = formatDate(new Date(), 'YYYY-MM-ddTHH:mm:ss', 'en');
      var then = formatDate(expiresat, 'YYYY-MM-ddTHH:mm:ss', 'en');
      var dateNow = new Date(now);
      var dateExpires = new Date(then);
      console.log('is logged in', dateNow.getTime() < dateExpires.getTime());
      return dateNow.getTime() < dateExpires.getTime();
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }
}
