import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batch } from '../models/batch.model';
import { QueryBatch } from '../models/query-batch.model';
import { ApiResponse } from '../../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private basePath = "batches";

  constructor(private http: HttpClient) {}

  createBatch(batch: Batch): Observable<ApiResponse<Batch>> {
    return this.http.post<ApiResponse<Batch>>(`${this.basePath}`, batch);
  }

  getBatches(queryParams?: QueryBatch): Observable<ApiResponse<Batch[]>> {
    let params = new HttpParams();
    if (queryParams) {
      if (queryParams.batch_code) params = params.set('batch_code', queryParams.batch_code);
      if (queryParams.expiry_date) params = params.set('expiry_date', queryParams.expiry_date);
      if (queryParams.product_id) params = params.set('product_id', queryParams.product_id);
      if (queryParams.created_at) params = params.set('created_at', new Date(queryParams.created_at).toISOString());
    }
    
    return this.http.get<ApiResponse<Batch[]>>(`${this.basePath}`, { params });
  }

  getBatchById(id: string): Observable<ApiResponse<Batch>> {
    return this.http.get<ApiResponse<Batch>>(`${this.basePath}/${id}`);
  }

  updateBatch(id: string, batch: Batch): Observable<ApiResponse<Batch>> {
    return this.http.put<ApiResponse<Batch>>(`${this.basePath}/${id}`, batch);
  }

  deleteBatch(id: string): Observable<ApiResponse<Batch>> {
    return this.http.delete<ApiResponse<Batch>>(`${this.basePath}/${id}`);
  }
}
