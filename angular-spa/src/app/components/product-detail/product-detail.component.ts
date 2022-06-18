import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductListService } from 'src/app/services/product-list.service';
import { Product } from 'src/resources/models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  id: number;
  product: Product;
  amountChoosen: number = 1;

  constructor(private toastr: ToastrService, private productListSvc: ProductListService, private route: ActivatedRoute, private cartSvc: CartService) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productListSvc.getProduct(this.id).subscribe({
      next: (response:any) => {
        console.log(response);
      this.product = response;},
      error: (err) => this.toastr.error('No product to display')
    });
  }

  addItemToCartWithQuantity(product: Product) {
    this.cartSvc.addItemToCartWithQuantity(product,this.amountChoosen);
  }

  increase() {
    this.amountChoosen++;
  }

  decrease() {
    this.amountChoosen--;
  }

}
