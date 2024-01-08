import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagecampaignComponent } from './managecampaign.component';

describe('ManagecampaignComponent', () => {
  let component: ManagecampaignComponent;
  let fixture: ComponentFixture<ManagecampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagecampaignComponent]
    });
    fixture = TestBed.createComponent(ManagecampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
