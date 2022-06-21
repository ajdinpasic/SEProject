import { Injectable, Output } from '@angular/core';
import { Product } from 'src/resources/models/product.model';
import { EventEmitter } from '@angular/core';
import { CartAddedUtil } from '../helpers/cart.added.util';
import { GlobalHttpsCaller } from '../helpers/global.https';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  @Output() addedToCart : EventEmitter<boolean> = new EventEmitter();
  @Output() removedFromCart : EventEmitter<any> = new EventEmitter();
  @Output() addedToCartWithQuantity : EventEmitter<CartAddedUtil> = new EventEmitter();
  @Output() removedFromCartUpdateCounter : EventEmitter<any> = new EventEmitter();
   @Output() addedItemCartUpdateCounter : EventEmitter<any> = new EventEmitter();
  @Output() changeCartSummary  : EventEmitter<any> = new EventEmitter();
  count: number = 0;
  cartProducts: any[] = [];
  
  constructor(private http: HttpClient, private toastr: ToastrService, private authSvc: AuthService) { }

  getCartItems() {
     let user_id = this.authSvc.getUserIdAuth();
    return this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'cart',{"user_id":user_id});
  }

  addItemToCart(product: Product) {
    let user_id = this.authSvc.getUserIdAuth();

  this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'addProduct',{"current_quantity":1,"product_id":product.product_id,"user_id":user_id}).subscribe(
     (response) => {
       console.log(response)
       if(response.status === 200 || response.status === 201) {
         this.toastr.success("Product added to your cart!");
        this.addedItemCartUpdateCounter.emit(this.countCartItems());
       } else {
         this.toastr.error("Something went wrong")
       }
     }
  )
  }

  countCartItems() {
     let user_id = this.authSvc.getUserIdAuth();
    return this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'countCart',{"user_id":user_id});
  }

  removeItem(item: any) {
    this.http.delete(GlobalHttpsCaller.apiRootLocal+'deleteProduct/'+item).subscribe( (response) => {
       
       if(response === item) {
        this.toastr.warning("Product deleted from your cart!");
        this.getCartItems().subscribe(
          (response) => {
            this.cartProducts = response;
            this.removedFromCart.emit(this.cartProducts)
            this.removedFromCartUpdateCounter.emit(this.countCartItems());
            this.changeCartSummary.emit();
          }
        )
       
      }
      else {
        this.toastr.error("Something went wrong")
      }
    })
   
  }

  addItemToCartWithQuantity(product: Product, amount: number) {
    // product.quantity = amount;
    // this.cartProducts.push(product)
    //  this.addedToCartWithQuantity.emit(new CartAddedUtil(this.cartProducts,amount));
  }
}
