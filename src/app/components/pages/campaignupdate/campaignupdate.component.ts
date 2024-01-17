import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { BackendService } from 'src/app/services/backend/backend.service';
import { MatPaginator } from '@angular/material/paginator';
import { Location } from '@angular/common'
import { Campaign } from 'src/app/models/campaign/campaign';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Question } from 'src/app/models/question/question';
import { Answer } from 'src/app/models/answer/answer';
import { Number } from 'src/app/models/list_of_numbers/number';
import { Sound } from 'src/app/models/sound/sound';
import { UpdateCampaign } from 'src/app/models/campaign/update_campaign';

@Component({
  selector: 'app-campaignupdate',
  templateUrl: './campaignupdate.component.html',
  styleUrls: ['./campaignupdate.component.css']
})
export class CampaignupdateComponent {
  resultCampaign: ResultCampaign = new ResultCampaign;

  dataSource!: MatTableDataSource<ResultCampaign>;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'liveOrAuto', 'numberOfQuestions', 'VpbxUuid', 'started'];

  campaign: ResultCampaign = new ResultCampaign;
  number: Number = new Number;
  campaignId: any = this.campaign.id;
  updateCampaign: UpdateCampaign = new UpdateCampaign;

  sound: Sound = new Sound;
  sounds: Sound[] = [];

  question: Question = new Question;
  answer: Answer = new Answer;
  answers: Answer[] = [];
  questions: Question[] = [];

  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor(private backendService: BackendService, private location: Location, private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute, private router: Router) {

    this.campaignId = this._Activatedroute.snapshot.paramMap.get("id"); /// majd ide jon a masik componensbol a valtozo
    console.log("lekerdeztem", this.campaignId);


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
      console.log("kérdések", this.questions);

    });

    this.backendService.getAllSounds().subscribe(
      result => {
        if (result.isErr()) {
          alert("hangok lekérdezése sikertelen");
          console.error(result.unwrapErr());
          return;
        }
        this.sounds = result.unwrap();

        console.log("hangok lekérdezve az adatbázisból");
        console.log(this.sounds);


      });

  }



  public update() {

    this.updateCampaign.id = this.resultCampaign.id;
    this.updateCampaign.goodbyePath = this.resultCampaign.goodbyePath;
    this.updateCampaign.welcomePath = this.resultCampaign.welcomePath;
    
    this.backendService.updateCampaign(this.updateCampaign).subscribe(result => {

      if (result.isErr()) {
        let mess = result.unwrapErr().error.Error;
        if (mess === "You are not allowed to interact the data of this user") {
          alert("Sikertelen adatlekérés \nÖn nem jogosult az adatok lekérésére !")
          console.log("jogosultsági probléma")
        }
        else
          alert("kampány update  sikertelen ");
        console.error(result.unwrapErr());
        return;
      }
      alert("Kampány sikeres update");
      console.log("Kampány sikeres update");



    });


  }



}
