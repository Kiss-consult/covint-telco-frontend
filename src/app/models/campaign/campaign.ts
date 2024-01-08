
import { Question } from "../question/question";



export class Campaign {

    name: string = ""; // kampány neve
    startDate: string = "";  // kezdés
    endDate: string = "";  // vége
    fromTime: string = "";  // napon belüli kezdet
    toTime: string = "";  // npon belül vége
    period: string = "";  // hivások közötti idő
    callsPerPeriod: number = 0; // egy periodus alatt hivott számok 
    liveOrAuto: boolean = false;  // automata vagy élőhangos
    numberListId: number = 0; // kötés a telefonszám listához
    numberOfQuestions: number = 0; // kérdések száma
    welcomePath: string = ""; // üdvözlő üzenet felvételének a linkje
    goodbyePath: string = "";// elköszönő üzenet felvételének a linkje
    ringGroup: number = 0; // csöngeés csoport: ha előhangos akkor kell ez a szám
    question: Question[] = []; // kérdések-válaszok tömbje
    callDays: string[] = []; // milen napokon akarunk hívni

}

/*
{
  "name": "Almafa17",
  "startDate": "2023-02-02",
  "endDate": "2023-11-11",
  "fromTime": "08:00:00.000",
  "toTime": "17:00:00.000",
  "period": "10m",
  "callsPerPeriod": 10,
  "liveOrAuto": true,
  "numberListId": 1,
  "numberOfQuestions": 5,
  "welcomePath": "/welcome",
  "goodbyePath": "/goodbye",
  "ringGroup": 5,
  "questions": [
    {
      "questionNumber": 1,
      "minioPath": "/questions/1",
      "valueToSet": "Value 1",
      "answers": [
        {
          "buttonValue": 1,
          "value": "Answer A"
        },
        {
          "buttonValue": 2,
          "value": "Answer B"
        }
      ]
    },
    {
      "questionNumber": 2,
      "minioPath": "/questions/2",
      "valueToSet": "Value 2",
      "answers": [
        {
          "buttonValue": 3,
          "value": "Answer X"
        },
        {
          "buttonValue": 4,
          "value": "Answer Y"
        }
      ]
    }
  ],
  "callDays": ["2023-07-15", "2023-07-16"]
}





*/