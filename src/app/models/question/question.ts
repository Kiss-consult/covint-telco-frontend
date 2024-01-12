import { Answer } from "../answer/answer";


export class Question {
    questionNumber!: number;
    minioPath: string = "";
    valueToSet: string = "";
    answers : Answer[] = [];

}