import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatecampaignComponent } from './createcampaign.component';

describe('CreatecampaignComponent', () => {
  let component: CreatecampaignComponent;
  let fixture: ComponentFixture<CreatecampaignComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreatecampaignComponent]
    });
    fixture = TestBed.createComponent(CreatecampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
