import { HttpParams } from "@angular/common/http";

export class QueryBatch {
  batch_code?: string;
  expiry_date?: string;
  product_id?: string;
  created_at?: Date;

  toHttpParams(): HttpParams {
    let params = new HttpParams();

    if (this.batch_code) {
      params = params.set('batch_code', this.batch_code);
    }
    if (this.expiry_date) {
      params = params.set('expiry_date', this.expiry_date);
    }
    if (this.product_id) {
      params = params.set('product_id', this.product_id);
    }
    if (this.created_at) {
      params = params.set('created_at', this.created_at.toISOString());
    }

    return params;
  }
}
