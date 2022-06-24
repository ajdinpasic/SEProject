import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartAddedUtil } from 'src/app/helpers/cart.added.util';
import { FilterService } from 'src/app/services/filter.service';
import { LogoService } from 'src/app/services/logo.service';

@Component({
  selector: 'app-logo-header',
  templateUrl: './logo-header.component.html',
  styleUrls: ['./logo-header.component.css']
})
export class LogoHeaderComponent implements OnInit {

  count: number;
  keyWord: string = "";
  constructor(private cartSvc: CartService,private toastr: ToastrService, private filterSvc: FilterService, private logoSvc: LogoService) { }

  ngOnInit(): void {
    this.cartSvc.countCartItems().subscribe(
      (response) => {
        this.count = response;
      }
    );
    this.cartSvc.removedFromCartUpdateCounter.subscribe(
      (response) => {
         response.subscribe(
            (response) => {
              this.count = response;
            }
          );
      }
    )

    this.cartSvc.addedItemCartUpdateCounter.subscribe(
       (response) => {
         response.subscribe(
            (response) => {
              this.count = response;
            }
          );
      }
    )

    this.logoSvc.changeCartAfterPurchase.subscribe(
      (response) => {
         response.subscribe(
            (response) => {
              this.count = response;
            }
          );
      }
    )
   
  
  }
  doBigSearch() {
  
    if(this.keyWord.length === 0 || !this.keyWord || this.keyWord == null) {
      this.keyWord = null;
    }
    
    let search = this.keyWord;
    this.filterSvc.filterProductsAsync(null,null,null,null,null,search);
  }
  public getSearch() {
    return this.keyWord;
  }

}
