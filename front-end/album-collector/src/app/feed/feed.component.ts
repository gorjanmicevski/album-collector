import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PostPopUpFormComponent } from '../post-pop-up-form/post-pop-up-form.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor(
    private feedService: FeedService,
    private modalService: NgbModal
  ) {}
  closeResult = '';
  allposts = [
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
    {
      username: 'Gorjan',
      dateTime: '40 minutes ago',
      missingCards: 10,
      duplicateCards: 100,
      phone: '070238300',
      place: 'rekord',
    },
  ];
  posts: {
    username: string;
    dateTime: string;
    missingCards: number;
    duplicateCards: number;
    phone: string;
    place: string;
  }[] = [];
  page = 1;

  ngOnInit(): void {
    // this.feedService.getPosts().subscribe((data) => console.log(data));
    // this.feedService.addPost({ test: 'test' });
    this.posts = [...this.posts, ...this.getNewPage(this.page)];
  }
  onScroll() {
    this.page += 1;
    this.posts = [...this.posts, ...this.getNewPage(this.page)];
  }
  getNewPage(page: number) {
    return this.allposts.slice(page * 4, page * 4 + 4);
  }
  open() {
    this.modalService
      .open(PostPopUpFormComponent, {
        size: 'lg',
        centered: true,
        scrollable: true,
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
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
