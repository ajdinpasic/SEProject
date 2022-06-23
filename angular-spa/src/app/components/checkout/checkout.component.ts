import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalHttpsCaller } from 'src/app/helpers/global.https';
import { AuthService } from 'src/app/services/auth.service';
import { LogoService } from 'src/app/services/logo.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutForm: FormGroup;
   city : string;
  country : string;
 zip : string;
   address : string;
  first : string;
   last : string;
   priceTotal: number = 0;
  quantityTotal : number = 0;
  constructor(private logoSvc: LogoService) { }

  ngOnInit(): void {
this.checkoutForm = new FormGroup({
      city: new FormControl('',[Validators.required,Validators.maxLength(20)]),
        country: new FormControl('',[Validators.required,Validators.maxLength(20)]),
           zip: new FormControl('',[Validators.required,Validators.maxLength(20),Validators.pattern(/^-?(0|[1-9]\d*)*?$/)]),
          address: new FormControl('',[Validators.required,Validators.maxLength(20)]),
           first: new FormControl('',[Validators.required,Validators.maxLength(20)]),
          last: new FormControl('',[Validators.required,Validators.maxLength(20)]),
           mobile: new FormControl('',[Validators.required,Validators.maxLength(20),Validators.pattern(/^-?(0|[1-9]\d*)*?$/)]),
    });
     this.logoSvc.getCheckoutInfo();
  }

  onSubmit() {
    this.logoSvc.makeOrder();
  }


}
