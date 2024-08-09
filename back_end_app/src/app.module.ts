import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { BatchModule } from './modules/batch/batch.module';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    DatabaseModule,
    ProductModule,
    BatchModule
  ],
})
export class AppModule {}
