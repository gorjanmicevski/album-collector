import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlbumService } from '../album.service';
import { CollectorService } from '../collector.service';
import { FeedService } from '../feed.service';
import { DomSanitizer } from '@angular/platform-browser';

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
    public albumService: AlbumService,
    public collectorService: CollectorService,
    private sanitizer: DomSanitizer
  ) {}
  ngOnInit(): void {
    this.albumService.getPrivateAlbums(this.collectorId).subscribe((data) => {
      console.log((this.albumsList = data));
      this.albumsList = data;
    });
    this.collectorService.getPP(this.collectorId).subscribe((data) => {
      console.log('collecotr', data);
      if (data.size > 0) {
        let objectURL = URL.createObjectURL(data);
        this.collectorPP = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      } else {
        this.collectorPP = '../../assets/userProfile.jpg';
      }
    });
  }
  collectorId = Number.parseInt(localStorage.getItem('collector_id')!);
  collectorPP: any;
  collectorName = localStorage.getItem('collector_name');
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
    collectorId: this.collectorId,
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
    if (event.target.files) {
      switch (type) {
        case 'm':
          this.post.missingCardsImg = event.target.files[0];
          break;
        case 'd':
          this.post.duplicateCardsImg = event.target.files[0];
          break;
      }
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        switch (type) {
          case 'm':
            this.urlMissing = e.target.result;

            break;
          case 'd':
            this.urlDuplicates = e.target.result;
            this.post.duplicateCardsImg = e.target.result;
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
    switch (type) {
      case 'm':
        this.albumService
          .getMissing(this.collectorId, this.selectedAlbumId)
          .subscribe((data) => {
            this.urlMissing = '';
            this.post.missingStickers = data;
          });
        break;
      case 'd':
        this.albumService
          .getDuplicates(this.collectorId, this.selectedAlbumId)
          .subscribe((data) => {
            this.urlDuplicates = '';
            this.post.duplicateStickers = data;
          });
        break;
    }
  }
}
