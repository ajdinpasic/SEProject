import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalHttpsCaller } from 'src/app/helpers/global.https';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationServiceService } from 'src/app/services/navigation-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

   categories: any;
  constructor(private AuthSvc: AuthService, private navSvc: NavigationServiceService,private toastr: ToastrService, private http: HttpClient, private router: Router) {

   }
   
   isUserAuth() {
     return this.AuthSvc.isUserAuthorized();
   }

  ngOnInit(): void {
   
    
  }

  logout() {
    let email = localStorage.getItem("email");
    let token = localStorage.getItem("token");
     this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'logout',{"email":email, "token":token}).subscribe(
         (response) => {
           if(response.status === 200) {
            this.toastr.success("Successfully logged out!");
            localStorage.removeItem("email")
            localStorage.removeItem("token")

this.router.navigate(['/login'])

           }
           else {
             this.toastr.error("Something went wrong")
           }
         }
       );
  }

}
