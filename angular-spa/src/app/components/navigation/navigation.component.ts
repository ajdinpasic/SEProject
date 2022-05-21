import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationServiceService } from 'src/app/services/navigation-service.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

   categories: any;
  constructor(private AuthSvc: AuthService, private navSvc: NavigationServiceService,private toastr: ToastrService) {

   }
   
   isUserAuth() {
     return this.AuthSvc.isUserAuthorized();
   }

  ngOnInit(): void {
    this.navSvc.getAllCategories().subscribe({
      next: (response:any) => 
      this.categories = response,
      error: (err) => this.toastr.error('No categories to display')
    });
    
  }

}
