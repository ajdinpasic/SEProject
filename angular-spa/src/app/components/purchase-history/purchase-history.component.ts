import { Component, OnInit } from '@angular/core';
import { PurchaseService } from 'src/app/services/purchase.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  purchasedProducts: any[] = []
  individualOrders: any[] = []
  purchasedProductsFinal: any[] = []
  individualOrdersFinal: any[] = []
  constructor(private purchaseSvc: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseSvc.getPurchaseHistory().subscribe(
      (response) => {
       
        this.purchasedProducts = response;
        this.seperateProduct();
        this.finalizeOrders();
        this.finalizeSeperate();
      }
    )
  }
  seperateProduct() {
    
    this.purchasedProducts.forEach(element => {
      this.individualOrders.push({"name":element.name,"image":element.image})
    })
   
  }

  finalizeOrders() {
    this.purchasedProducts.forEach(element => {
      let found = this.purchasedProductsFinal.find(temp => temp.price_total == element.price_total)
       if(!found) {
        this.purchasedProductsFinal.push(element)
       }
    });
  }
  finalizeSeperate() {
    this.individualOrders.forEach(element => {
      let found = this.individualOrdersFinal.find(temp => temp.name == element.name); 
      if(!found) {
        this.individualOrdersFinal.push(element)
      }
    });
  }

}
