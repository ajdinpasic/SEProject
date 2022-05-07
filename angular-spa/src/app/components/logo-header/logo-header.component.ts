import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logo-header',
  templateUrl: './logo-header.component.html',
  styleUrls: ['./logo-header.component.css']
})
export class LogoHeaderComponent implements OnInit {

  count: number;

  constructor(private cartSvc: CartService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.count = this.cartSvc.countCartItems();
    this.cartSvc.cartUpdated.subscribe(
      (data: boolean) => {
        if(data) {
          this.count++
          this.toastr.success('Product added to your cart!');
        }
        else {
          this.toastr.error('Product quantity out of range!');
        }
        
      }
    )
  }

}
