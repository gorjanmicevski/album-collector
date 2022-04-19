import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-post-pop-up-form',
  templateUrl: './post-pop-up-form.component.html',
  styleUrls: ['./post-pop-up-form.component.css'],
})
export class PostPopUpFormComponent implements OnInit {
  constructor() {}
  @Input() onCancel: void | undefined;
  ngOnInit(): void {}
  cancel() {
    this.onCancel;
  }
}
