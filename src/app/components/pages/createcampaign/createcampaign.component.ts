import { Component, } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common';
import { Campaign } from 'src/app/models/campaign/campaign';
import { Answer } from 'src/app/models/answer/answer';
import { Question } from 'src/app/models/question/question';


@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.component.html',
  styleUrls: ['./createcampaign.component.css'],


})

export class CreatecampaignComponent {
  campaign: Campaign = new Campaign;
  autoActive: boolean = false;
  liveActive: boolean = false;
  origialFromTime: string = "";
  origialToTime: string = "";

  questionNumber: number = 0;
  minioPath: string = "";
  valueToSet: string = "";
  // answers : Answer[] = [] = new Array(10).fill(0).map(() => new Answer());
  answers: Answer[] = [];
  answer: Answer = new Answer;
  question: Question = new Question;
  questions: Question[] = [];
  buttonValue: number = 0;
  value: string = "";
  newAnswer: Answer = new Answer;

  newQuestion: Question = new Question;
  buttonValues : Number[] = [];

  // ngOnInit() {
  // this.initializeButtonValues();
  // }

  initializeButtonValues() {
    for (let i = 0; i < this.answers.length; i++) {
      this.answers[i].buttonValue = i + 1;
    }
  }

  getNumbersArray(count: number): number[] {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  toggleContent(contentType: string) {
    if (contentType === 'auto') {
      this.autoActive = true;
      this.liveActive = false;
      this.campaign.liveOrAuto = true;
      console.log("auto valsztottam", this.campaign.liveOrAuto)

    } else if (contentType === 'live') {
      this.autoActive = false;
      this.liveActive = true;
      this.campaign.liveOrAuto = false;
      console.log("live választottam:", this.campaign.liveOrAuto)
    }

  }

  goBackToPrevPage(): void {
    this.location.back();
  }


  constructor(private backendService: BackendService, private location: Location) {

  }
  // Format date to YYYY-MM-DD - example
  private formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + 1;
    const day = date.getUTCDate();
    const monthPadding = month < 10 ? "0" : "";
    const dayPadding = day < 10 ? "0" : "";
    return `${year}-${monthPadding}${month}-${dayPadding}${day}`;
  }

  // Format time to hh:mm:00.000 - example
  private formatTime(time: string): string {
    console.log(time)
    const newtime = time + ":00.000";
    console.log(newtime)
    return newtime;
  }

  public add() {
    this.answers.push(this.answer);
    console.log(" valasz osszerakas", this.answers)
    this.answer = new Answer;

  }
  public questionDone() {
    this.question.answers = this.answers;
    this.questions.push(this.question);
    console.log("kérdés  osszerakas", this.questions)
    this.question = new Question;

  }

  // Function to finish campaign creation. It checks the required fields,
  // adds the current date to the case, and inserts the campaign into the database.
  // It also clears the form for the next case.
  public finish() {
    //if (!this.checkRequiredFields()) {
    // return;
    //  }
    //this.question.answers.push(this.answers)

  

    console.log(this.origialFromTime, this.origialToTime)
    this.campaign.fromTime = this.formatTime(this.origialFromTime);
    this.campaign.toTime = this.formatTime(this.origialToTime);

    console.log(this.campaign);
   
    
   
    
    this.backendService.createCampaign(this.campaign).subscribe(
      result => {
        if (result.isErr()) {
          alert("Sikertelen kampány létrehozás");
          console.error(result.unwrapErr());
          return;
        }
        alert("Sikeres kampány létrehozás");
        console.log("Successfully creat a new campaign")
        this.campaign = new Campaign();
      });
      
  }


  public addAnswer() {
    if (this.newAnswer === null) {
      alert("Kérem adjon meg egy BNO kódot!");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);
    
    console.log (this.buttonValues)
    if (this.buttonValues.filter((valami) => valami === this.newAnswer.buttonValue).length > 0) {
      console.log("Marker already exists")
      alert("a nyomogomb már szerepel ebben a kérdésben")
      this.removeAnswer(this.newAnswer);
      return;
    }
    this.buttonValues.push(this.newAnswer.buttonValue);
    this.newQuestion.answers.push(this.newAnswer);

    console.log (this.newAnswer)
    console.log (this.newQuestion)
    this.newAnswer = new Answer;
  }


  // Function to remove bno from the case
  public removeAnswer(answer: Answer) {
    this.newQuestion.answers = this.newQuestion.answers.filter(m => m !== answer);
  }




  public addQuestion() {
    if (this.newQuestion === null) {
      alert("Kérem adjon meg egy BNO kódot!");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);
    
    //console.log (this.buttonValues)

    /// itt tartok a gondolkodásban  ****************************************************************************************************************
    //********************************************************************************************************* 
/*

    if (this.buttonValues.filter((valami) => valami === this.newAnswer.buttonValue).length > 0) {
      console.log("Marker already exists")
      alert("a nyomogomb már szerepel ebben a kérdésben")
      this.removeAnswer(this.newAnswer);
      return;
    }
    this.buttonValues.push(this.newAnswer.buttonValue);
    this.newQuestion.answers.push(this.newAnswer);
     */
    
    this.campaign.questions.push(this.newQuestion);
    this.campaign.numberOfQuestions =this.campaign.numberOfQuestions +1;
    
    console.log (this.campaign)
    this.newQuestion = new Question;
  }


  // Function to remove bno from the case
  public removeQuestion(question: Question) {
    this.campaign.questions = this.campaign.questions.filter(m => m !== question);
  }


}

