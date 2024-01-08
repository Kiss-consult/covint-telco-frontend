
import { Question } from "../question/question";



export class ResultCampaign {

    name: string = "";

    startDate: string = "";
    endDate: string = "";

    fromTime: string = "";
    toTime: string = "";

    period: string = "";
    callsPerPeriod: string = "";
    
    liveOrAuto: boolean = false;
    numberListId: number = 0;
    numberOfQuestions: number = 0;
    welcomePath: string = "";
    goodbyePath: string = "";
    ringGroup: number = 0;
    question: Question[] = [];

    callDays: string[] = [];

    id: number =0;
    asteriskUuid: string = "";
    timeStamp: string = "";
    
    


}