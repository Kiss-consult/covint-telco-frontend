
import { Question } from "../question/question";
import { CallDay } from "./callday";



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
    questions: Question[] = [];

    callDays: CallDay[] = [];

    id: number = 0;
    started: boolean = false;
    VpbxUuid: string = "";
    timeStamp: string = "";




}