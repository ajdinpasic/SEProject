import { Injectable } from '@angular/core';
import { Product } from 'src/resources/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts: Product[] = [
    {"productId": 1,
    "name": 'T-shirt',
    "color": 'red',
    "size": 'Medium',
    "quantity": 1,
    "gender": 'string',
    "price": 500,
    "available": 'string',
    "subcategory": 'string',
    "image": 'https://cdn.shopify.com/s/files/1/0572/6479/9914/products/spod-1056591552-648-1_480x480@2x.png?v=1625958130',
    "description": 'string'},
    {"productId": 2,
    "name": 'Hoodie',
    "color": 'black',
    "size": 'Medium',
    "quantity": 0,
    "gender": 'string',
    "price": 100,
    "available": 'string',
    "subcategory": 'string',
    "image": 'https://cdn.shopify.com/s/files/1/0572/6479/9914/products/spod-1058480633-204-1_300x300.png?v=1644879571',
    "description": 'string'}
  ];
  
  constructor() { }

  getCartItems() {
    return this.cartProducts;
  }
}
