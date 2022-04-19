import { Component, OnInit } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PostPopUpFormComponent } from '../post-pop-up-form/post-pop-up-form.component';
@Component({
  selector: 'app-albums-grid',
  templateUrl: './albums-grid.component.html',
  styleUrls: ['./albums-grid.component.css'],
})
export class AlbumsGridComponent implements OnInit {
  constructor(private modalService: NgbModal) {}
  albumsList: String[] = [
    'https://cms-assets.tutsplus.com/cdn-cgi/image/width=850/uploads/users/114/posts/34296/final_image/Final-image.jpg',
    'https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/3:4/w_650,h_867,c_limit/Artist-Designed%20Album%20Covers%202.jpg',
    'https://www.sleek-mag.com/wp-content/uploads/2016/08/AlbumCovers_Blonde-1200x1200.jpg',
    'https://media.npr.org/assets/img/2013/04/22/dark-side_sq-1da3a0a7b934f431c175c91396a1606b3adf5c83-s1100-c50.jpg',
    'https://cdn.kingscross.co.uk/media/20191118225723/Tame-Impala.jpeg',
    'https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png',
  ];
  rowRange: number[] = [];
  cols = new Array(4);
  closeResult = '';
  ngOnInit(): void {
    this.rowRange = new Array(this.calculateRows(this.albumsList));
    console.log(this.rowRange);
  }
  calculateRows(list: String[]): number {
    if (list.length % 4 == 0) return list.length / 4;

    return Math.floor(list.length / 4) + 1;
  }
  colRange(index: number) {
    if (this.albumsList.length <= index) return false;
    return true;
  }
  createRange(number: number) {
    // var items: number[] = [];
    // for(var i = 1; i <= number; i++){
    //   items.push(i);
    // }
    // return items;
    return new Array(number);
  }
  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
    console.log(this.closeResult);
    // this.modalService.open(PostPopUpFormComponent);
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
