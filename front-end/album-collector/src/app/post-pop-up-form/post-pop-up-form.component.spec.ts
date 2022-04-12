import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPopUpFormComponent } from './post-pop-up-form.component';

describe('PostPopUpFormComponent', () => {
  let component: PostPopUpFormComponent;
  let fixture: ComponentFixture<PostPopUpFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostPopUpFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPopUpFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
