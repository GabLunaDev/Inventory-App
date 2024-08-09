import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Batch } from './entities/batch.entity';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { BatchRepository } from './repositories/batch.repository';
import { ProductRepository } from '../product/repositories/product.repository';
import { Product } from '../product/entities/product.entity';

@Module({
  imports: [SequelizeModule.forFeature([Batch, Product])],
  controllers: [BatchController],
  providers: [
    BatchService,
    { provide: 'BatchRepositoryInterface', useClass: BatchRepository },
    { provide: 'ProductRepositoryInterface', useClass: ProductRepository }
  ],
})
export class BatchModule {}