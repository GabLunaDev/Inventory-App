import { HttpParams } from "@angular/common/http";

export class QueryProduct {
  code?: string;
  name?: string;
  created_at?: Date;
  sortOrder?: 'asc' | 'desc';

  toHttpParams(): HttpParams {
    let params = new HttpParams();

    if (this.code) {
      params = params.set('code', this.code);
    }
    if (this.name) {
      params = params.set('name', this.name);
    }
    if (this.created_at) {
      params = params.set('created_at', this.created_at.toISOString());
    }
    if (this.sortOrder) {
      params = params.set('sortOrder', this.sortOrder);
    }

    return params;
  }
}
