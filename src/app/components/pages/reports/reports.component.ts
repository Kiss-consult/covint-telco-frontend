
import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';


import { BackendService } from 'src/app/services/backend/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Filter } from 'src/app/models/filter/filter';



import { LoginService } from 'src/app/services/login/login.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { Location } from '@angular/common'
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { Campaign } from 'src/app/models/campaign/campaign';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  resultCampaing: ResultCampaign = new ResultCampaign;
  resultCampaings: ResultCampaign[] = [];
  dataSource!: MatTableDataSource<ResultCampaign>;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'liveOrAuto', 'numberOfQuestions', 'VpbxUuid','id', 'started','campaign'];

  campaign: Campaign = new Campaign;

  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor(private backendService: BackendService, private location: Location, private router: Router,private _Activatedroute:ActivatedRoute) {



    this.backendService.getAllCampaign().subscribe(
      result => {
        if (result.isErr()) {
          alert("Kampányok sikertelen betöltés");
          console.error(result.unwrapErr());
          return;
        }
        this.resultCampaings = result.unwrap();
        this.dataSource = new MatTableDataSource(this.resultCampaings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;

        // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
        console.log("Kampányok sikeres betöltés");
        console.log(this.resultCampaings);
      });

  }


public searchCampaign() {
  this.backendService.searchCampaign(this.campaign.name, this.campaign.startDate, this.campaign.endDate).subscribe(
    result => {
      if (result.isErr()) {
        alert("Kampányok keresése sikertelen betöltés");
        console.error(result.unwrapErr());
        return;
      }
      this.resultCampaings = result.unwrap();
      this.dataSource = new MatTableDataSource(this.resultCampaings);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.empTbSort;

      this.dataSource.data = this.resultCampaings; // Az adatforrás frissítése
      console.log("Kampányok keresése sikeres betöltés");
      console.log(this.resultCampaings);
    });
}

public callCampaignResult(campaign: ResultCampaign){
  console.log("result campaign",campaign)
  console.log("VpbxUuid",campaign.VpbxUuid)
  
   let VpbxUuid = campaign.VpbxUuid;
    this.router.navigate(
        ['/result', VpbxUuid]
    ); 
}


}
