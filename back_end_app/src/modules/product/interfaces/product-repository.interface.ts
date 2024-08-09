import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { QueryProductDto } from '../dto/query-product.dto';

export interface ProductRepositoryInterface {
  create(createProductDto: CreateProductDto): Promise<Product>;

  findAll(query?: QueryProductDto): Promise<Product[]>;

  findOne(query?: QueryProductDto): Promise<Product | null>;

  findById(id: string): Promise<Product | null>;

  update(id: string, updateProductDto: UpdateProductDto): Promise<void>;
  
  delete(id: string): Promise<void>;
}