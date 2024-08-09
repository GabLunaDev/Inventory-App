import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Res,
  HttpStatus,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { Response } from 'express';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      const productCreated = await this.productService.create(createProductDto);

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Product created successfully',
        data: productCreated,
      });
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll(
    @Res() res: Response,
    @Query() query: QueryProductDto,
  ) {
    try {
      const products = await this.productService.findAll(query);

      const message = products.length ? "Products listed successfully" : "No products found.";

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: message,
        data: products
      });
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findById(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const products = await this.productService.findById(id);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: "Product found",
        data: products
      });
    } catch (error) {
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const products = await this.productService.update(id, updateProductDto);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Product updated successfully',
        data: products
      });
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async delete(
    @Res() res: Response,
    @Param('id') id: string,
  ) {
    try {
      const products = await this.productService.delete(id);

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Product deleted successfully',
        data: products
      });
    } catch (error) {
      throw error;
    }
  }
}
