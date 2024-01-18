import { Answer } from "../answer/answer";
import { Sound } from "../sound/sound";


export class Question {
    questionNumber!: number;
    Sound: Sound = new Sound;
    valueToSet: string = "";
    answers : Answer[] = [];

}