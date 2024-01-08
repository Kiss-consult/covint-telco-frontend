import { Component } from '@angular/core';
import { LoginService } from './services/login/login.service';
import { Router } from '@angular/router';



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

  constructor(public loginService: LoginService, private router: Router) { }

  logout() {
    this.loginService.logout();
    this.router.navigate(["/login"]);
  }
  changePassword() {

    this.router.navigate(["/changepwd"]);
  }
  
  getUserAttributes() {

    this.router.navigate(["/profile"]);
  }
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
