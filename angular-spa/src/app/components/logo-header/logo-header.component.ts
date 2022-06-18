import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CartAddedUtil } from 'src/app/helpers/cart.added.util';

@Component({
  selector: 'app-logo-header',
  templateUrl: './logo-header.component.html',
  styleUrls: ['./logo-header.component.css']
})
export class LogoHeaderComponent implements OnInit {

  count: number;

  constructor(private cartSvc: CartService,private toastr: ToastrService) { }

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
   
    // this.cartSvc.addedToCart.subscribe(
    //   (data: boolean) => {
    //     if(data) {
    //       this.count++
    //       this.toastr.success('Product added to your cart!');
    //     }
    //     else {
    //       this.toastr.error('Product quantity out of range!');
    //     }
        
    //   }
    // )

    // this.cartSvc.removedFromCart.subscribe((data: any) => {
    //   this.count--;
    //   // this.toastr.warning('Product removed from your cart!');
    // })

    // this.cartSvc.addedToCartWithQuantity.subscribe((data: CartAddedUtil)=> {
    //   this.count+= data.count
    // })
  }

}
