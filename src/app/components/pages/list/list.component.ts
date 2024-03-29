
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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


  data: Data = new Data;
  datas: Data[] = [];
  page: Page = new Page;
  dataSource!: MatTableDataSource<Data>;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];
  pageEvent: PageEvent;
  displayedColumns: string[] = ['id', 'name', 'other', 'listId', 'number', 'update', 'delete'];
  list: List_of_numbers = new List_of_numbers;
  listId: any = this.list.id;

  campaign: Campaign = new Campaign;
  filter: Filter = new Filter;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 10;

  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(private backendService: BackendService, private location: Location, private router: Router, private _Activatedroute: ActivatedRoute) {

    this.listId = this._Activatedroute.snapshot.paramMap.get("id");
    console.log("lekerdeztem", this.listId);
    this.getlists();
  }

  public getlists() {
    console.log("ellenorzes page1:", this.page,);
    console.log("ellenorzes page1:", this.paginator,);

    this.backendService.getListById(this.listId, this.pageSize, this.pageIndex).subscribe(result => {
      if (result.isErr()) {
        let mess = result.unwrapErr().error.Error;
        if (mess === "You are not allowed to interact the data of this user") {
          alert("Sikertelen adatlekérés \nÖn nem jogosult az adatok lekérésére !")
          console.log("jogosultsági probléma")
        }
        if (mess === "Cannot get list by id: sql: Scan error on column index 3, name \"id\": converting NULL to int is unsupported") {
          alert("Sikertelen adatlekérés \nA kért lista üres!")
          console.log("üres lista")
        }
        else
          alert("telefonszám lista lekérdezése sikertelen ");
        console.error(result.unwrapErr());
        return;
      }
      this.list = result.unwrap();

      this.page = this.list.page;
      this.datas = this.page.data;
      this.pageIndex = this.page.page;
      this.pageSize = this.page.pageSize;
      this.length = this.page.total;

      console.log("ellenorzes page2:", this.paginator.length);
      console.log("ellenorzes page2:", this.paginator.getNumberOfPages())
      console.log("ellenorzes list:", this.list,);
      console.log("ellenorzes page:", this.page,);
      console.log("ellenorzes page.data:", this.page.data);

      this.dataSource = new MatTableDataSource(this.datas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.empTbSort;
      console.log("telefonszám lista sikeres betöltés");

      console.log("számok", this.data);
      console.log("paginator", this.paginator);
      console.log("ellenorzes page3:", this.paginator.length);
    });
  }


  // paginator use it to get ata from backend
  public getServerData(event: PageEvent) {

    console.log("event", event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.backendService.getListById(this.listId, this.pageSize, this.pageIndex).subscribe(result => {

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
      this.pageIndex = this.page.page;
      this.pageSize = this.page.pageSize;
      this.length = this.page.total;

      console.log("ellenorzes page2:", this.paginator.length);
      console.log("ellenorzes page2:", this.paginator.getNumberOfPages())
      console.log("ellenorzes list:", this.list,);
      console.log("ellenorzes page:", this.page,);
      console.log("ellenorzes page.data:", this.page.data);

      this.dataSource = new MatTableDataSource(this.datas);

      this.dataSource.sort = this.empTbSort;
      console.log("telefonszám lista sikeres betöltés");

      console.log("számok", this.data);
      console.log("paginator", this.paginator);
      console.log("ellenorzes page3:", this.paginator.length);
    });
  }


  // Filter for list - backand filter
  public filterList() {
    console.log("filter", this.filter)
    this.filter.listId = this.list.id;
    this.backendService.filterList(this.filter, this.pageSize, this.pageIndex).subscribe(
      result => {
        if (result.isErr()) {
          alert("Kampányok keresése sikertelen betöltés");
          console.error(result.unwrapErr());
          return;
        }
        let result_filter = result.unwrap();

        this.page = result_filter;
        this.datas = this.page.data;
        this.pageIndex = this.page.page;
        this.pageSize = this.page.pageSize;
        this.length = this.page.total;

        this.page = result_filter;
        this.datas = this.page.data;
        this.dataSource = new MatTableDataSource(this.datas);

        this.dataSource.sort = this.empTbSort;
        console.log("Kampányok keresése sikeres betöltés");
        console.log("filter eredmeny", result_filter);
      });
  }


  // Delete selected number
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

        this.dataSource.data = this.datas;
        console.log("telefonszám sikeres törlése");
        console.log(this.data);
        this.getlists();

      });
  }

  // update selected number
  updateNumber(number: Number) {
    this.router.navigate(
      ['/numberupdate', number.id]
    );
  }

  // add number to the list
  addToList(data: Data) {
    let localnumbers: Data[] = [];
    let localnumber = data;
    let listId = this.list.id;

    localnumbers.push(localnumber)

    this.backendService.addTolist(listId, localnumbers).subscribe(
      result => {
        if (result.isErr()) {
          alert("telefonszám sikertelen hozzáadása");
          console.error(result.unwrapErr());
          return;
        }
        alert("telefonszám sikeres hozzáadása");

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;

        console.log("hanganyag sikeres hozzáadása");
        this.getlists();
      });
  }

  // export the whole list 
  public export() {

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
