import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batch } from '../models/batch.model';
import { QueryBatch } from '../models/query-batch.model';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private basePath = "batches";

  constructor(private http: HttpClient) {}

  createBatch(batch: Batch): Observable<Batch> {
    return this.http.post<Batch>(`${this.basePath}`, batch);
  }

  getBatchs(queryParams?: QueryBatch): Observable<Batch[]> {
    let params = new HttpParams();
    if (queryParams) {
      if (queryParams.batch_code) params = params.set('batch_code', queryParams.batch_code);
      if (queryParams.expiry_date) params = params.set('expiry_date', queryParams.expiry_date);
      if (queryParams.product_id) params = params.set('product_id', queryParams.product_id);
      if (queryParams.created_at) params = params.set('created_at', queryParams.created_at.toISOString());
      if (queryParams.sortOrder) params = params.set('sortOrder', queryParams.sortOrder);
    }
    
    return this.http.get<Batch[]>(`${this.basePath}`, { params });
  }

  getBatchById(id: string): Observable<Batch> {
    return this.http.get<Batch>(`${this.basePath}/${id}`);
  }

  updateBatch(id: string, batch: Batch): Observable<Batch> {
    return this.http.put<Batch>(`${this.basePath}/${id}`, batch);
  }

  deleteBatch(id: string): Observable<Batch> {
    return this.http.delete<Batch>(`${this.basePath}/${id}`);
  }
}
