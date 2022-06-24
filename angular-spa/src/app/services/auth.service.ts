
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    
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

  getUserIdAuth() {
    return localStorage.getItem("id");
  }

}
