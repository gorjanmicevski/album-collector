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
}
