import { Product } from '../../product/models/product.model';

export interface Batch {
  batch_id: string;
  batch_code: string;
  expiry_date: string;
  quantity: number;
  product_id: string;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
}
