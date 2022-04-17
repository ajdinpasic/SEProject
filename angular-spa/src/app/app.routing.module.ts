import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LogoHeaderComponent } from "./components/logo-header/logo-header.component";

const routes: Routes = [
  { path: '',   redirectTo: '/products', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'products', component: LogoHeaderComponent }
//   { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }