import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { isDateInThePast } from 'src/common/functions/validateDate.function';
import { CreateBatchDto } from './dto/create-batch.dto';
import { BatchRepositoryInterface } from './interfaces/batch-repository.interface';
import { Batch } from './entities/batch.entity';
import { QueryBatchDto } from './dto/query-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { ProductRepositoryInterface } from '../product/interfaces/product-repository.interface';

@Injectable()
export class BatchService {
  constructor(
    @Inject('BatchRepositoryInterface')
    private readonly batchRepository: BatchRepositoryInterface,
    @Inject('ProductRepositoryInterface')
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    try {
      const requiredFields = [
        'batch_code',
        'quantity',
        'product_id',
        'expiry_date',
      ];

      for (const field of requiredFields) {
        if (!createBatchDto[field]) {
          throw new BadRequestException(
            `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
          );
        }
      }

      const productExists = await this.productRepository.findById(
        createBatchDto.product_id,
      );

      if (!productExists) {
        throw new NotFoundException('Product not found');
      }

      const batchCodeAlreadyExists = await this.batchRepository.findOne({
        batch_code: createBatchDto.batch_code,
      });

      if (batchCodeAlreadyExists) {
        throw new ConflictException(
          'Already exists a batch with the same name.',
        );
      }

      if (createBatchDto.quantity < 0) {
        throw new BadRequestException(`Quantity can't be negative.`);
      }

      if (isDateInThePast(createBatchDto.expiry_date)) {
        throw new BadRequestException(`Expiry date can't be in the past.`);
      }

      return await this.batchRepository.create(createBatchDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryBatchDto): Promise<Batch[]> {
    try {
      return await this.batchRepository.findAll(query);
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<Batch | null> {
    try {
      const batch = await this.batchRepository.findById(id);

      if (!batch) {
        throw new NotFoundException('Batch not found');
      }

      return batch;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateBatchDto: UpdateBatchDto): Promise<void> {
    try {
      const batchExists = await this.batchRepository.findById(id);

      if (!batchExists) {
        throw new NotFoundException('Batch not found');
      }

      if (batchExists.batch_code !== updateBatchDto.batch_code) {
        const batchNameAlreadyExists = await this.batchRepository.findOne({
          batch_code: updateBatchDto.batch_code,
        });

        if (batchNameAlreadyExists) {
          throw new ConflictException(
            'Already exists a batch with the same code.',
          );
        }
      }

      if(updateBatchDto.product_id){
        const productExists = await this.productRepository.findById(
          updateBatchDto.product_id,
        );
  
        if (!productExists) {
          throw new NotFoundException('Product not found');
        }
      }

      if (updateBatchDto.quantity < 0) {
        throw new BadRequestException(`Quantity can't be negative.`);
      }

      if (isDateInThePast(updateBatchDto.expiry_date)) {
        throw new BadRequestException(`Expiry date can't be in the past.`);
      }

      await this.batchRepository.update(id, updateBatchDto);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const batchExists = await this.batchRepository.findById(id);

      if (!batchExists) {
        throw new NotFoundException('Batch not found');
      }

      await this.batchRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
