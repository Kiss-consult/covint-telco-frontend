import { Component } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common'

import { Campaign } from 'src/app/models/campaign/campaign';


@Component({
  selector: 'app-createcampaign',
  templateUrl: './createcampaign.component.html',
  styleUrls: ['./createcampaign.component.css']
})
export class CreatecampaignComponent {
  campaign : Campaign = new Campaign;
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

  // Function to finish campaign creation. It checks the required fields,
  // adds the current date to the case, and inserts the campaign into the database.
  // It also clears the form for the next case.
  public finish() {
    //if (!this.checkRequiredFields()) {
     // return;
  //  }
   // this.campaign.Date = this.formatDate(new Date());
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
