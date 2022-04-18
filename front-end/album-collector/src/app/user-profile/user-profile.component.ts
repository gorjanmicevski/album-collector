import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  constructor() {}
  editView = true;
  btnText = 'Edit Profile';
  selectedValue = 'All';
  options = ['All', 'Collected', 'Collecting'];
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
}
