
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
    return false;
  }

}
