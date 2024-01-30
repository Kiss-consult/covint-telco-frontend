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
import { UpdateCampaign } from 'src/app/models/campaign/update_campaign';
import { UpdateNumber } from 'src/app/models/list_of_numbers/update_number';
import { Data } from 'src/app/models/list_of_numbers/data';
import { Page } from 'src/app/models/list_of_numbers/page';
@Component({
  selector: 'app-numberupdate',
  templateUrl: './numberupdate.component.html',
  styleUrls: ['./numberupdate.component.css']
})
export class NumberupdateComponent {
  resultCampaign: ResultCampaign = new ResultCampaign;

  dataSource!: MatTableDataSource<ResultCampaign>;
  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];

  displayedColumns: string[] = ['name', 'startDate', 'endDate', 'liveOrAuto', 'numberOfQuestions', 'VpbxUuid', 'started'];

  campaign: Campaign = new Campaign;
  data: Data = new Data;
  id: any = this.data.id;
  update_number = new UpdateNumber;
page : Page= new Page;

  question: Question = new Question;
  answer: Answer = new Answer;
  answers: Answer[] = [];
  questions: Question[] = [];

  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor(private backendService: BackendService, private location: Location, private fb: FormBuilder,
    private _Activatedroute: ActivatedRoute, private router: Router) {

    this.id = this._Activatedroute.snapshot.paramMap.get("id"); /// majd ide jon a masik componensbol a valtozo
    console.log("lekerdeztem", this.id);


    this.backendService.getNumberById(this.id).subscribe(result => {

      if (result.isErr()) {
        let mess = result.unwrapErr().error.Error;
        if (mess === "You are not allowed to interact the data of this user") {
          alert("Sikertelen adatlekérés \nÖn nem jogosult az adatok lekérésére !")
          console.log("jogosultsági probléma")
        }
        else
          alert("Telefonszám mezú lekérdezése  sikertelen ");
        console.error(result.unwrapErr());
        return;
      }
      this.data = result.unwrap();

      this.update_number.id = this.data.id;
      this.update_number.name = this.data.name;
      this.update_number.number = this.data.number;
      this.update_number.other = this.data.other;
      console.log("Telefonszám mező sikeres betöltés");

      console.log("telefonszámmező", this.data);

    });

  }




  public update() {



    this.backendService.updateNumber(this.update_number).subscribe(result => {

      if (result.isErr()) {
        let mess = result.unwrapErr().error.Error;
        if (mess === "You are not allowed to interact the data of this user") {
          alert("Sikertelen adatlekérés \nÖn nem jogosult az adatok lekérésére !")
          console.log("jogosultsági probléma")
        }
        else
          alert("telefonszám update  sikertelen ");
        console.error(result.unwrapErr());
        return;
      }
      alert("telefonszám sikeres update");
      console.log("telefonszám  sikeres update");



    });



  }
}
