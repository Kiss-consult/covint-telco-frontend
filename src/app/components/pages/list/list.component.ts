
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common'
import { Campaign } from 'src/app/models/campaign/campaign';
import { ActivatedRoute, Router } from '@angular/router';
import { List_of_numbers } from 'src/app/models/list_of_numbers/list_of_numbers';
import { Number } from 'src/app/models/list_of_numbers/number';
import { Filter } from 'src/app/models/filter/filter';
import { Page } from 'src/app/models/list_of_numbers/page';
import { Data } from 'src/app/models/list_of_numbers/data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {


  data :Data = new Data;
  datas: Data[] = [];
  page : Page= new Page;
  dataSource!: MatTableDataSource<Data>;
  @ViewChild('paginator')  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];

  displayedColumns: string[] = ['id','name', 'other', 'listId','number', 'update','delete'];
  list: List_of_numbers = new List_of_numbers;
  listId: any = this.list.id;

  campaign: Campaign = new Campaign;
  filter: Filter = new Filter;

  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(private backendService: BackendService, private location: Location, private router: Router, private _Activatedroute: ActivatedRoute) {



    this.listId = this._Activatedroute.snapshot.paramMap.get("id"); /// majd ide jon a masik componensbol a valtozo
    console.log("lekerdeztem", this.listId);

    this.backendService.getListById(this.listId).subscribe(result => {

      if (result.isErr()) {
        let mess = result.unwrapErr().error.Error;
        if (mess === "You are not allowed to interact the data of this user") {
          alert("Sikertelen adatlekérés \nÖn nem jogosult az adatok lekérésére !")
          console.log("jogosultsági probléma")
        }
        else
          alert("telefonszám lista lekérdezése  sikertelen ");
        console.error(result.unwrapErr());
        return;
      }
      this.list = result.unwrap();

      this.page = this.list.page;
      this.datas = this.page.data;
      
     
      console.log("ellenorzes list:" , this.list,);
      console.log("ellenorzes page:" , this.page,);
      console.log("ellenorzes page.data:" , this.page.data);
     // console.log("ellenorzes data:" , this.list);
     // alert("elenorzes");
      
      this.dataSource = new MatTableDataSource(this.datas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.empTbSort;
      console.log("telefonszám lista sikeres betöltés");

      console.log("számok", this.data);

    });

  }






  public filterList() {
    console.log("filter", this.filter)
    this.filter.listId = this.list.id;
    this.backendService.filterList(this.filter).subscribe(
      result => {
        if (result.isErr()) {
          alert("Kampányok keresése sikertelen betöltés");
          console.error(result.unwrapErr());
          return;
        }
       let result_filter = result.unwrap();
       this.page = result_filter;
       this.datas = this.page.data;
        this.dataSource = new MatTableDataSource(this.datas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;

       this.dataSource.data = this.page.data; // Az adatforrás frissítése
        console.log("Kampányok keresése sikeres betöltés");
        console.log("filter eredmeny",result_filter);
      });
  }

  deleteNumber(number: Number) {
    this.backendService.deleteNumberById(number.id).subscribe(
      result => {
        if (result.isErr()) {
          alert("telefonszám sikertelen törlése");
          console.error(result.unwrapErr());
          return;
        }
        alert("telefonszám sikeres törlése");
        this.dataSource = new MatTableDataSource(this.datas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;

       this.dataSource.data = this.datas; // Az adatforrás frissítése
        console.log("telefonszám sikeres törlése");
      console.log(this.data);
        window.location.reload();

      });
  }


  updateNumber(number: Number) {
    
    this.router.navigate(
        ['/numberupdate', number.id]
    ); 


  }

 addToList(data: Data) {
  let localnumbers: Data[] = []; // Valamiert tömbe kell átadni 
  let localnumber = data;
  let listId = this.list.id;
  
  localnumbers.push(localnumber)
  
 // this.numbers_.push(number);
    this.backendService.addTolist(listId, localnumbers).subscribe(
      result => {
        if (result.isErr()) {
          alert("telefonszám sikertelen hozzáadása");
          console.error(result.unwrapErr());
          return;
        }
        alert("telefonszám sikeres hozzáadása");
        //this.dataSource = new MatTableDataSource(this.sounds);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;

       // this.dataSource.data = this.numbers_; // Az adatforrás frissítése
        console.log("hanganyag sikeres hozzáadása");
       // console.log(this.numbers_);
        window.location.reload();

      });
  }

  public export () {
   
  
  let name = this.list.name;
    const filename = name + "lista.xlsx";
    this.backendService.downloadExport(this.list.id).subscribe((result) => {
      if (result.isErr()) {
        console.error(result.unwrapErr());
        return;
      }
      let response = result.unwrap();
      let data = response[0];
      let dataType = response[1];
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(data, { type: dataType }));
      if (filename)
        downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }
}
