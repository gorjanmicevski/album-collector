import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, mergeMap, Observable, Subject, tap } from 'rxjs';
import { CollectorService } from '../collector.service';
import { Obj } from '@popperjs/core';
import { AlbumService } from '../album.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private collectorService: CollectorService,
    private albumService: AlbumService,
    private feedService: FeedService,
    private sanitizer: DomSanitizer
  ) {}
  collectorFullName = '';
  collectorInfo$ = new Subject<void>();
  collectorId = Number.parseInt(localStorage.getItem('collector_id')!);
  editView = true;
  btnText = 'Edit Profile';
  selectedValue = 'All';
  options = ['All', 'Collected', 'Collecting'];
  testImg: any;
  albumImageGetter$ = new Subject<number>();
  albumsList: any[] = [];

  ngOnInit(): void {
    this.albumImageGetter$
      .pipe(
        mergeMap((albumId) => {
          console.log('albumId: ', albumId);
          return this.albumService.getAlbumImage(albumId);
        })
      )
      .subscribe({
        next: (data) => {
          console.log('dataInImageGetter', data);
          let objectURL = URL.createObjectURL(data);
          this.albumsList.push(
            this.sanitizer.bypassSecurityTrustUrl(objectURL)
          );
        },
      });
    this.collectorInfo$
      .pipe(
        mergeMap(() =>
          forkJoin([
            this.collectorService.getCollector(this.collectorId),
            this.collectorService.getPP(this.collectorId),
            this.albumService.getPrivateAlbums(this.collectorId),
          ])
        )
      )
      .subscribe({
        next: (data: [any, Blob, any[]]) => {
          console.log('dataSubject ', data);
          this.collectorFullName = `${data[0].name} ${data[0].surname}`;
          if (data[1].size > 0) {
            let objectURL = URL.createObjectURL(data[1]);
            this.testImg = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          } else this.testImg = `https://i.imgur.com/aoKusnD.jpg`;
          data[2].forEach((el) => {
            // console.log(el.album.id);
            this.albumImageGetter$.next(el.album.id);
          });
        },
      });
    this.collectorInfo$.next();
  }
  toggleView() {
    if (this.editView) {
      this.editView = false;
      this.btnText = 'Save Profile';
    } else {
      this.editView = true;
      this.btnText = 'Edit Profile';
    }
  }
  onFileSelected(event: any) {
    console.log(event);
    this.onUpload(event.target.files[0]);
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        this.testImg = e.target.result;
      };
    }
  }
  // getProfilePic() {
  //   console.log('inn');
  //   this.collectorService
  //     .getPP()
  //     .pipe(tap((e) => console.log(e)))
  //     .subscribe((blob: any) => {
  //       console.log('inn');
  //       console.log(blob);
  //       let objectURL = URL.createObjectURL(blob);
  //       this.testImg = this.sanitizer.bypassSecurityTrustUrl(objectURL);
  //     });
  // }
  onUpload(file: File) {
    this.feedService.uploadFile(file);
  }
}
