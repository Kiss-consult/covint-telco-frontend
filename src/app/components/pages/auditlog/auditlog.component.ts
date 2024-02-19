import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Auditlog } from 'src/app/models/auditlog/auditlog';
import { BackendService } from 'src/app/services/backend/backend.service';
import { DatePipe, Location } from '@angular/common';
import { Data } from 'src/app/models/auditlog/data';
import { Page } from 'src/app/models/list_of_numbers/page';

@Component({
  selector: 'app-auditlog',
  templateUrl: './auditlog.component.html',
  styleUrls: ['./auditlog.component.css']
})
export class AuditlogComponent {


  auditlog : Auditlog = new Auditlog;
  
 
  dataSource!: MatTableDataSource<Data>;
  
  
  
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 10;
  data: Data = new Data;
  datas: Data[] = [];
  page: Page = new Page;
  displayedColumns: string[] = ['Date','Time','Level','Message']; 
  
  illnessFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  goBackToPrevPage(): void {
    this.location.back();
  }

    constructor(private backendService: BackendService, private location: Location ) {
  
  
        
      this.backendService.getAuditlogs(this.pageSize,this.pageIndex).subscribe(
        result => {
          if (result.isErr()) {
            alert("Auditlog sikertelen betöltés");
            console.error(result.unwrapErr());
            return;
          }
          this.auditlog = result.unwrap();
          
          this.datas = this.auditlog.data;
          this.pageIndex = this.auditlog.page;
          this.pageSize = this.auditlog.pageSize;
          this.length = this.auditlog.total;


          this.dataSource = new MatTableDataSource(this.datas);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.empTbSort;
    
         // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
          console.log("Auditlog sikeres betöltés");
          console.log(this.datas);
          
  
          
            
  
        });
        
    }



    public getServerData(event: PageEvent) {
      console.log("event", event);
      this.pageSize = event.pageSize;
      this.pageIndex = event.pageIndex;
  
          
      this.backendService.getAuditlogs(this.pageSize,this.pageIndex).subscribe(
        result => {
          if (result.isErr()) {
            alert("Auditlog sikertelen betöltés");
            console.error(result.unwrapErr());
            return;
          }
          this.auditlog = result.unwrap();
          
          this.datas = this.auditlog.data;
          this.pageIndex = this.auditlog.page;
          this.pageSize = this.auditlog.pageSize;
          this.length = this.auditlog.total;

  
  
       
        console.log("ellenorzes page2:", this.paginator.length);
        console.log("ellenorzes page2:", this.paginator.getNumberOfPages())       
        console.log("ellenorzes page.data:", this.auditlog.data);
      
  
        this.dataSource = new MatTableDataSource(this.datas);
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;
        console.log("auditlog lista sikeres betöltés");
  
        console.log("számok", this.data);
        console.log("paginator", this.paginator);
        console.log("ellenorzes page3:", this.paginator.length);
      });
    }
  
  }