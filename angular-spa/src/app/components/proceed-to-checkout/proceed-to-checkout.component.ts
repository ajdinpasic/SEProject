import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalHttpsCaller } from 'src/app/helpers/global.https';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-proceed-to-checkout',
  templateUrl: './proceed-to-checkout.component.html',
  styleUrls: ['./proceed-to-checkout.component.css']
})
export class ProceedToCheckoutComponent implements OnInit {

  total: number = 0
  shipping: number = 10
  subtotal: number = 0
  products: any;

  constructor(private http: HttpClient,private cartSvc: CartService,private authSvc: AuthService) { }

  ngOnInit(): void {
    let user_id = this.authSvc.getUserIdAuth();
    this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'cart',{"user_id":user_id}).subscribe(
      (response:any) => {
        console.log(response)
          this.products = response;
          this.products.forEach(element => {
            this.subtotal= this.subtotal + (element.current_quantity * element.price);
          });
          this.total = this.shipping + this.subtotal
      }
    );

    //
    this.cartSvc.changeCartSummary.subscribe(
     
      () => {
        this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'cart',{"user_id":user_id}).subscribe(
      (response:any) => {
        console.log(response)
          this.products = response;
          this.total = 0;
          this.subtotal = 0;
          this.products.forEach(element => {
            this.subtotal= this.subtotal + (element.current_quantity * element.price);
          });
          this.total = this.shipping + this.subtotal
      }
    );
      }
    )
      
  }

}
