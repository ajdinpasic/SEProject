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
      email: new FormControl(this.emailModel,[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9]*')])
    });
  }

  onSubmit(form: FormGroup) {
    	if(!this.emailModel || this.emailModel == null || !this.passwordModel || this.passwordModel == null) {
        this.toastr.error("Please enter all fields");
        return;
      }
      this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'login',{"email":this.emailModel, "password":this.passwordModel}).subscribe(
         (response) => {
          
           if(response.status === 200) {
            
             this.authSvc.setTokenAuth(response.token);
            localStorage.setItem("email",response.email)
            localStorage.setItem("id",response.user_id)

setTimeout(() => {
  
this.toastr.success("Successfully logged in!");
}, 500); this.router.navigate(['/products']);


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
