import { AnswerRespons } from "./answer_respons";

export class Data {

    Number: string ="";
    Name: string ="";
    Other: string ="";
    StartTime: string ="";
    CallLength: number = 0;
    CampaignUuid: string ="";
    CampaignName: string ="";
    Responses:number = 0;
    Answers:AnswerRespons[] = [];
    CallUid: string ="";
    DialStatus: string ="";
    HangupCode: string ="";
    Result:string ="";
    TimeStampArrived: string ="";

}