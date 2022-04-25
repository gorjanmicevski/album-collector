import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumsPopUpComponent } from './albums-pop-up.component';

describe('AlbumsPopUpComponent', () => {
  let component: AlbumsPopUpComponent;
  let fixture: ComponentFixture<AlbumsPopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumsPopUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumsPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
