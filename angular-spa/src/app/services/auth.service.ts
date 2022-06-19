
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    //  this.http.get(GlobalHttpsCaller.apiRootProd+'search').subscribe((response:any) => {
    //   console.log(response)
    // })
  }

  isUserAuthorized() {
   let token = localStorage.getItem("token");
   if(token == null) {
    return false;
   }
    return true;
  }

  setTokenAuth(token:any) {
    localStorage.setItem("token",token)
  }

}
