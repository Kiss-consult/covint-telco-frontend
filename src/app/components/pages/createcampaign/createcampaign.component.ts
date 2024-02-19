import { Component, } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common';
import { Campaign } from 'src/app/models/campaign/campaign';
import { Answer } from 'src/app/models/answer/answer';
import { Question } from 'src/app/models/question/question';
import { Sound } from 'src/app/models/sound/sound';
import { List_of_numbers } from 'src/app/models/list_of_numbers/list_of_numbers';


@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.component.html',
  styleUrls: ['./createcampaign.component.css'],


})

export class CreatecampaignComponent {
  campaign: Campaign = new Campaign;
  autoActive: boolean = false;
  liveActive: boolean = false;
  addanswertoggleActive: boolean=false;
  origialFromTime: string = "";
  origialToTime: string = "";
  origialPeriod: string = "";

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
  callday: string ="";
  sound : Sound= new Sound;
  sounds : Sound[] = [];
  list : List_of_numbers = new List_of_numbers;
  lists: List_of_numbers[] = [];
  listID: string ="";
  
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
      this.campaign.liveOrAuto = false;
      console.log("auto valsztottam", this.campaign.liveOrAuto)

    } else if (contentType === 'live') {
      this.autoActive = false;
      this.liveActive = true;
      this.campaign.liveOrAuto = true;
      console.log("live választottam:", this.campaign.liveOrAuto)
    }

    if (contentType === 'addanswertoggle') {
      this.addanswertoggleActive = true;
      console.log("hozza adtam a valaszt", this.campaign.liveOrAuto)

    }

    

  }

  goBackToPrevPage(): void {
    this.location.back();
  }
 

  constructor(private backendService: BackendService, private location: Location) {


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

      this.backendService.getAllList().subscribe(
        result => {
          if (result.isErr()) {
            alert("hanganyagok listája sikertelen betöltés");
            console.error(result.unwrapErr());
            return;
          }
          this.lists = result.unwrap();
         
          // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
          console.log("hanganyagok  listája sikeres betöltés");
          console.log(this.lists);
  
  
  
  
  
        });
  


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
 private formatpriod(period: string): string[] {
    console.log(period)
    const newperiod = this.origialPeriod.split(":", 3);
    console.log(newperiod)
    return newperiod;
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
  //  and inserts the campaign into the database.
  // It also clears the form for the next campaign.
  public finish() {
    if (!this.checkRequiredFields()) {
    return;
     }
    //this.question.answers.push(this.answers)
this.campaign.numberListId = parseInt(this.listID);
    console.log("listid",  this.campaign.numberListId)
    console.log("liveorauto",  this.campaign.liveOrAuto)
    console.log(this.origialFromTime, this.origialToTime)
    this.campaign.fromTime = this.formatTime(this.origialFromTime);
    this.campaign.toTime = this.formatTime(this.origialToTime);

    console.log(this.campaign);
    this.campaign.period = this.formatpriod(this.origialPeriod)[0] + "h" +this.formatpriod(this.origialPeriod)[1]+"m" +this.formatpriod(this.origialPeriod)[2]+"s" ;
    console.log(this.campaign.period);
   
    
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

// Function to add  answer  option to the quesion
  public addAnswer() {
    if (this.newAnswer === null) {
      alert("Kérem adjon meg egy válasz lehetúséget!");
      return;
    }
    //const newMarker = new Marker(this.newBno, this.illnessesByBno.get(this.newBno)?.Names);
    
    console.log (this.buttonValues)
    if (this.buttonValues.filter((valami) => valami === this.newAnswer.buttonValue).length > 0) {
      console.log("The button  already exists")
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


  // Function to remove answer from the quesion
  public removeAnswer(answer: Answer) {
    this.newQuestion.answers = this.newQuestion.answers.filter(m => m !== answer);
  }

  addDate() {

    this.campaign.callDays.push(this.callday);    
    
    this.callday ="";

    console.log(this.campaign.callDays)   

  }    

 removeDate(date: string) {
    this.campaign.callDays = this.campaign.callDays.filter(m => m !== date);
  }


  // Function to add question from campaign

  public addQuestion() {
    if (this.newQuestion === null) {
      alert("Kérem adjon meg egy BNO kódot!");
      return;
    }
        
    this.campaign.questions.push(this.newQuestion);
    this.campaign.numberOfQuestions =this.campaign.numberOfQuestions +1;
    this.buttonValues = [];
    console.log (this.campaign)
    this.newQuestion = new Question;
    this.newAnswer = new Answer;
  }


  // Function to remove question from campaign
  public removeQuestion(question: Question) {
    this.campaign.questions = this.campaign.questions.filter(m => m !== question);
    this.campaign.numberOfQuestions = this.campaign.numberOfQuestions -1;
  }
  private checkRequiredFields(): boolean {
    if (this.campaign.liveOrAuto === false  && (this.campaign.name === null || this.campaign.name=== "" )) {
      alert("A 'Kampány neve' mező kitöltése kötelező");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && (this.campaign.startDate === null || this.campaign.startDate === "")) {
      alert("A 'Kezdés  dátuma' mező kitöltése kötelező");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && (this.campaign.endDate === null ||  this.campaign.endDate === "" ) ){
      alert("A 'Befejezés dátuma' mező kitöltése kötelező, és nem lehet korábbi mint a 'Kezdés dátuma'");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && (this.campaign.fromTime === null ||  this.campaign.fromTime === "")) {
      alert("A 'Kezdés ideje' mező kitöltése kötelező");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && (this.campaign.toTime === null ||  this.campaign.toTime <  this.campaign.fromTime)) {
      alert("A 'Befejezés ideje' mező kitöltése kötelező és nem lehet korábbi mint a 'Kezdés ideje'");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && (this.campaign.callDays === null || ( this.campaign.callDays.length = 0)) ){
      alert("A Kérem adjon meg minimum egy hívási napot, ami a kezdés dátuma és a befejezés dátuma közé esik!");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && this.campaign.callsPerPeriod === null ) {
      alert("A 'Hyások közötti idő' mező kitöltése kötelező");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && (this.campaign.goodbyePath === null || this.campaign.goodbyePath === "") ){
      alert("A 'Elköszönő üzenet' mező kitöltése kötelező");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && (this.campaign.welcomePath === null || this.campaign.welcomePath === "")) {
      alert("A 'Üdvözlő üzenet' mező kitöltése kötelező");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && this.campaign.numberListId === null ) {
      alert("A 'Kötés telefonszám listához' mező kitöltése kötelező");
      return false;
    }
    if (this.campaign.liveOrAuto === false  && (this.campaign.period === null || this.campaign.period=== "") ) {
      alert("A 'Hívások közötti idő' mező kitöltése kötelező");
      return false;
    }
    if (this.campaign.liveOrAuto === true  && (this.campaign.ringGroup === null ) ) {
      alert("A 'Csengetési csoport ' mező kitöltése kötelező");
      return false;
    }
    return true;
  }
 
}

