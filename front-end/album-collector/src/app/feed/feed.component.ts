import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor(private feedService: FeedService) {}
  popup = false;
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
    //this.posts = [...this.posts, ...this.getNewPage(this.page)];
  }
  addPost() {
    console.log('post');
    this.popup = true;
  }
  cancelForm() {
    this.popup = false;
  }
  onScroll() {
    this.page += 1;
    this.posts = [...this.posts, ...this.getNewPage(this.page)];
  }
  getNewPage(page: number) {
    return this.allposts.slice(page * 2, page * 2 + 2);
  }
  onFileSelected(event: any) {
    console.log(event);
    this.onUpload(event?.target!.files[0]);
  }
  onUpload(file: File) {
    this.feedService.uploadFile(file);
  }
}
