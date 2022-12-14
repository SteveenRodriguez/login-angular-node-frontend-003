import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private readonly http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/products';
  }

  getProducts(): Observable<Product[]> {

    // const token = localStorage.getItem('token');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)

    return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
}
