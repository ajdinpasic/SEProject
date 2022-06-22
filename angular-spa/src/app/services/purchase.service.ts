import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalHttpsCaller } from '../helpers/global.https';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  constructor(private http: HttpClient,private authSvc: AuthService) { }

  getPurchaseHistory() {
    let user_id = this.authSvc.getUserIdAuth();
    return this.http.post<any>(GlobalHttpsCaller.apiRootLocal+'getPurchaseHistory',{"user_id":user_id})
  }
}
