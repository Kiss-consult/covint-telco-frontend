
import { Component, ViewChild, OnInit, ChangeDetectorRef, AfterContentChecked } from '@angular/core';


import { BackendService } from 'src/app/services/backend/backend.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Filter } from 'src/app/models/filter/filter';



import { LoginService } from 'src/app/services/login/login.service';

import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';

import { Location } from '@angular/common'
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {

  displayedColumns: string[] = ['name','id']; // Itt adhatod meg az oszlopok neveit
  dataSource: MatTableDataSource<ResultCampaign>;

  @ViewChild('paginator')  paginator: MatPaginator; /// erre figyelni majd
  pageSizeOptions: number[] = [5, 10];
  resultCampaigns:ResultCampaign[] = [];
  resultCampaign: ResultCampaign = new ResultCampaign;

  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(private backendService: BackendService, public loginService: LoginService, private router: Router,  
    private changeDetector: ChangeDetectorRef,private location: Location){


      this.backendService.getAllCampaign().subscribe(
        result => {
          if (result.isErr()) {
            alert("Betegségek lekérdezése sikertelen");
            console.error(result.unwrapErr());
            return;
          }
          this.resultCampaigns = result.unwrap();
  
          console.log("Sikeresen lekérdezve a betegségek az adatbázisból");
          console.log(this.resultCampaigns);
          this.dataSource = new MatTableDataSource(this.resultCampaigns);
          this.dataSource.paginator = this.paginator;
  
        });
    }
}
