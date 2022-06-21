import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { GlobalHttpsCaller } from '../helpers/global.https';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  @Output() filtersApplied : EventEmitter<any> = new EventEmitter();
  subcategory: string;
  color: string;
  price: string;
  order: string;
  size: string;

  constructor(private http: HttpClient) { }

  filterProductsAsync(subcategory,price,color,size,order,search) {
   this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'filter',{"subcategory":subcategory,"price":price,"color":color,"size":size,"order":order,"name":search}).subscribe(
            (response) => {
              this.filtersApplied.emit(response)
            }
           )
}
    setSubCategory(value) {
      this.subcategory = value
    }
    setSize(value) {
      this.size = value;
    }
    setColor(value) {
      this.color = value
    }
    setPrice(value) {
      this.price = value
    }
    setOrder(value) {
      this.order = value
    }

    getSubCategory() {
      return this.subcategory
    }
    getSize() {
      return this.size
    }
    getColor() {
      return this.color
    }
    getPrice() {
      return this.price
    }
    getOrder() {
      return this.order
    }
}


