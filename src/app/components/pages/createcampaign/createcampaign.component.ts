import { Component, } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

import { Campaign } from 'src/app/models/campaign/campaign';
import { Answer } from 'src/app/models/answer/answer';


@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.component.html',
  styleUrls: ['./createcampaign.component.css'], 
  

})

export class CreatecampaignComponent {
  campaign : Campaign = new Campaign;
  autoActive: boolean = false;
  liveActive: boolean = false;
  origialFromTime : string = "";
  origialToTime : string = "";
  
  questionNumber: number = 0 ;
  minioPath: string = "";
  valueToSet: string = "";
  answers : Answer[] = [];

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

  
  constructor(private backendService: BackendService,private location: Location) {  
      
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
  

  // Function to finish campaign creation. It checks the required fields,
  // adds the current date to the case, and inserts the campaign into the database.
  // It also clears the form for the next case.
  public finish() {
    //if (!this.checkRequiredFields()) {
     // return;
  //  }

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

 

}

