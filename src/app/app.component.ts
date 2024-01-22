import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { Router } from '@angular/router';
import { ConfigService } from './services/config/config.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covint-telco-frontend';

  flag: boolean = true;
  /* orvos = Orvos;
   kutatoorvos = KutatoOrvos;
   portaladmin = PortalKezelo;
   portalvezeto = PortalVezeto;*/
  isMenuOpen = false;

  constructor(public loginService: LoginService, private router: Router, private configService: ConfigService) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
  changePassword() {

    this.router.navigate(["/changepwd"]);
  }
  gotoCovint() {
   
    window.open(this.configService.config.CovintUrl);
  }
  getUserAttributes() {

    this.router.navigate(["/profile"]);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
