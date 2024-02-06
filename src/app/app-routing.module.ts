

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
import { NumberupdateComponent } from './components/pages/numberupdate/numberupdate.component';
import { CampaignupdateComponent } from './components/pages/campaignupdate/campaignupdate.component';
import { ResultCampaign } from './models/result_campaign/result_campaign';
import { ResultComponent } from './components/pages/result/result.component';
import { KutatoOrvos, Orvos, PortalKezelo, PortalVezeto } from './models/group/group';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "createcampaign", component: CreatecampaignComponent,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] } },
  { path: "managecampaign", component: ManagecampaignComponent ,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] }},
  { path: "phonenumbersmanagement", component: PhonenumbersmanagementComponent,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] } },
  { path: "reports", component: ReportsComponent ,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] }},
  { path: "voicemessagesmanagement", component: VoicemessagesmanagementComponent,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] } },
  { path: "auditlog", component: AuditlogComponent,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] } },
  { path: "campaign/:id", component: CampaignComponent,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] } },
  { path: "list/:id", component: ListComponent,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] } },
  { path: "numberupdate/:id", component: NumberupdateComponent ,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] }},
  { path: "campaignupdate/:id", component: CampaignupdateComponent ,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] }},
  { path: "result/:VpbxUuid", component: ResultComponent ,canActivate: [AuthGuard] , data: { roles: [ PortalVezeto] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
