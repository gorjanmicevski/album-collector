import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { mergeMap, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}
  getAlbums() {
    return this.http.get<any[]>('http://localhost:8080/api/albums');
  }

  getPrivateAlbums(collectorId: number) {
    return this.http.get<any[]>(
      `http://localhost:8080/api/collectors/${collectorId}/privateAlbums`
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

  getAlbumImage(albumId: number) {
    return this.http.get(`http://localhost:8080/api/albums/${albumId}/image`, {
      responseType: 'blob',
    });
  }
  getStickers(paId: number) {
    console.log(paId);
    return this.http.get<any>(
      `http://localhost:8080/api/privateAlbum/${paId}/stickers`
    );
  }
  addCollected(paId: number, stickerNumbers: number[]) {
    return this.http
      .put(`http://localhost:8080/api/privateAlbum/${paId}/collectStickers`, {
        stickerNumbers,
      })
      .subscribe((data) => console.log(data));
  }
  addDuplicate(paId: number, stickerNumbers: number[]) {
    return this.http
      .put(`http://localhost:8080/api/privateAlbum/${paId}/duplicateStickers`, {
        stickerNumbers,
      })
      .subscribe((data) => console.log(data));
  }
  addMissing(paId: number, stickerNumbers: number[]) {
    return this.http
      .put(`http://localhost:8080/api/privateAlbum/${paId}/missingStickers`, {
        stickerNumbers,
      })
      .subscribe((data) => console.log(data));
  }
  getMissing(collectorId: number, albumId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('collectorId', collectorId);
    queryParams = queryParams.append('albumId', albumId);
    return this.http.get(
      'http://localhost:8080/api/privateAlbum/missingStickers',
      { params: queryParams, responseType: 'text' }
    );
  }
  getDuplicates(collectorId: number, albumId: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('collectorId', collectorId);
    queryParams = queryParams.append('albumId', albumId);
    return this.http.get(
      'http://localhost:8080/api/privateAlbum/duplicateStickers',
      { params: queryParams, responseType: 'text' }
    );
  }
}
