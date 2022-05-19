import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalHttpsCaller } from '../helpers/global.https';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { 
     this.http.get(GlobalHttpsCaller.apiRootProd+'search').subscribe((response:any) => {
      console.log(response)
    })
  }

  isUserAuthorized() {
    return true;
  }

}
