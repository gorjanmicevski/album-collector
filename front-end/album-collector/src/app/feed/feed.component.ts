import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  constructor(private feedService: FeedService) {}

  ngOnInit(): void {
    this.feedService.getPosts().subscribe((data) => console.log(data));
    this.feedService.addPost({ test: 'test' });
  }
}
