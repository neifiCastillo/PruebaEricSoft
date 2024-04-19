import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Products } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private myAppUrl: string = environment.endpoint;
  private myApiUrl: string = 'api/Products/';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products[]>{
    return this.http.get<Products[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  putProducts(productNo: number , product: Products): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${productNo}`, product);
  }
}
