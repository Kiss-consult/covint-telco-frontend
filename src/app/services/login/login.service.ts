import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, finalize, map, of } from 'rxjs';
import { Err, Ok, Result, fromJSON } from 'src/app/models/utils/result';
import { ConfigService } from '../config/config.service';

import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';

import jwt_decode from 'jwt-decode';
//import { AccessToken } from 'src/app/models/token/accesstoken';
import { Router } from '@angular/router';


import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { Empty } from 'src/app/models/utils/empty';



@Injectable({
  providedIn: 'root'
})



export class LoginService {
    static hasAnyGroup(groups: string[]) {
      throw new Error('Method not implemented.');
    }
    url: string = "";
  
    token: string = "";
    id: string = "";
    email: string = "";
    //uploadProgress: number;
    //uploadSub: Subscription;
  
  
    username: string = "";
    loggedIn: boolean = false;
    userId: string = "";
  
  
    constructor(private httpClient: HttpClient, private config: ConfigService,
      private router: Router, private keycloakService: KeycloakService) {
      //this.url = this.config.config.AuthUrl;
      keycloakService.keycloakEvents$.subscribe({
        next: (e) => {
          if (e.type == KeycloakEventType.OnTokenExpired) {
            keycloakService.updateToken(20).then((refreshed) => { });
          }
          if (e.type == KeycloakEventType.OnAuthSuccess) {
            this.getUserData();
          }
        }
      });
    }
    private getUserData() {
        this.loggedIn = true;
        this.keycloakService.getToken().then((token) => {
          this.token = token;
        });
        this.keycloakService.loadUserProfile().then((profile) => {
          this.username = profile.username as string;
          this.userId = profile.id as string;
        });
      }

      public login(): void {
        this.keycloakService.isLoggedIn().then((loggedIn) => {
          console.log("loggedIn from login", loggedIn)
          this.loggedIn = loggedIn;
          if (this.loggedIn === false) {
            this.keycloakService.login().then(() => {
              this.loggedIn = true;
              this.getUserData();
            });
          }
          this.getUserData();
        });
      }
      private getHeaders(): HttpHeaders {
        return new HttpHeaders({
          "Content-Type": "application/json",
        });
    
      }

      public isLoggedIn(): boolean {
        return this.loggedIn;
      }
    
      public logout() {
        
     
        this.keycloakService.logout(window.location.origin)
        this.keycloakService.clearToken();
       
        this.token = "";
      }

      public getUsername(): string {
        return this.username;
      }
    
  }