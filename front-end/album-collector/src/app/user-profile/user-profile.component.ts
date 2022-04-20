import { Component, OnInit } from '@angular/core';
import { FeedService } from '../feed.service';
import { DomSanitizer } from '@angular/platform-browser';
import { tap } from 'rxjs';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private feedService: FeedService,
    private sanitizer: DomSanitizer
  ) {}
  editView = true;
  btnText = 'Edit Profile';
  selectedValue = 'All';
  options = ['All', 'Collected', 'Collecting'];
  profileUrl: any = 'https://i.imgur.com/aoKusnD.jpg';
  testImg: any;
  albumsList: String[] = [
    'https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/114/posts/34296/final_image/Final-image.jpg',
    'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/3:4/w_650,h_867,c_limit/Artist-Designed%20Album%20Covers%202.jpg',
    'https://www.sleek-mag.com/wp-content/uploads/2016/08/AlbumCovers_Blonde-1200x1200.jpg',
    'https://media.npr.org/assets/img/2013/04/22/dark-side_sq-1da3a0a7b934f431c175c91396a1606b3adf5c83-s1100-c50.jpg',
    'https://cdn.kingscross.co.uk/media/20191118225723/Tame-Impala.jpeg',
  ];
  ngOnInit(): void {}
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
        this.profileUrl = e.target.result;
      };
    }
  }
  getProfilePic() {
    console.log('inn');
    this.feedService
      .getPP()
      .pipe(tap((e) => console.log(e)))
      .subscribe((blob: any) => {
        console.log('inn');
        console.log(blob);
        let objectURL = URL.createObjectURL(blob);
        this.testImg = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      });
  }
  onUpload(file: File) {
    this.feedService.uploadFile(file);
  }
}
