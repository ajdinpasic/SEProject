import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalHttpsCaller } from '../helpers/global.https';

@Injectable({
  providedIn: 'root'
})
export class NavigationServiceService {

  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    
  return this.http.get<any>(GlobalHttpsCaller.apiRootProd+'subcategory')
  }
}
