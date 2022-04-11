import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickersGridComponent } from './stickers-grid.component';

describe('StickersGridComponent', () => {
  let component: StickersGridComponent;
  let fixture: ComponentFixture<StickersGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickersGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
