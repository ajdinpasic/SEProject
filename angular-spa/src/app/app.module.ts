import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { LogoHeaderComponent } from './components/logo-header/logo-header.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FiltersComponent } from './components/filters/filters.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductListService } from './services/product-list.service';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartService } from './services/cart.service';
import { ProceedToCheckoutComponent } from './components/proceed-to-checkout/proceed-to-checkout.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LogoHeaderComponent,
    NavigationComponent,
    FiltersComponent,
    ProductListComponent,
    FooterComponent,
    CartComponent,
    CheckoutComponent,
    ProductDetailComponent,
    ProceedToCheckoutComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [ProductListService,CartService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
