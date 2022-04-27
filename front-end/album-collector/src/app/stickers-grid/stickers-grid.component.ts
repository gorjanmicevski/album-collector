import { Component, OnInit } from '@angular/core';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { FeedService } from '../feed.service';
import { ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-stickers-grid',
  templateUrl: './stickers-grid.component.html',
  styleUrls: ['./stickers-grid.component.css'],
})
export class StickersGridComponent implements OnInit {
  constructor(private service: AlbumService, private route: ActivatedRoute) {}
  rowRange = new Array(0);
  colRange = new Array(20);
  stickers: any[] | undefined;
  allStickers: any[] | undefined;
  collectedStickers: any[] | undefined;
  duplicateStickers: any[] | undefined;
  missingStickers: any[] | undefined;
  paId: string | null = '';
  test = 'All';
  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        tap((id) => {
          this.paId = id;
        }),
        mergeMap((id) => this.service.getStickers(Number.parseInt(id!)))
      )
      .subscribe((data) => {
        console.log(data);
        this.allStickers = data.allStickers;
        this.collectedStickers = data.collectedStickers;
        this.duplicateStickers = data.duplicateStickers;

        this.missingStickers = this.allStickers?.filter(
          (e) =>
            !this.collectedStickers?.map((s) => s.number).includes(e.number)
        );
        this.allStickers = this.allStickers?.map((sticker) => {
          if (
            this.missingStickers?.map((s) => s.number).includes(sticker.number)
          ) {
            return { ...sticker, stickerClass: 'missing' };
          } else return sticker;
        });
        this.allStickers = this.allStickers?.map((sticker) => {
          if (
            this.collectedStickers
              ?.map((s) => s.number)
              .includes(sticker.number)
          ) {
            return { ...sticker, stickerClass: 'collected' };
          } else return sticker;
        });
        this.allStickers = this.allStickers?.map((sticker) => {
          if (
            this.duplicateStickers
              ?.map((s) => s.number)
              .includes(sticker.number)
          ) {
            return { ...sticker, stickerClass: 'duplicate' };
          } else return sticker;
        });

        this.stickers = [...this.allStickers!];
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
        this.stickers = [...this.allStickers!];
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
  ngOnDestroy() {
    let collected = this.allStickers?.filter(
      (s) => s.stickerClass == 'collected'
    );
    let duplicate = this.allStickers?.filter(
      (s) => s.stickerClass == 'duplicate'
    );
    let missing = this.allStickers?.filter((s) => s.stickerClass == 'missing');
    this.service.addCollected(
      Number.parseInt(this.paId!),
      collected?.map((s) => s.number)!
    );
    this.service.addDuplicate(
      Number.parseInt(this.paId!),
      duplicate?.map((s) => s.number)!
    );
    this.service.addMissing(
      Number.parseInt(this.paId!),
      missing?.map((s) => s.number)!
    );
    console.log('collected', collected);
    console.log('duplicate', duplicate);
  }
}
