import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumService } from '../album.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-post-pop-up-form',
  templateUrl: './post-pop-up-form.component.html',
  styleUrls: ['./post-pop-up-form.component.css'],
})
export class PostPopUpFormComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public feedService: FeedService,
    public albumService: AlbumService
  ) {}
  ngOnInit(): void {
    this.albumService
      .getPrivateAlbums(Number.parseInt(this.collectorId!))
      .subscribe((data) => {
        console.log((this.albumsList = data));
        this.albumsList = data;
      });
  }
  collectorId = localStorage.getItem('collector_id');
  albumsList: any[] = [];
  selectedAlbumId = -1;
  selected = 'Select Album';
  post: {
    collectorId: number;
    description: string;
    phone: string;
    location?: string;
    missingStickers: string;
    duplicateStickers: string;
    missingCardsImg?: any;
    duplicateCardsImg?: any;
    albumId: number;
  } = {
    collectorId: Number.parseInt(this.collectorId!),
    description: '',
    phone: '',
    location: '',
    missingStickers: '',
    duplicateStickers: '',
    missingCardsImg: undefined,
    duplicateCardsImg: undefined,
    albumId: 0,
  };
  urlMissing = '';
  urlDuplicates = '';
  imageUrl = '';
  cancel() {
    // this.onCancel;
  }
  select(album: any) {
    this.selected = album.name;
    this.selectedAlbumId = album.id;
    this.post.albumId = album.id;
  }
  onFileSelected(event: any, type: string) {
    console.log(event);
    this.feedService.uploadFile(event.target.files[0]);
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        switch (type) {
          case 'm':
            this.urlMissing = e.target.result;
            break;
          case 'd':
            this.urlDuplicates = e.target.result;
            break;
        }
      };
    }
  }
  submit() {
    console.log('posted', this.post);
    this.feedService.addPost(this.post).subscribe(() => {
      this.activeModal.close('Close click');
    });
  }
  importStickers(type: string) {
    let collectorId = localStorage.getItem('collector_id');
    switch (type) {
      case 'm':
        if (collectorId != null)
          this.albumService
            .getMissing(Number.parseInt(collectorId), this.selectedAlbumId)
            .subscribe((data) => {
              this.urlMissing = '';
              this.post.missingStickers = data;
            });
        break;
      case 'd':
        if (collectorId != null)
          this.albumService
            .getDuplicates(Number.parseInt(collectorId), this.selectedAlbumId)
            .subscribe((data) => {
              this.urlDuplicates = '';
              this.post.duplicateStickers = data;
            });
        break;
    }
  }
}
