import { CreateBatchDto } from "../dto/create-batch.dto";
import { QueryBatchDto } from "../dto/query-batch.dto";
import { UpdateBatchDto } from "../dto/update-batch.dto";
import { Batch } from "../entities/batch.entity";

export interface BatchRepositoryInterface {
  create(createBatchDto: CreateBatchDto): Promise<Batch>;

  findAll(query?: QueryBatchDto): Promise<Batch[]>;

  findOne(query?: QueryBatchDto): Promise<Batch | null>;

  findById(id: string): Promise<Batch | null>;

  update(id: string, updateBatchDto: UpdateBatchDto): Promise<void>;
  
  delete(id: string): Promise<void>;
}