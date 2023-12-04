import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMatchesOverwievComponent } from './user-matches-overwiev.component';

describe('UserMatchesOverwievComponent', () => {
  let component: UserMatchesOverwievComponent;
  let fixture: ComponentFixture<UserMatchesOverwievComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserMatchesOverwievComponent]
    });
    fixture = TestBed.createComponent(UserMatchesOverwievComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
