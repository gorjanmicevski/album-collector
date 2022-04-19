import { Component, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-stickers-grid',
  templateUrl: './stickers-grid.component.html',
  styleUrls: ['./stickers-grid.component.css'],
})
export class StickersGridComponent implements OnInit {
  constructor(private feedService: FeedService) {}
  rowRange = new Array(0);
  colRange = new Array(20);
  ngOnInit(): void {}
  stickers: any[] | undefined;
  allStickers: any[] | undefined;
  test = 'All';
  ngOnInit(): void {
    this.feedService.getStickers().subscribe((data) => {
      this.allStickers = data;
      this.allStickers = this.allStickers.map((sticker) => {
        return { ...sticker, stickerClass: 'missing' };
      });
      this.stickers = [...this.allStickers];
      console.log(this.stickers);
      this.calculateRowRange();
    });
  }
  calculateRowRange() {
    this.rowRange = new Array(Math.ceil(this.stickers?.length! / 20));
    console.log(this.rowRange.length);
  }
  inColRange(index: number) {
    if (this.stickers!.length <= index) return false;
    return true;
  }
  stickerClass = 'missing';
  selected = 'All';
  alterSticker(index: number) {
    switch (this.stickers![index].stickerClass) {
      case 'missing':
        this.stickers![index].stickerClass = 'collected';

        break;
      case 'collected':
        this.stickers![index].stickerClass = 'duplicate';
        break;
      case 'duplicate':
        this.stickers![index].stickerClass = 'missing';
        break;
    }
  }
  filterStickers(option: any) {
    this.selected = option;
    switch (option) {
      case 'All':
        this.stickers = this.allStickers?.map((s) => s);
        break;
      case 'Missing':
        this.stickers = this.allStickers?.filter(
          (s) => s.stickerClass == 'missing'
        );
        break;
      case 'Duplicates':
        this.stickers = this.allStickers?.filter(
          (s) => s.stickerClass == 'duplicate'
        );
        break;
      case 'Collected':
        this.stickers = this.allStickers?.filter(
          (s) => s.stickerClass == 'collected'
        );
        break;
    }

    console.log(option);
  }
}
