import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalHttpsCaller } from 'src/app/helpers/global.https';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registerForm: FormGroup
  emailModel : string;
  passwordModel : string;
  firstNameModel: string;
  lastNameModel: string;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
     this.registerForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9]*')]),
      firstname: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(15)]),
      lastname: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z]*'),Validators.maxLength(15)])
    });
  }

  onSubmit(form: FormGroup) {
    	  this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'register',{"first_name":this.firstNameModel, "last_name":this.lastNameModel, "email":this.emailModel, "password":this.passwordModel}).subscribe(
         (response) => {
           console.log("aaa: "+JSON.stringify(response));
           if(response.status === 200) {
            this.toastr.success("Account created! You can login now!");
           setTimeout(() => {
  this.router.navigate(['/login']);

}, 1500);
           } else if(response.status === 400) {
             this.toastr.error("User with this email already exists!")
           }
           else {
             this.toastr.error("Something went wrong")
           }
         }
       );
  }

}
