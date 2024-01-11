import { APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/pages/home/home.component';
import { CreatecampaignComponent } from './components/pages/createcampaign/createcampaign.component';
import { ManagecampaignComponent } from './components/pages/managecampaign/managecampaign.component';
import { PhonenumbersmanagementComponent } from './components/pages/phonenumbersmanagement/phonenumbersmanagement.component';
import { VoicemessagesmanagementComponent } from './components/pages/voicemessagesmanagement/voicemessagesmanagement.component';
import { ReportsComponent } from './components/pages/reports/reports.component';
import { AuditlogComponent } from './components/pages/auditlog/auditlog.component';
import { ConfigService } from './services/config/config.service';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { SafePipe } from './pipes/Safepipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from '@angular/cdk/drag-drop';
//import { ColorPickerModule } from 'ngx-color-picker';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { initializeApp } from './init/init';
import { CampaignComponent } from './components/pages/campaign/campaign.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreatecampaignComponent,
    ManagecampaignComponent,
    PhonenumbersmanagementComponent,
    VoicemessagesmanagementComponent,
    ReportsComponent,
    AuditlogComponent,
    CampaignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,       // A táblázat moduljának importálása
    MatPaginatorModule,  // Az oldalazás moduljának importálása
    MatSortModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    DragDropModule,   
    BrowserAnimationsModule,
    KeycloakAngularModule,
 //   ColorPickerModule,
  //  BrowserAnimationsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    ConfigService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initConfig,
    //   deps: [ConfigService],
    //   multi: true
    // },
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: initializeKeycloak,
    //   multi: true,
    //   deps: [KeycloakService, ConfigService],
    // }
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [KeycloakService, ConfigService],
    },
    SafePipe


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


