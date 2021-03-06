import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlbumsPopUpComponent } from '../albums-pop-up/albums-pop-up.component';

import { mergeMap, Subject, switchMap, tap } from 'rxjs';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums-grid',
  templateUrl: './albums-grid.component.html',
  styleUrls: ['./albums-grid.component.css'],
})
export class AlbumsGridComponent implements OnInit {
  constructor(
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {}
  collectorId = Number.parseInt(localStorage.getItem('collector_id')!);
  albumsList: any[] | undefined;
  rowRange: number[] = [];
  cols = new Array(4);
  closeResult = '';
  $refresh = new Subject<void>();
  ngOnInit(): void {
    this.$refresh
      .pipe(
        tap(() => console.log('void')),

        mergeMap(() => this.service.getPrivateAlbums(this.collectorId))
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

          this.albumsList = [...data, { dummt: 'dummy' }];
          this.rowRange = new Array(this.calculateRows(this.albumsList));
        },
      });
    this.$refresh.next();
  }
  calculateRows(list: String[]): number {
    if (list.length % 4 == 0) return list.length / 4;

    return Math.floor(list.length / 4) + 1;
  }
  colRange(index: number) {
    if (this.albumsList?.length! - 1 <= index) return false;
    return true;
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
          let collectorId = localStorage.getItem('collector_id');
          if (collectorId != null)
            this.service
              .addPrivateAlbum(Number.parseInt(collectorId), result)
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
