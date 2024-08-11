import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { QueryProduct } from '../models/query-product.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private basePath = "products";

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.basePath}`, product);
  }

  getProducts(queryParams?: QueryProduct): Observable<ApiResponse<Product[]>> {
    let params = new HttpParams();
    
    if (queryParams) {
      if (queryParams.code) params = params.set('code', queryParams.code);
      if (queryParams.name) params = params.set('name', queryParams.name);
      if (queryParams.created_at) params = params.set('created_at', new Date(queryParams.created_at).toISOString());
    }
    
    return this.http.get<ApiResponse<Product[]>>(`${this.basePath}`, { params });
  }

  getProductById(id: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.basePath}/${id}`);
  }

  updateProduct(id: string, product: Product): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.basePath}/${id}`, product);
  }

  deleteProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.delete<ApiResponse<Product>>(`${this.basePath}/${id}`);
  }
}
