import { Batch } from "../../batch/models/batch.model";

export interface Product {
    product_id: string;
    code: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    batches?: Batch[];
  }