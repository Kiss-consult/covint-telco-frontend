import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subscription, catchError, finalize, map, of } from 'rxjs';


import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { LoginService } from '../login/login.service';
import { ConfigService } from '../config/config.service';
import { Campaign } from 'src/app/models/campaign/campaign';
import { ResultCampaign } from 'src/app/models/result_campaign/result_campaign';
import { Empty } from 'src/app/models/utils/empty';
import { Sound } from 'src/app/models/sound/sound';
import { List_of_numbers } from 'src/app/models/list_of_numbers/list_of_numbers';
import { Data } from 'src/app/models/list_of_numbers/data';
import { Filter } from 'src/app/models/filter/filter';
import { UpdateCampaign } from 'src/app/models/campaign/update_campaign';
import { UpdateNumber } from 'src/app/models/list_of_numbers/update_number';
import { Page } from 'src/app/models/list_of_numbers/page';
import { ResultFilter } from 'src/app/models/filter/resultfilter';
import { Auditlog } from 'src/app/models/auditlog/auditlog';
import { Respons } from 'src/app/models/respons/respons';
import { ResultDiagram } from 'src/app/models/diagram/result_diagram';
import { Diagram } from 'src/app/models/diagram/diagram';

@Injectable({
    providedIn: 'root'
  })
  export class BackendService {
    private url: string = "";
    private teszturl: string = "";
    markers: string[] = [];
    username: string = "";
    uploadProgress!: number;
    uploadSub!: Subscription;
  
  
    constructor(private httpClient: HttpClient, private config: ConfigService,
      private loginService: LoginService) {
      this.url = this.config.config.TelcoBackendUrl;
      this.teszturl = this.config.config.tesztDiagramUrl;
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
public searchCampaign(name: string, startDate: string, endDate:string, DateFrom: string, DateTo: string, RelativeDate :string): Observable<Result<[ResultCampaign]>> {
  const url = this.url + "/campaign/search";
  let searchpack = {name, startDate, endDate, DateFrom, DateTo, RelativeDate};
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
public updateCampaign(updateCampaign : UpdateCampaign): Observable<Result<{}>> {
  const url = this.url + "/campaign/update";
 
  return this.httpClient.post<Result<{}>>(url, updateCampaign, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

// This function delete a given existing campaign by id from the database.
public deleteCampaignById(id : number): Observable<Result<{}>> {
  const url = this.url + "/campaign/delete/" + id; 
  return this.httpClient.delete<Result<{}>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}
// This function start a given existing campaign by id .
public startCampaignById(id : number): Observable<Result<{}>> {
  const url = this.url + "/campaign/start/" + id; 
  return this.httpClient.post<Result<{}>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}
// This function stop a started existing campaign by id .
public stopCampaignById(id : number): Observable<Result<{}>> {
  const url = this.url + "/campaign/stop/" + id; 
  return this.httpClient.post<Result<{}>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}
// *********************  END OF CAMPAIGN FUNCTIONS **************************************


// *********************  TELEPHONE FUNCTIONS **************************************



// This function upload a csv file and put data to database. ( import)
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
public downloadTemplate(): Observable<Result<[any[], string]>> {
  let options = {
    headers: this.getHeaders(),
   // params: this.getParams(f),
    responseType: "blob" as "json"
  };
  return this.httpClient.get<Blob>(this.url + "/list/examplefile", options).pipe(
    map(response => {
      let dataType = response.type ;
      let binaryData = [];
      binaryData.push(response);
      let result: [any[], string] = [binaryData, dataType  ]
      console.log(result);
      return new Ok(result);
    }),
    catchError(error => of(new Err<[any[], string]>(error)))
  );
}


// This function get all existing list from the database. the numbers array is null , you can use get list by id to achive the numbers
public getAllList(): Observable<Result<[List_of_numbers]>> {
  const url = this.url + "/list/all"; 
  return this.httpClient.get<Result<[List_of_numbers]>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<[List_of_numbers]>(JSON.stringify(result))),
    catchError(error => of(new Err<[List_of_numbers]>(error)))
  );
}



  private getParams(pagesize: number, page: number): HttpParams {
    return new HttpParams().set('pageSize', pagesize,).set('page', page);

    ;
  }
  /*
  // This function inserts the new user into the Auth.
  public getAuditlogs(): Observable<Result<Auditlog[]>> {
    let options = {
      headers: this.getHeaders(),
      params: this.getParams()
    };
    const url = this.url + "/auditlog";
    return this.httpClient.get<Result<Auditlog[]>>(url, options).pipe(
      map(result => fromJSON<Auditlog[]>(JSON.stringify(result))),
      catchError(error => of(new Err<Auditlog[]>(error)))
    );

  }

*/



// This function get a given list by id from the database.
public getListById(id : number,  pagesize: number ,pageindex: number): Observable<Result<List_of_numbers>> {
  let options = {
    headers: this.getHeaders(),
    params: this.getParams(pagesize, pageindex)
  };  
  const url = this.url + "/list/" + id; 
  return this.httpClient.get<Result<List_of_numbers>>(url, options).pipe(
    map(result => fromJSON<List_of_numbers>(JSON.stringify(result))),
    catchError(error => of(new Err<List_of_numbers>(error)))
  );
}

// This function filter a list by any fields ( name, other, number or listId) . you can filter with a part of the name or number...
public filterList(filter: Filter, pagesize: number ,pageindex: number): Observable<Result<Page>> {
  let options = {
    headers: this.getHeaders(),
    params: this.getParams(pagesize, pageindex)
  }; 


  const url = this.url + "/list/filter";
  return this.httpClient.post<Result<Page>>(url, filter, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<Page>(JSON.stringify(result))),
    catchError(error => of(new Err<Page>(error)))
  );
}

// This function add a new number to the list ( listId), name and other is optional
public addTolist(listId: number,   datas: Data[] = [] ): Observable<Result<{}>> {
  const url = this.url + "/list/add";
  let numbers = datas;
    let add = {listId, numbers};
  return this.httpClient.post<Result<{}>>(url, add, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

// This function delete a given number by id from the database.
public deleteNumberById(id : number): Observable<Result<{}>> {
  const url = this.url + "/number/delete/" + id; 
  return this.httpClient.delete<Result<{}>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

// This functionupdate a  number ( change number , name or other field, or three of them)
public updateNumber( update_number: UpdateNumber ): Observable<Result<{}>> {
  const url = this.url + "/number/update";  
  return this.httpClient.post<Result<{}>>(url, update_number, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

// This function update many  number ( change the other field or add other to the numbers)
public updateManyNumber( ids: number[] = [], other : string): Observable<Result<{}>> {
  const url = this.url + "/number/addother";  
  let a = {ids, other}
  return this.httpClient.post<Result<{}>>(url,a, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

// This function delete many number by id from the database.
public deleteManyNumbers(ids: number[] = []): Observable<Result<{}>> {
  const url = this.url + "/number/delete";   
  return this.httpClient.post<Result<{}>>(url, ids, { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}

public downloadExport(id: number): Observable<Result<[any[], string]>> {
  const url = this.url + "/list/export/" + id;
  let options = {
    headers: this.getHeaders(),
    responseType: "blob" as "json"
  };
  return this.httpClient.get<Blob>(url ,  options).pipe(
    map(response => {
      let dataType = response.type;
      let binaryData = [];
      binaryData.push(response);
      let result: [any[], string] = [binaryData, dataType]
      return new Ok(result);
    }),
    catchError(error => of(new Err<[any[], string]>(error)))
  );
}

// This function get a given existing campaign by id from the database.
public getNumberById(id : number): Observable<Result<Data>> {
  const url = this.url + "/number/" + id; 
  return this.httpClient.get<Result<Data>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<Data>(JSON.stringify(result))),
    catchError(error => of(new Err<Data>(error)))
  );
}

// *********************  END OF TELEPHONE FUNCTIONS **************************************

// *********************  SOUND FUNCTIONS **************************************



// This function upload a sound file to minio .
public uploadSound(file: File): Observable<Result<Empty>> {
  const url = this.url + "/sound/upload";
  let formData = new FormData();
 
  formData.append('sound', file);
  const upload$ = this.httpClient.post(url, formData, { headers: new HttpHeaders() })
    .pipe(
      finalize(() => this.reset())
    ).subscribe();
  return of(new Ok<Empty>(new Empty()));
}

// This function get all available sound file name and link .
public getAllSounds(): Observable<Result<[Sound]>> {
  const url = this.url + "/sound/all"; 
  return this.httpClient.get<Result<[Sound]>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<[Sound]>(JSON.stringify(result))),
    catchError(error => of(new Err<[Sound]>(error)))
  );
}


// This function get all available sound file name and link .
public deleteSound(filename : string): Observable<Result<{}>> {
  const url = this.url + "/sound/delete/" + filename; 
  return this.httpClient.delete<Result<{}>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<{}>(JSON.stringify(result))),
    catchError(error => of(new Err<{}>(error)))
  );
}






// *********************  END OF SOUND FUNCTIONS **************************************

// *********************  RESULT FUNCTIONS **************************************



// This function filter a list by any fields ( name, other, number or listId) . you can filter with a part of the name or number...
public filterResults(resultfilter: ResultFilter, pagesize: number ,pageindex: number): Observable<Result<Respons>> {
  let options = {
    headers: this.getHeaders(),
    params: this.getParams(pagesize, pageindex)
  }; 
  const url = this.url + "/callresults/filter";
  return this.httpClient.post<Result<Respons>>(url, resultfilter,options).pipe(
    map(result => fromJSON<Respons>(JSON.stringify(result))),
    catchError(error => of(new Err<Respons>(error)))
  );
}

public getResultDiagramById(id: number): Observable<Result<Diagram>> {
 
  

  const url = this.teszturl + "/diagram/get/" + id; 
  return this.httpClient.get<Result<Diagram>>(url,  { headers: this.getHeaders() }).pipe(
    map(result => fromJSON<Diagram>(JSON.stringify(result))),
    catchError(error => of(new Err<Diagram>(error)))
  );
}

 public downloadResults(vpbxuuid: string): Observable<Result<[any[], string]>> {
    let options = {
      headers: this.getHeaders(),
      responseType: "blob" as "json"
    };
    return this.httpClient.post<Blob>(this.url + "/callresults/export/" + vpbxuuid, options).pipe(
      map(response => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let result: [any[], string] = [binaryData, dataType]
        return new Ok(result);
      }),
      catchError(error => of(new Err<[any[], string]>(error)))
    );
  }



// *********************  END OF RESULT FUNCTIONS **************************************


// This function inserts the new user into the Auth.
public getAuditlogs(pagesize: number ,pageindex: number): Observable<Result<Auditlog>> {
  let options = {
    headers: this.getHeaders(),
    params: this.getParams(pagesize ,pageindex)
  };
  const url = this.url + "/auditlog";
  return this.httpClient.get<Result<Auditlog>>(url, options).pipe(
    map(result => fromJSON<Auditlog>(JSON.stringify(result))),
    catchError(error => of(new Err<Auditlog>(error)))
  );

}
}



















