import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { DomSanitizer } from '@angular/platform-browser';
import {
  NgbModal,
  ModalDismissReasons,
  NgbActiveModal,
} from '@ng-bootstrap/ng-bootstrap';
import { AlbumService } from '../album.service';
@Component({
  selector: 'app-albums-pop-up',
  templateUrl: './albums-pop-up.component.html',
  styleUrls: ['./albums-pop-up.component.css'],
})
export class AlbumsPopUpComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    private service: AlbumService,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal
  ) {}
  albumsList: any[] | undefined;
  rowRange: number[] = [];
  cols = new Array(4);
  closeResult = '';
  ngOnInit(): void {
    this.service.getAlbums().subscribe((data) => {
      console.log('albums', data);
      data.forEach((element) => {
        this.service.getAlbumImage(element.id).subscribe((blob) => {
          let objectURL = URL.createObjectURL(blob);
          element.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
      });
      this.albumsList = data;
      this.rowRange = new Array(this.calculateRows(data));
    });
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
}
