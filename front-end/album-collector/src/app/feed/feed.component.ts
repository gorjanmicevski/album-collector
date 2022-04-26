import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PostPopUpFormComponent } from '../post-pop-up-form/post-pop-up-form.component';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor(
    private albumService: AlbumService,
    private feedService: FeedService,
    private modalService: NgbModal,
    private router: Router
  ) {}
  closeResult = '';
  posts: any[] = [];
  page = -1;
  selected = 'Filter Albums';
  selectedAlbumId: number | undefined = undefined;
  albumsList: any[] | undefined;
  ngOnInit(): void {
    this.getNewPage();
    this.albumService.getPrivateAlbums().subscribe((data) => {
      console.log((this.albumsList = data));
      this.albumsList = data;
    });
  }
  onScroll() {
    this.getNewPage();
  }
  filterAlbums(albumId: number) {
    console.log(albumId);
    this.selectedAlbumId = albumId;
    this.page = -1;
    this.posts = [];
    this.getNewPage();
  }
  getNewPage() {
    this.page += 1;
    if (this.selectedAlbumId == undefined)
      this.feedService.getPosts(this.page, 4).subscribe((data) => {
        this.posts = [...this.posts, ...data];
      });
    else
      this.feedService
        .getPostsByAlbum(this.page, 4, this.selectedAlbumId)
        .subscribe((data) => {
          this.posts = [...this.posts, ...data];
        });
  }
  getTime(dateTime: string) {
    var now = formatDate(new Date(), 'YYYY-MM-ddTHH:mm:ss', 'en');
    var then = formatDate(dateTime, 'YYYY-MM-ddTHH:mm:ss', 'en');
    var datenow = new Date(now);
    var datethen = new Date(then);
    var Time = datenow.getTime() - datethen.getTime();
    var Days = Math.floor(Time / (1000 * 3600 * 24));
    var Hours = Math.floor(Time / (1000 * 3600));
    var Minutes = Math.floor(Time / (1000 * 60));
    var Seconds = Math.floor(Time / 1000);
    if (Days > 1) return `${Days} days ago`;
    else if (Days == 1) return `${Days} day ago`;
    else {
      if (Hours > 1) return `${Hours} hour ago`;
      else if (Hours == 1) return `${Hours} hour ago`;
      else {
        if (Minutes > 1) return `${Minutes} minutes ago`;
        else return 'just now';
      }
    }
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

          this.router
            .navigateByUrl('/RefreshComponent', { skipLocationChange: true })
            .then(() => {
              this.router.navigate(['/feed']);
            });
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
