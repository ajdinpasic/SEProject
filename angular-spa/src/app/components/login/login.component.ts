import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GlobalHttpsCaller } from 'src/app/helpers/global.https';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  emailModel : string;
  passwordModel : string;
  firstNameModel: string;
  lastNameModel: string;

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
     this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(8),Validators.maxLength(10),Validators.pattern('[a-zA-Z0-9]*')])
    });
  }

  onSubmit(form: FormGroup) {
    	console.log(form)
     
  }

}
