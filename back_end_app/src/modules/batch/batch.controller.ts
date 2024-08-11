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
  import { Response } from 'express';
import { BatchService } from './batch.service';
import { CreateBatchDto } from './dto/create-batch.dto';
import { QueryBatchDto } from './dto/query-batch.dto';
import { UpdateBatchDto } from './dto/update-batch.dto';
  
  @Controller('batches')
  export class BatchController {
    constructor(private readonly batchService: BatchService) {}
  
    @Post()
    async create(
      @Res() res: Response,
      @Body() createBatchDto: CreateBatchDto,
    ) {
      try {
        const batchCreated = await this.batchService.create(createBatchDto);
  
        return res.status(HttpStatus.CREATED).json({
          statusCode: HttpStatus.CREATED,
          message: 'Batch created successfully',
          data: batchCreated,
        });
      } catch (error) {
        throw error;
      }
    }
  
    @Get()
    async findAll(
      @Res() res: Response,
      @Query() query: QueryBatchDto,
    ) {
      try {
        const batchs = await this.batchService.findAll(query);
  
        const message = batchs.length ? "Batchs listed successfully" : "No batchs found.";
  
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: message,
          data: batchs
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
        const batchs = await this.batchService.findById(id);
  
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: "Batch found",
          data: batchs
        });
      } catch (error) {
        throw error;
      }
    }
  
    @Put(':id')
    async update(
      @Res() res: Response,
      @Param('id') id: string,
      @Body() updateBatchDto: UpdateBatchDto,
    ) {
      try {
        const batchs = await this.batchService.update(id, updateBatchDto);
  
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: 'Batch updated successfully',
          data: batchs
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
        const batchs = await this.batchService.delete(id);
  
        return res.status(HttpStatus.OK).json({
          statusCode: HttpStatus.OK,
          message: 'Batchs deleted successfully',
          data: batchs
        });
      } catch (error) {
        throw error;
      }
    }
  }
  