import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductRepositoryInterface } from '../interfaces/product-repository.interface';
import { QueryProductDto } from '../dto/query-product.dto';
import { Op } from 'sequelize';

@Injectable()
export class ProductRepository implements ProductRepositoryInterface {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const { name } = createProductDto;

      return await this.productModel.create({ name });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error inserting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(filters?: QueryProductDto): Promise<Product[]> {
    const where: any = {};

    if (filters.name) where.name = { [Op.like]: `${filters.name}%` };
    if (filters.code) where.code = filters.code;
    if (filters.created_at) {
      const startDay = new Date(filters.created_at).setHours(0, 0, 0, 0);
      const endDay = new Date(filters.created_at).setHours(23, 59, 59, 999);

      where.created_at = {
        [Op.gte]: startDay,
        [Op.lte]: endDay
      };
    }

    try {
      return await this.productModel.findAll({ where });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error listing products',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(filters?: QueryProductDto): Promise<Product | null> {
    const where: any = {};

    if (filters.name) where.name = filters.name;

    try {
      return await this.productModel.findOne({ where });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error getting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      return this.productModel.findByPk(id);
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error getting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateProductDto: Partial<Product>): Promise<void> {
    try {
      await this.productModel.update(updateProductDto, {
        where: { product_id: id },
      });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error updating product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.productModel.destroy({ where: { product_id: id } });
    } catch (error) {
      console.error('Error details:', error);
      throw new HttpException(
        'Error deleting product',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
