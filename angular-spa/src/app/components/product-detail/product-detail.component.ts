import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GlobalHttpsCaller } from 'src/app/helpers/global.https';
import { AuthService } from 'src/app/services/auth.service';
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
  reviews: any[];
  count: number;
  reviewForm: FormGroup;
  commentModel: string;
  constructor(private toastr: ToastrService, private productListSvc: ProductListService, private route: ActivatedRoute, private cartSvc: CartService, private http: HttpClient, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productListSvc.getProduct(this.id).subscribe({
      next: (response:any) => {
     
      this.product = response;},
      error: (err) => this.toastr.error('No product to display')
    });

    this.productListSvc.getReviewsForProduct().subscribe(
      (response) => {
        this.count = response.length;
        this.reviews = response;
      }
    )

    this.reviewForm = new FormGroup({
      comment: new FormControl('',[Validators.required,Validators.maxLength(30)])
    });

  }

  addItemToCartWithQuantity(product: Product) {
    this.cartSvc.addItemToCart(product,true,this.amountChoosen);
  }

  increase() {
    this.amountChoosen++;
  }

  decrease() {
    this.amountChoosen--;
  }

  onSubmit(reviewForm: any) {
    	if(!this.commentModel || this.commentModel == null) {
        this.toastr.error("Please enter all fields");
        return;
      }
    let rate;
    let id = this.authSvc.getUserIdAuth();
    var rawRates = document.getElementsByName('rating');
              
            for(let i = 0; i < rawRates.length; i++) {
              let temp = rawRates[i] as HTMLInputElement;
                if(temp.checked) {
                rate = temp.value; break;
            }}
      this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'addReview',{"description":this.commentModel, "grade":rate,"user_id":id,"product_id":this.id}).subscribe(
        (response) => {
          this.productListSvc.getReviewsForProduct().subscribe(
      (response) => {
        this.toastr.success("Your feedback is submited!")
        this.count = response.length;
        this.reviews = response;
      }
    )
        }
      )
  }


}
