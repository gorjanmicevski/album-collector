import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`http://localhost:8080/api/feed`);
  }
  getStickers() {
    return this.http.get<any[]>('http://localhost:8080/api/albums/1');
  }
  addPost(post: any) {
    this.http.post(`http://localhost:8080/api/feed`, post).subscribe(() => {
      console.log('post');
    });
  }
}
