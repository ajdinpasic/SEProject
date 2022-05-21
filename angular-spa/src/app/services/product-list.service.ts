import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/resources/models/product.model';
import { GlobalHttpsCaller } from '../helpers/global.https';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private products: Product[];

  constructor(private http: HttpClient) { }

  getProduct(id: number) {
    return this.products.find(item => item.productId == id)
  }

  getAllProducts(): Observable<any> {
    
  return this.http.get<any>(GlobalHttpsCaller.apiRootProd+'search')
  }
  
}
