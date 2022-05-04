import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/resources/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Product[];

  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
    this.cartProducts = this.cartSvc.getCartItems();
    console.log(this.cartProducts);
  }

}
