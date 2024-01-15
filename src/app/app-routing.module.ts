

 import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreatecampaignComponent } from './components/pages/createcampaign/createcampaign.component';
import { HomeComponent } from './components/pages/home/home.component';
import { ManagecampaignComponent } from './components/pages/managecampaign/managecampaign.component';
import { PhonenumbersmanagementComponent } from './components/pages/phonenumbersmanagement/phonenumbersmanagement.component';
import { ReportsComponent } from './components/pages/reports/reports.component';
import { VoicemessagesmanagementComponent } from './components/pages/voicemessagesmanagement/voicemessagesmanagement.component';
import { AuditlogComponent } from './components/pages/auditlog/auditlog.component';
import { CampaignComponent } from './components/pages/campaign/campaign.component';
import { ListComponent } from './components/pages/list/list.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "createcampaign", component: CreatecampaignComponent},
  { path: "managecampaign", component: ManagecampaignComponent },
  { path: "phonenumbersmanagement", component: PhonenumbersmanagementComponent },
  { path: "reports", component: ReportsComponent },
  { path: "voicemessagesmanagement", component: VoicemessagesmanagementComponent },
  { path: "auditlog", component: AuditlogComponent },
  { path: "campaign/:id", component: CampaignComponent },
  { path: "list/:id", component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
