import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription, catchError, finalize, map, of } from 'rxjs';


import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { LoginService } from '../login/login.service';
import { ConfigService } from '../config/config.service';
import { Campaign } from 'src/app/models/campaign/campaign';
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { Empty } from 'src/app/models/utils/empty';

@Injectable({
    providedIn: 'root'
  })
  export class BackendService {
    private url: string = "";
    markers: string[] = [];
    username: string = "";
    uploadProgress!: number;
    uploadSub!: Subscription;
  
  
    constructor(private httpClient: HttpClient, private config: ConfigService,
      private loginService: LoginService) {
      this.url = this.config.config.TelcoBackendUrl;
    }
  
    public hello(): Observable<string> {
      return this.httpClient.get(this.url + "/", { responseType: "text" });
    }
    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
          "Content-Type": "application/json"
        });
      }

      // ********************* CAMPAIGN FUNCTIONS **************************************

  // This function insert new campaign into the database.
  public createCampaign(campaign: Campaign): Observable<Result<{}>> {
    const url = this.url + "/campaign/create";
    return this.httpClient.put<Result<ResultCampaign>>(url, campaign, { headers: this.getHeaders() }).pipe(
      map(result => fromJSON<{}>(JSON.stringify(result))),
      catchError(error => of(new Err<{}>(error)))
    );
  }

// This function search an given campaign by name or start and end date from the database.
public searchCampaign(name: string, startDate: string, endDate:string): Observable<Result<[ResultCampaign]>> {
  const url = this.url + "/campaign/search";
  let searchpack = {name, startDate, endDate};
  return this.httpClient.post<Result<[ResultCampaign]>>(url, searchpack, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<[ResultCampaign]>(JSON.stringify(result))),
    catchError(error => of(new Err<[ResultCampaign]>(error)))
  );
}

// This function get all existing campaign from the database.
public getAllCampaign(): Observable<Result<[ResultCampaign]>> {
  const url = this.url + "/campaign/all"; 
  return this.httpClient.get<Result<[ResultCampaign]>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<[ResultCampaign]>(JSON.stringify(result))),
    catchError(error => of(new Err<[ResultCampaign]>(error)))
  );
}

// This function get a given existing campaign by id from the database.
public getCampaignById(id : number): Observable<Result<ResultCampaign>> {
  const url = this.url + "/campaign/" + id; 
  return this.httpClient.get<Result<ResultCampaign>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<ResultCampaign>(JSON.stringify(result))),
    catchError(error => of(new Err<ResultCampaign>(error)))
  );
}


// This function update an given campaign by id  in the database.
public updateCampaign(id: number , welcomePath: string, goodbyePath:string): Observable<Result<{}>> {
  const url = this.url + "/campaign/update";
  let searchpack = {id, welcomePath, goodbyePath};
  return this.httpClient.post<Result<{}>>(url, searchpack, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

// This function delete a given existing campaign by id from the database.
public deleteCampaignById(id : number): Observable<Result<{}>> {
  const url = this.url + "/campaign/delete/" + id; 
  return this.httpClient.get<Result<{}>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}


// *********************  END OF CAMPAIGN FUNCTIONS **************************************


// *********************  TELEPHONE FUNCTIONS **************************************




uploadFile(file: File, name: string): Observable<Result<Empty>> {
  const url = this.url + "/list/import";
  let formData = new FormData();
  formData.append('name', name);
  formData.append('list', file);
  const upload$ = this.httpClient.post(url, formData, { headers: new HttpHeaders() })
    .pipe(
      finalize(() => this.reset())
    ).subscribe();
  return of(new Ok<Empty>(new Empty()));
}
cancelUpload() {
  this.uploadSub.unsubscribe();
  this.reset();
}
reset() {
  this.uploadProgress = 0;
  this.uploadSub = Subscription.EMPTY;
}












// *********************  END OF TELEPHONE FUNCTIONS **************************************

}