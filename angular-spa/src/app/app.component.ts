import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-spa';

   constructor(private AuthSvc: AuthService) {

   }
   
   isUserAuthorized() {
     return this.AuthSvc.isUserAuthorized();
   }
}
