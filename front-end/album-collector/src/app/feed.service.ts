import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class FeedService {
  constructor(private http: HttpClient) {}

  getAlbums() {
    return this.http.get<any[]>('http://localhost:8080/api/albums');
  }

  getPrivateAlbums() {
    return this.http.get<any[]>(
      'http://localhost:8080/api/collectors/1/privateAlbums'
    );
  }
  addPrivateAlbum(collectorId: number, albumId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('collectorId', collectorId);
    queryParams = queryParams.append('albumId', albumId);
    return this.http.post(
      `http://localhost:8080/api/privateAlbum/create`,
      {},
      { params: queryParams }
    );
  }
  getAlbumImage(id: number) {
    return this.http.get(`http://localhost:8080/api/album/${id}/image`, {
      responseType: 'blob',
    });
  }
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
    return this.http.post(`http://localhost:8080/api/posts/create`, post);
  }
  getStickers(id: number) {
    console.log(id);
    return this.http.get<any[]>(
      `http://localhost:8080/api/albums/${id}/stickers`
    );
  }
  addCollected() {}
  addDuplicate() {}
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
      .post(
        `http://localhost:8080/api/collectors/1/setProfilePicture`,
        fd,
        httpOptions
      )
      .subscribe((res) => {
        console.log(res);
      });
  }
  getPP() {
    return this.http.get(
      `http://localhost:8080/api/collectors/1/getProfilePicture`,
      {
        responseType: 'blob',
      }
    );
  }
}
