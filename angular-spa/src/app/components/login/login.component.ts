import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalHttpsCaller } from 'src/app/helpers/global.https';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  emailModel : string;
  passwordModel : string;

  constructor(private http: HttpClient, private toastr: ToastrService, private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
     this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9]*')])
    });
  }

  onSubmit(form: FormGroup) {
    	
      this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'login',{"email":this.emailModel, "password":this.passwordModel}).subscribe(
         (response) => {
           console.log("aaa: "+JSON.stringify(response));
           if(response.status === 200) {
            this.toastr.success("Successfully logged in!");
             this.authSvc.setTokenAuth(response.token);
            localStorage.setItem("email",response.email)

this.router.navigate(['/products'])

// this.router.navigate(['/products']);

           } else if(response.status === 400) {
             this.toastr.error("Wrong creditentials!")
           }
           else {
             this.toastr.error("Something went wrong")
           }
         }
       );
  }

}
