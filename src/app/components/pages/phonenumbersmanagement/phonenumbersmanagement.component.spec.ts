import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhonenumbersmanagementComponent } from './phonenumbersmanagement.component';

describe('PhonenumbersmanagementComponent', () => {
  let component: PhonenumbersmanagementComponent;
  let fixture: ComponentFixture<PhonenumbersmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhonenumbersmanagementComponent]
    });
    fixture = TestBed.createComponent(PhonenumbersmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
