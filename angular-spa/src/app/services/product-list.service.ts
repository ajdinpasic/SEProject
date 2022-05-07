import { Injectable } from '@angular/core';
import { Product } from 'src/resources/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  static readonly apiRoot = "https"
  private products: Product[] = [
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

  getProduct(id: number) {
    return this.products.find(item => item.productId == id)
  }

  getAllProducts() {
    return this.products;
  }

  searchProduct(search: string) {
    console.log(search)
    if (search.length == 0 || !search) {return this.products}
    let result = this.products
    result = result.filter(item => item.name.toLowerCase().match(search.toLowerCase()))
    return result;
  }

  setProducts(value: any) {
    this.products = value
  }

  
}
