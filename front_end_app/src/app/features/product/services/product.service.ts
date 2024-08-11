import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { QueryProduct } from '../models/query-product.model';
import { DialogMessageComponent } from '../../../shared/components/dialog-message.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basePath = "products";

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.basePath}`, product);
  }

  getProducts(queryParams?: QueryProduct): Observable<Product[]> {
    let params = new HttpParams();
    if (queryParams) {
      if (queryParams.code) params = params.set('code', queryParams.code);
      if (queryParams.name) params = params.set('name', queryParams.name);
      if (queryParams.created_at) params = params.set('created_at', queryParams.created_at.toISOString());
      if (queryParams.sortOrder) params = params.set('sortOrder', queryParams.sortOrder);
    }
    
    return this.http.get<Product[]>(`${this.basePath}`, { params });
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.basePath}/${id}`);
  }

  updateProduct(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.basePath}/${id}`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.basePath}/${id}`);
  }
}
