import { Component, Input, OnInit } from '@angular/core';

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
    console.log('cancel');
    this.onCancel;
  }
}
