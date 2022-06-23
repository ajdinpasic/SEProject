import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { FilterService } from 'src/app/services/filter.service';
import { ProductListService } from 'src/app/services/product-list.service';
import { Product } from 'src/resources/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[];
  productSearch: any;
  response: Product[];
  paginationPageNumber: number = 1;
  constructor(private productListSvc: ProductListService, private cartSvc: CartService, private router: Router, private toastr: ToastrService, private filtersSvc: FilterService) { 
    
  }

  ngOnInit(): void {
    // this.productListSvc.getAllProducts().subscribe((response:Product[]) => {
    //   // this.productListSvc.setProductsForSearch(response)
    //   this.products = response;
    //   this.response = response;
    // }) 
    this.filtersSvc.filtersApplied.subscribe(
      (response) => {
        this.products = response;
        this.response = response;
      }
    );
 -
    this.productListSvc.getAllProducts().subscribe({
      next: (response:Product[]) => {
      this.response = response;
      this.products = response},
      error: (err) => this.toastr.error('Something went wrong!')
    });
  }


  visitProduct(id: number) {
    this.router.navigate(['/products',id])
  }

  onSearchChange(input: any ) {
    this.productSearch= input.value;
    if (this.productSearch.length == 0 || !this.productSearch.length) {
      this.productSearch = null; 
      this.products = this.response
    } else {
      let result = this.response.filter(item => item.name.toLowerCase().match(this.productSearch.toLowerCase()))
      this.products = result;
    }
    
  }

  addToCart(product: Product) {
    this.cartSvc.addItemToCart(product);
  }
}
