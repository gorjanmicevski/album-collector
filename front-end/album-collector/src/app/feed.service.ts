import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`http://localhost:8080/api/feed`);
  }

  addPost(post: any) {
    this.http.post(`http://localhost:8080/api/feed`, post).subscribe(() => {
      console.log('post');
    });
  }
  getStickers() {
    return this.http.get<any[]>('http://localhost:8080/api/albums/1');
  }
  uploadFile(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      }),
    };
    console.log(httpOptions);
    this.http
      .post(`http://localhost:8080/api/setProfilePicture/1`, fd, httpOptions)
      .subscribe((res) => {
        console.log(res);
      });
  }
  getPP() {
    return this.http.get(`http://localhost:8080/api/getProfilePicture/1`, {
      responseType: 'blob',
    });
  }
}
