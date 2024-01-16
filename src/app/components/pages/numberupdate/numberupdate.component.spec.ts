import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberupdateComponent } from './numberupdate.component';

describe('NumberupdateComponent', () => {
  let component: NumberupdateComponent;
  let fixture: ComponentFixture<NumberupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NumberupdateComponent]
    });
    fixture = TestBed.createComponent(NumberupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
