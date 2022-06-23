import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalHttpsCaller } from '../helpers/global.https';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoService {

  search:string;
  totalPrice: number = 0;
  totalQuantity: number = 0;
  productsToBuy: any = [];
   @Output() changeCartAfterPurchase  : EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient,private authSvc: AuthService,private toastr: ToastrService,private router: Router) { }

  setSearch(value:string) {
    this.search = value;
  }
  getSearch() {
    return this.search
  }
/*
   if user buys this, delete cart, update counter, make an order and add product by product to that order

*/
  emptyCartAfter() {
    let user_id = this.authSvc.getUserIdAuth();
     this.http.delete<any>(GlobalHttpsCaller.apiRootLocal+'deleteCart/'+user_id).subscribe(
      (response) => {
         this.changeCartAfterPurchase.emit(this.countCartItems());
         this.toastr.success("Successful purchase!Thank you!");
      }
     )
     this.router.navigate(['/products']);
  }

  makeOrder() {
    if(this.productsToBuy.length === 0 ||this.productsToBuy == null) {
      this.toastr.error("Nothing to buy!")
      return;
    }
    this.toastr.info("Purchase is in process!Please wait.")
    let user_id = this.authSvc.getUserIdAuth();
    this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'purchase',{"price_total":this.totalPrice,"quantity_total":this.totalQuantity,"user_id":user_id}).subscribe(
      (response) => {
        let order_id = response.order_id;

          // this.purchaseProducts(order_id);
    //       this.productsToBuy.forEach(element => {
    //   console.log("vrace");
    //   this.http.post<any>(GlobalHttpsCaller.apiRootLocal+"purchase/item",{"product_order_item":order_id,"product_id":element.product_id,"quantity":element.current_quantity})
    // });
    this.productsToBuy.forEach(element => {
      this.purchaseProducts(order_id,element)
    })
          this.emptyCartAfter()
      }
     )
  }
   purchaseProducts(order_id,element) {
  //   console.log("bb: "+this.productsToBuy)
  //   this.productsToBuy.forEach(element => {
  //     console.log("vrace");
  //     this.http.post<any>(GlobalHttpsCaller.apiRootLocal+"purchase/item",{"product_order_item":order_id,"product_id":element.product_id,"quantity":element.current_quantity})
  //   });

     this.http.post<any>(GlobalHttpsCaller.apiRootLocal+"purchase/item",{"product_order_item":order_id,"product_id":element.product_id,"quantity":element.current_quantity}).subscribe(
      (response) => {
        
      }
     )
   }

  getCheckoutInfo() {
    
     let user_id = this.authSvc.getUserIdAuth();
    this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'cart',{"user_id":user_id}).subscribe(
        (response) => {
          console.log(response)
            this.prepareCheckout(response);
        }
    );
    
    
  }

  prepareCheckout(products) {
    let total = 0;
    let quantity = 0;
    this.productsToBuy = products;
    products.forEach(element => {

      total+=element.price;
      total*=element.current_quantity;
      quantity+=element.current_quantity;
      
    });
    this.totalPrice = total;
    this.totalQuantity = quantity;
  }
  countCartItems() {
     let user_id = this.authSvc.getUserIdAuth();
    return this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'countCart',{"user_id":user_id});
  }

  
}
