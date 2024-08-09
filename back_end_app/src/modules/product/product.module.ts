import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './entities/product.entity';
import { ProductRepository } from './repositories/product.repository';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [
    ProductService,
    { provide: 'ProductRepositoryInterface', useClass: ProductRepository },
  ],
})
export class ProductModule {}