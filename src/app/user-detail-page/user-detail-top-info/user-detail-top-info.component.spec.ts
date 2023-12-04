import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailTopInfoComponent } from './user-detail-top-info.component';

describe('UserDetailTopInfoComponent', () => {
  let component: UserDetailTopInfoComponent;
  let fixture: ComponentFixture<UserDetailTopInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserDetailTopInfoComponent]
    });
    fixture = TestBed.createComponent(UserDetailTopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
