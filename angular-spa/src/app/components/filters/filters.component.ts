import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalHttpsCaller } from 'src/app/helpers/global.https';
import { FilterService } from 'src/app/services/filter.service';
import { LogoHeaderComponent } from '../logo-header/logo-header.component';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  subCategory: any[];
  constructor(private http: HttpClient, private filtersSvc: FilterService) { }

  ngOnInit(): void {
    
   this.http.get<any>(GlobalHttpsCaller.apiRootLocal+'subcategory',{}).subscribe(
    (response) => {
      console.log(response)
      this.subCategory = response;
    }
   )
  
  }

  filterChanged() {
    var subcategory = null;
    var color = null;
    var size = null;
    var price = null; 
    var order = null;
     var rawSub= document.getElementsByName('subcategory');
      var rawPrice= document.getElementsByName('price');
       var rawSize= document.getElementsByName('size');
        var rawColor= document.getElementsByName('color');
         var rawOrder= document.getElementsByName('order');
              
            for(let i = 0; i < rawSub.length; i++) {
              let temp = rawSub[i] as HTMLInputElement;
                if(temp.checked) {
                subcategory = temp.value; break;
            }}
            for(let i = 0; i < rawPrice.length; i++) {
              let temp = rawPrice[i] as HTMLInputElement;
                if(temp.checked) {
                price = temp.value; break;
            }}
            for(let i = 0; i < rawSize.length; i++) {
              let temp = rawSize[i] as HTMLInputElement;
                if(temp.checked) {
                size = temp.value; break;
            }}
            for(let i = 0; i < rawColor.length; i++) {
              let temp = rawColor[i] as HTMLInputElement;
                if(temp.checked) {
                color = temp.value; break;
            }}
            for(let i = 0; i < rawOrder.length; i++) {
              let temp = rawOrder[i] as HTMLInputElement;
                if(temp.checked) {
                order = temp.value; break;
            }}
            if(order === 'Ascending') {
              console.log("ovdje1")
              order=null;
            }
            if(subcategory === 'none') {
              subcategory = null;
               console.log("ovdje2")
            }
             if(color === 'none') {
              color = null;
               console.log("ovdje3")
            }
             if(order === 'none') {
              order = null;
               console.log("ovdje4")
            }
             if(size === 'none') {
              size = null;
               console.log("ovdje5")
            }
             if(price === 'none') {
              price = null;
               console.log("ovdje6")
            }
            this.filtersSvc.setColor(color);
            this.filtersSvc.setOrder(order);
            this.filtersSvc.setPrice(price);
            this.filtersSvc.setSubCategory(subcategory);
            this.filtersSvc.setSize(size);
            // let search;
            // if(search.length === 0 || search || search == null) {
            //    search = null;
            // }
            // console.log("ovo ovdje gledaj 33: "+search)
            this.filtersSvc.filterProductsAsync(subcategory,price,color,size,order,null)
          
  }

}
