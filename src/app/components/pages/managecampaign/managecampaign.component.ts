import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common'

@Component({
  selector: 'app-managecampaign',
  templateUrl: './managecampaign.component.html',
  styleUrls: ['./managecampaign.component.css']
})
export class ManagecampaignComponent {



resultCampaing :ResultCampaign = new ResultCampaign;
resultCampaings: ResultCampaign[] = [];


  dataSource!: MatTableDataSource<ResultCampaign>; 


  @ViewChild('paginator')
  paginator!: MatPaginator;
@ViewChild('empTbSort') empTbSort = new MatSort();
pageSizeOptions: number[] = [5, 10];

displayedColumns: string[] = ['name','startDate','endDate','liveOrAuto','numberOfQuestions','VpbxUuid','started']; 

Filter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

goBackToPrevPage(): void {
  this.location.back();
}
  constructor(private backendService: BackendService,private location: Location ) {


      
    this.backendService. getAllCampaign().subscribe(
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







}
