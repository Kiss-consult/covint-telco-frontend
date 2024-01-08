import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoicemessagesmanagementComponent } from './voicemessagesmanagement.component';

describe('VoicemessagesmanagementComponent', () => {
  let component: VoicemessagesmanagementComponent;
  let fixture: ComponentFixture<VoicemessagesmanagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoicemessagesmanagementComponent]
    });
    fixture = TestBed.createComponent(VoicemessagesmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
