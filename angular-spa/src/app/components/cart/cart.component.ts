import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartAddedUtil } from 'src/app/helpers/cart.added.util';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/resources/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: any[];
  constructor(private cartSvc: CartService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cartSvc.getCartItems().subscribe({
      next: (response:any[]) => {
      this.cartProducts = response;
      },
      error: (err) => this.toastr.error('Something went wrong!')
    });
    this.cartSvc.removedFromCart.subscribe((data: any) => {
      this.cartProducts = data
    })

    this.cartSvc.addedToCartWithQuantity.subscribe((data: CartAddedUtil)=> {
      this.cartProducts = data.products
    })
  }

  removeItem(item: any) {
    this.cartSvc.removeItem(item.cart_id);
  }

}
