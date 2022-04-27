import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CollectorService {
  constructor(private http: HttpClient) {}
  register(name: string, surname: string, email: string, password: string) {
    return this.http.post(
      'http://localhost:8080/api/collectors/registerCollector',
      {
        name,
        surname,
        email,
        password,
      }
    );
  }
  login(email: string, password: string) {
    return this.http.post<{ token: string }>(
      'http://localhost:8080/api/collectors/login',
      {
        email,
        password,
      }
    );
  }
  setSession(authResult: any) {
    localStorage.setItem('expires_at', authResult.expiration);
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('collector_id', authResult.id);
  }
  logout() {
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');
    localStorage.removeItem('collector_id');
  }
  public isLoggedIn() {
    var expiresat = localStorage.getItem('expires_at');
    if (expiresat != null) {
      var now = formatDate(new Date(), 'YYYY-MM-ddTHH:mm:ss', 'en');
      var then = formatDate(expiresat, 'YYYY-MM-ddTHH:mm:ss', 'en');
      var dateNow = new Date(now);
      var dateExpires = new Date(then);
      if (dateNow.getTime() < dateExpires.getTime()) return true;
    }
    this.logout();
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getCollector(collectorId: number) {
    return this.http.get(`http://localhost:8080/api/collectors/${collectorId}`);
  }

  getPP(collectorId: number) {
    return this.http.get(
      `http://localhost:8080/api/collectors/${collectorId}/getProfilePicture`,
      {
        responseType: 'blob',
      }
    );
  }
}
