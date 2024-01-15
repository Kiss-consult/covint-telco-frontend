

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


  question: Question = new Question;
  answer: Answer = new Answer;
  answers: Answer[] = [];
  questions: Question[] = [];
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
  }

  public startCampaign() { }

  public stopCampaign() { }


  public updateCampaign() { }


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

}
