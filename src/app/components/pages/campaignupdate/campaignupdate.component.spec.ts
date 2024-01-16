import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignupdateComponent } from './campaignupdate.component';

describe('CampaignupdateComponent', () => {
  let component: CampaignupdateComponent;
  let fixture: ComponentFixture<CampaignupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CampaignupdateComponent]
    });
    fixture = TestBed.createComponent(CampaignupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
