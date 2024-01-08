import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditlogComponent } from './auditlog.component';

describe('AuditlogComponent', () => {
  let component: AuditlogComponent;
  let fixture: ComponentFixture<AuditlogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditlogComponent]
    });
    fixture = TestBed.createComponent(AuditlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
