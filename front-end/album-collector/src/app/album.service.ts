import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  constructor(private http: HttpClient) {}
  getAlbums() {
    return this.http.get<any[]>('http://localhost:8080/api/albums');
  }

  getPrivateAlbums() {
    return this.http.get<any[]>(
      `http://localhost:8080/api/collectors/${localStorage.getItem(
        'collector_id'
      )}/privateAlbums`
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
      .put(`http://localhost:8080/api/privateAlbum/${paId}/collectSticker`, {
        stickerNumbers,
      })
      .subscribe((data) => console.log(data));
  }
  // addDuplicate(paId: number, stickerNumber: number) {
  //   let queryParams = new HttpParams();
  //   queryParams = queryParams.append('stickerNumber', stickerNumber);
  //   return this.http.put(
  //     `api/privateAlbum/${paId}/collectSticker`,
  //     {},
  //     { params: queryParams }
  //   );
  // }
}