import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private AuthSvc: AuthService) {

   }
   
   isUserAuth() {
     return this.AuthSvc.isUserAuthorized();
   }

  ngOnInit(): void {
  }

}
