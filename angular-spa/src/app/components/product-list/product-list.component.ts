import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private productListSvc: ProductListService, private router: Router) { 
    
  }

  ngOnInit(): void {
    console.log("hit")
    this.products = this.productListSvc.getAllProducts();
  }


  visitProduct(id: number) {
    this.router.navigate(['/products',id])
  }
  onSearchChange(input: any ) {
    this.productSearch= input.value;
    this.products = this.productListSvc.searchProduct(input.value);
  }
}
