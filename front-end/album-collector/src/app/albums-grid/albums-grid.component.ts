import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlbumsPopUpComponent } from '../albums-pop-up/albums-pop-up.component';

import { mergeMap, Subject, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-albums-grid',
  templateUrl: './albums-grid.component.html',
  styleUrls: ['./albums-grid.component.css'],
})
export class AlbumsGridComponent implements OnInit {
  constructor(
    private service: FeedService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {}
  albumsList: any[] | undefined;
  rowRange: number[] = [];
  cols = new Array(4);
  closeResult = '';
  $refresh = new Subject<void>();
  ngOnInit(): void {

    this.$refresh
      .pipe(
        tap(() => console.log('void')),
        mergeMap(() => this.service.getPrivateAlbums())
      )
      .subscribe({
        next: (data) => {
          console.log('priv albums', data);
          data.forEach((element) => {
            this.service.getAlbumImage(element.album.id).subscribe((blob) => {
              let objectURL = URL.createObjectURL(blob);
              element.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            });
          });

          this.albumsList = data;
          this.rowRange = new Array(this.calculateRows(data));
        },
      });
    this.$refresh.next();

  }
  calculateRows(list: String[]): number {
    if (list.length % 4 == 0) return list.length / 4;

    return Math.floor(list.length / 4) + 1;
  }
  colRange(index: number) {
    if (this.albumsList?.length! <= index) return false;
    return true;
  }
  createRange(number: number) {
    return new Array(number);
  }

  open() {
    this.modalService
      .open(AlbumsPopUpComponent, {
        size: 'xl',
        centered: true,
        scrollable: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;

          this.service
            .addPrivateAlbum(1, result)
            .subscribe(() => this.$refresh.next());

        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    console.log(this.closeResult);
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
