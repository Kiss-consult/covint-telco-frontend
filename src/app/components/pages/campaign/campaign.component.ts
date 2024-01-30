

import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild, } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe, Location } from '@angular/common'
import { Campaign } from 'src/app/models/campaign/campaign';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question/question';
import { Answer } from 'src/app/models/answer/answer';
import { List_of_numbers } from 'src/app/models/list_of_numbers/list_of_numbers';
import { CallDay } from 'src/app/models/result_campaign/callday';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.css']
})
export class CampaignComponent {



  resultCampaign: ResultCampaign = new ResultCampaign;

  dataSource!: MatTableDataSource<ResultCampaign>;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'liveOrAuto', 'numberOfQuestions', 'VpbxUuid', 'started'];

  campaign: Campaign = new Campaign;

  campaignId: any = this.resultCampaign.id;
  autoActive: boolean = false;
  liveActive: boolean = false;
  list: List_of_numbers = new List_of_numbers;
  question: Question = new Question;
  answer: Answer = new Answer;
  answers: Answer[] = [];
  questions: Question[] = [];

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
  getNumbersArray(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  }


  goBackToPrevPage(): void {
    this.location.back();
  }

  constructor(private backendService: BackendService, private location: Location, private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute, private router: Router) {


    this.campaignId = this._Activatedroute.snapshot.paramMap.get("id"); /// majd ide jon a masik componensbol a valtozo
    console.log("lekerdeztem", this.campaignId);

    let today: number = Date.now();
    this.changeFormat(today);

    this.loadData(this.campaignId)

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





      this.backendService.getListById(this.resultCampaign.numberListId).subscribe(
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



    });



  }

  public startCampaign(id: number) {
    this.backendService.startCampaignById(id).subscribe(
      result => {
        if (result.isErr()) {
          alert("kampány sikertelen indítása");
          console.error(result.unwrapErr());
          return;
        }
        alert("kampány sikeres indítása");

        console.log("kampany elindult", id)
        this.loadData(id);

        console.log("kampany oldal ujratoltve? ", id)
      });

  }

  public stopCampaign(id: number) {
    this.backendService.stopCampaignById(id).subscribe(
      result => {
        if (result.isErr()) {
          alert("kampány sikertelen leállítása");
          console.error(result.unwrapErr());
          return;
        }
        alert("kampány sikeres leállítása");
        console.log("kampany leállt", id)
        this.loadData(id);
        console.log("kampany oldal ujratoltve? ", id)
      });

  }


  public updateCampaign(id: number) {

    this.router.navigate(
      ['/campaignupdate', id]
    );

  }
  public getListName(id: number) {

    this.backendService.getListById(id).subscribe(
      result => {
        if (result.isErr()) {
          alert("lista sikertelen leállítása");
          console.error(result.unwrapErr());
          return;
        }
        this.list = result.unwrap();
        console.log(this.list.name)
        return this.list.name;
        // window.location.reload();
      });

  }


  public deleteCampaign(id: number) {

    this.backendService.deleteCampaignById(id).subscribe(
      result => {
        if (result.isErr()) {
          alert("kampány sikertelen törlése");
          console.error(result.unwrapErr());
          return;
        }
        alert("kampány sikeres törlése");
        this.router.navigate(
          ['/managecampaign']
        );
      });
  }

  public Play(url: string) {
    console.log(url)
    let audio: HTMLAudioElement = new Audio(url);
    audio.play();
  }

}


