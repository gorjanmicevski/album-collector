import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CollectorService } from './collector.service';
@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getPosts(page: number, pageSize: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('pageSize', pageSize);
    return this.http.get<[]>(`http://localhost:8080/api/posts`, {
      params: queryParams,
    });
  }
  getPostsByAlbum(page: number, pageSize: number, albumId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('page', page);
    queryParams = queryParams.append('pageSize', pageSize);
    queryParams = queryParams.append('albumId', albumId);
    return this.http.get<[]>(`http://localhost:8080/api/posts`, {
      params: queryParams,
    });
  }
  addPost(post: any) {
    console.log('add post', post);
    return this.http.post(`http://localhost:8080/api/posts/create`, post);
  }
  uploadFile(file: File) {
    const fd = new FormData();
    fd.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      }),
    };
    this.http
      .post(
        `http://localhost:8080/api/collectors/${localStorage.getItem(
          'collector_id'
        )}/setProfilePicture`,
        fd,
        httpOptions
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
  uploadImage(file: File, category: string) {
    const fd = new FormData();
    fd.append('file', file);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('id_token')}`,
      }),
    };
    switch (category) {
      case 'm':
        this.http
          .post(
            `http://localhost:8080/api/collectors/${localStorage.getItem(
              'collector_id'
            )}/setProfilePicture`,
            fd,
            httpOptions
          )
          .subscribe((res) => {
            console.log(res);
          });
        break;
      case 'd':
        break;
    }
  }
}
