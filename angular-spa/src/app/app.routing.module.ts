import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { ProductListComponent } from "./components/product-list/product-list.component";

const routes: Routes = [
  { path: '',   redirectTo: '/products', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'products', component: ProductListComponent },
  {path: 'cart', component: CartComponent},
  {path: 'checkout', component: CheckoutComponent}
//   { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }