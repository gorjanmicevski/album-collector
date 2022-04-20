import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
    public feedService: FeedService
  ) {}
  // @Input() onCancel: void | undefined;
  ngOnInit(): void {}
  post: {
    collectorId: number;
    description: string;
    phone: string;
    place?: string;
    missingCards: string;
    duplicateCards: string;
    missingCardsImg?: any;
    duplicateCardsImg?: any;
  } = {
    collectorId: 1,
    description: '',
    phone: '',
    place: '',
    missingCards: '',
    duplicateCards: '',
    missingCardsImg: undefined,
    duplicateCardsImg: undefined,
  };
  urlMissing = '';
  urlDuplicates = '';
  imageUrl = '';
  cancel() {
    // this.onCancel;
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
    console.log(this.post.description);
    this.activeModal.close('Close click');
  }
  importStickers(type: string) {
    console.log('asdsad');

    switch (type) {
      case 'm':
        this.urlMissing = '';
        this.post.missingCards = '1,2,3,4,5,6';
        break;
      case 'd':
        this.urlDuplicates = '';
        this.post.duplicateCards = '1,2,3,4,5,6';
        break;
    }
  }
}
