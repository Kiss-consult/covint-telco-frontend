import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common'
import { Campaign } from 'src/app/models/campaign/campaign';
import { Router } from '@angular/router';

@Component({
  selector: 'app-managecampaign',
  templateUrl: './managecampaign.component.html',
  styleUrls: ['./managecampaign.component.css']
})
export class ManagecampaignComponent {

  DateFrom: string = "";
  DateTo: string = "";
  RelativeDate: string = "";
  timeActive: boolean = false;
  relativtimeActive: boolean = false;
  resultCampaing: ResultCampaign = new ResultCampaign;
  resultCampaings: ResultCampaign[] = [];
  dataSource!: MatTableDataSource<ResultCampaign>;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'liveOrAuto', 'numberOfQuestions', 'VpbxUuid', 'id', 'started', 'campaign'];

  campaign: Campaign = new Campaign;

  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleContent(contentType: string) {
    if (contentType === 'time') {
      this.timeActive = true;
      this.relativtimeActive = false;
      console.log("Dátumot választottam");
    } else if (contentType === 'relativtime') {
      this.timeActive = false;
      this.relativtimeActive = true;
      console.log("Relativ dátumot választottam");
    }
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(private backendService: BackendService, private location: Location, private router: Router) {

    this.backendService.getAllCampaign().subscribe(
      result => {
        if (result.isErr()) {
          let mess = result.unwrapErr().error.Error;
          alert("kampány sikertelen betöltése, hiba :\n"+ mess);
          
          console.error(result.unwrapErr());
          return;
        }
        this.resultCampaings = result.unwrap();
        this.dataSource = new MatTableDataSource(this.resultCampaings);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;        
        console.log("Kampányok sikeres betöltés");
        console.log(this.resultCampaings);
      });

  }

// filter campaigns  - backend filter
  public searchCampaign() {
    this.backendService.searchCampaign(this.campaign.name, this.campaign.startDate, this.campaign.endDate, this.DateFrom, this.DateTo, this.RelativeDate).subscribe(
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
        this.dataSource.data = this.resultCampaings; 
        console.log("Kampányok keresése sikeres betöltés");
        console.log(this.resultCampaings);
      });
  }

  // get data of the selected campaign
  public callCampaign(campaign: ResultCampaign) {
    console.log("result campaign", campaign)
    console.log("id", campaign.id)
    let id = campaign.id;
    this.router.navigate(
      ['/campaign', id]
    );
  }

}
