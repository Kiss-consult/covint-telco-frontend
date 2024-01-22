import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Router } from '@angular/router';


import { KeycloakEventType, KeycloakService } from 'keycloak-angular';

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

      if (keycloakService.isLoggedIn()) {
        this.getUserData();
      } else {
        this.loggedIn = false;
  
      }

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

        this.loggedIn = this.keycloakService.isLoggedIn();
        if (this.loggedIn === true) {
          this.getUserData();
          return;
        }
        this.keycloakService.login().then(() => {
    
          this.loggedIn = this.keycloakService.isLoggedIn();
          if (this.loggedIn === true) {
            this.getUserData();
          }
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
        let home = window.location.toString().replace(this.router.url, '')

        this.keycloakService.logout(home)
        this.keycloakService.clearToken();
    
        this.token = "";
      }

      public getUsername(): string {
        return this.username;
      }
    
  }