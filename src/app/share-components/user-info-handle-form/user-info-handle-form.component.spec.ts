import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoHandleFormComponent } from './user-info-handle-form.component';

describe('UserInfoHandleFormComponent', () => {
  let component: UserInfoHandleFormComponent;
  let fixture: ComponentFixture<UserInfoHandleFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoHandleFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserInfoHandleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
