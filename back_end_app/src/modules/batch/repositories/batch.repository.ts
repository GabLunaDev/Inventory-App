import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Batch } from '../entities/batch.entity';
import { BatchRepositoryInterface } from '../interfaces/batch-repository.interface';
import { CreateBatchDto } from '../dto/create-batch.dto';
import { QueryBatchDto } from '../dto/query-batch.dto';
import { Product } from 'src/modules/product/entities/product.entity';

@Injectable()
export class BatchRepository implements BatchRepositoryInterface {
  constructor(
    @InjectModel(Batch)
    private BatchModel: typeof Batch,
  ) {}

  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    try {
      const { batch_code, expiry_date, quantity, product_id } = createBatchDto;

      return await this.BatchModel.create({
        batch_code,
        expiry_date,
        quantity,
        product_id,
      });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error inserting Batch',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(filters?: QueryBatchDto): Promise<Batch[]> {
    const where: any = {};

    if (filters.batch_code) where.batch_code = { [Op.like]: `${filters.batch_code}%` };
    if (filters.expiry_date) where.expiry_date = filters.expiry_date;
    if (filters.created_at) {
      const startDay = new Date(filters.created_at).setHours(0, 0, 0, 0);
      const endDay = new Date(filters.created_at).setHours(23, 59, 59, 999);

      where.created_at = {
        [Op.gte]: startDay,
        [Op.lte]: endDay
      };
    }


    try {
      return await this.BatchModel.findAll({
        where,
        include: [
          {
            model: Product,
            attributes: ['name'],
          },
        ],
      });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error listing Batchs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(filters?: QueryBatchDto): Promise<Batch | null> {
    const where: any = {};

    if (filters.batch_code) where.batch_code = filters.batch_code;

    try {
      return await this.BatchModel.findOne({ where });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error listing Batchs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<Batch | null> {
    try {
      return this.BatchModel.findByPk(id);
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error getting Batchs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateBatchDto: Partial<Batch>): Promise<void> {
    try {
      await this.BatchModel.update(updateBatchDto, { where: { batch_id: id } });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error updating Batchs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.BatchModel.destroy({ where: { batch_id: id } });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error deleting Batchs',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
