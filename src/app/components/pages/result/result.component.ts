
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { DatePipe, Location } from '@angular/common'
import { Campaign } from 'src/app/models/campaign/campaign';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question/question';
import { Answer } from 'src/app/models/answer/answer';
import { List_of_numbers } from 'src/app/models/list_of_numbers/list_of_numbers';
import { CallDay } from 'src/app/models/result_campaign/callday';
import { ResultFilter } from 'src/app/models/filter/resultfilter';
import { Data } from 'src/app/models/list_of_numbers/data';
import { Page } from 'src/app/models/list_of_numbers/page';



@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {
  
  DateFrom: string = "";
  DateTo: string = "";
  RelativeDate: string = "";

  resultCampaign: ResultCampaign = new ResultCampaign; 
  resultCampaings: ResultCampaign[] = [];
  campaign: Campaign = new Campaign;
  campaignId: any = this.resultCampaign.id;
  autoActive: boolean = false;
  liveActive: boolean = false;
  list: List_of_numbers = new List_of_numbers;
  question: Question = new Question;
  answer: Answer = new Answer;
  answers: Answer[] = [];
  questions: Question[] = [];
  timeActive: boolean = false;
  relativtimeActive: boolean = false;
  calldays: CallDay[] = [];
  callday: CallDay = new CallDay;
  datePipe = new DatePipe('en');
  available: boolean = false;
  today = new Date();
  changedDate = '';
  pipe = new DatePipe('en-US');
  changeFormat(today: string | number | Date) {
    let ChangedFormat = this.pipe.transform(today, 'y-MM-dd');
    this.changedDate = ChangedFormat!;
    console.log(this.changedDate);
    return this.changedDate;
  }
  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  dataSource!: MatTableDataSource<Data>;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];
  resultFilter : ResultFilter = new ResultFilter;
  pageIndex: number = 0;
  pageSize: number = 5;
  length: number = 10;
  data: Data = new Data;
  datas: Data[] = [];
  page: Page = new Page;

  displayedColumns: string[] = ['HangUpCode', 'Number', 'Name', 'Other'];
  constructor(private backendService: BackendService, private location: Location, private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute, private router: Router) {


    this.campaignId = this._Activatedroute.snapshot.paramMap.get("id"); /// majd ide jon a masik componensbol a valtozo
    console.log("lekerdeztem", this.campaignId);

    let today: number = Date.now();
    this.changeFormat(today);

    this.loadData(this.campaignId);

    

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


  public getFilteredResult() {
   this.resultFilter.VpbxUuid = this.resultCampaign.VpbxUuid;

    this.backendService.filterResults(this.resultFilter, this.pageSize, this.pageIndex ).subscribe(result => {

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
      this.page = result.unwrap();

  
      this.datas = this.page.data;
      this.pageIndex = this.page.page;
      this.pageSize = this.page.pageSize;
      this.length = this.page.total;

      console.log("ellenorzes page2:", this.paginator.length);
      console.log("ellenorzes page2:", this.paginator.getNumberOfPages())
      console.log("ellenorzes list:", this.list,);
      console.log("ellenorzes page:", this.page,);
      console.log("ellenorzes page.data:", this.page.data);
      // console.log("ellenorzes data:" , this.list);
      // alert("elenorzes");

      this.dataSource = new MatTableDataSource(this.datas);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.empTbSort;
      console.log("telefonszám lista sikeres betöltés");

      console.log("számok", this.data);
      console.log("paginator", this.paginator);
      console.log("ellenorzes page3:", this.paginator.length);
    });
  }
  public getServerData(event: PageEvent) {
    console.log("event", event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;

    this.backendService.filterResults(this.resultFilter, this.pageSize, this.pageIndex ).subscribe(result => {

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
      this.page = result.unwrap();

  
      this.datas = this.page.data;
      this.pageIndex = this.page.page;
      this.pageSize = this.page.pageSize;
      this.length = this.page.total;

      console.log("ellenorzes page2:", this.paginator.length);
      console.log("ellenorzes page2:", this.paginator.getNumberOfPages())
      console.log("ellenorzes list:", this.list,);
      console.log("ellenorzes page:", this.page,);
      console.log("ellenorzes page.data:", this.page.data);
      // console.log("ellenorzes data:" , this.list);
      // alert("elenorzes");

      this.dataSource = new MatTableDataSource(this.datas);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.empTbSort;
      console.log("telefonszám lista sikeres betöltés");

      console.log("számok", this.data);
      console.log("paginator", this.paginator);
      console.log("ellenorzes page3:", this.paginator.length);
    });
  }

  private loadData(id: number) {
    this.campaignId = id;

    this.backendService.getCampaignById(this.campaignId).subscribe(result => {

      if (result.isErr()) {
        let mess = result.unwrapErr().error.Error;
        if (mess === "You are not allowed to interact the data of this user") {
          alert("Sikertelen adatlekérés \nÖn nem jogosult az adatok lekérésére !")
          console.log("jogosultsági probléma")
        }
        else
          alert("kampány lekérdezése  sikertelen ");
        console.error(result.unwrapErr());
        return;
      }
      this.resultCampaign = result.unwrap();
      console.log("Kampány sikeres betöltés");
      this.questions = this.resultCampaign.questions;
      this.calldays = this.resultCampaign.callDays;
      console.log("kérdések", this.questions);
      console.log(this.changedDate);
      console.log(this.resultCampaign.endDate);
      if (this.resultCampaign.endDate < this.changedDate) {
        this.available = false;
        console.log(this.available);
      }
      else {
        this.available = true;
        console.log(this.available);
      }
      this.backendService.getListById(this.resultCampaign.numberListId,1,1).subscribe(
        result => {
          if (result.isErr()) {
            alert("lista sikertelen leállítása");
            console.error(result.unwrapErr());
            return;
          }
          this.list = result.unwrap();
          console.log(this.list.name)

          // window.location.reload();
        });
      this.getFilteredResult();
    });
  }

  public searchCampaign() {
    this.backendService.searchCampaign(this.campaign.name, this.campaign.startDate, this.campaign.endDate, this.DateFrom, this.DateTo, this.RelativeDate).subscribe(
      result => {
        if (result.isErr()) {
          alert("Kampányok keresése sikertelen betöltés");
          console.error(result.unwrapErr());
          return;
        }
        this.resultCampaings = result.unwrap();
        this.dataSource = new MatTableDataSource(this.datas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;
  
        this.dataSource.data = this.datas; // Az adatforrás frissítése
        console.log("Kampányok keresése sikeres betöltés");
        console.log(this.resultCampaings);
      });
  }

  goBackToPrevPage(): void {
    this.location.back();
  }

  
}
