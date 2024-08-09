import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepositoryInterface } from './interfaces/product-repository.interface';
import { UpdateProductDto } from './dto/update-product.dto';
import { QueryProductDto } from './dto/query-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepositoryInterface')
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      if (!createProductDto.name) {
        throw new BadRequestException(`name is required`);
      }

      const productNameAlreadyExists = await this.productRepository.findOne({
        name: createProductDto.name,
      });

      if (productNameAlreadyExists) {
        throw new ConflictException(
          'Already exists a product with the same name.',
        );
      }

      return await this.productRepository.create(createProductDto);
    } catch (error) {
      throw error;
    }
  }

  async findAll(query: QueryProductDto): Promise<Product[]> {
    try {
      return await this.productRepository.findAll(query);
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const product = await this.productRepository.findById(id);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<void> {
    try {
      const productExists = await this.productRepository.findById(id);

      if (!productExists) {
        throw new NotFoundException('Product not found');
      }

      if (productExists.name !== updateProductDto.name) {
        const productNameAlreadyExists = await this.productRepository.findOne({
          name: updateProductDto.name,
        });

        if (productNameAlreadyExists) {
          throw new ConflictException(
            'Already exists a product with the same name.',
          );
        }
      }

      await this.productRepository.update(id, updateProductDto);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const productExists = await this.productRepository.findById(id);

      if (!productExists) {
        throw new NotFoundException('Product not found');
      }

      await this.productRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
