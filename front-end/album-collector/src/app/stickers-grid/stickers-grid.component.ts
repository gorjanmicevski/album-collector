import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stickers-grid',
  templateUrl: './stickers-grid.component.html',
  styleUrls: ['./stickers-grid.component.css'],
})
export class StickersGridComponent implements OnInit {
  constructor() {}
  rowRange = new Array(20);
  colRange = new Array(20);
  ngOnInit(): void {}
  stickerClass = 'sticker sticker-missing';
  alterSticker() {
    switch (this.stickerClass) {
      case 'sticker sticker-missing':
        this.stickerClass = 'sticker sticker-collected';
        break;
      case 'sticker sticker-collected':
        this.stickerClass = 'sticker sticker-duplicate';
        break;
      case 'sticker sticker-duplicate':
        this.stickerClass = 'sticker sticker-missing';
        break;
    }
  }
}
