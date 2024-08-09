import { OmitType } from '@nestjs/mapped-types';
import { CreateBatchDto } from './create-batch.dto';

export class UpdateBatchDto extends OmitType(CreateBatchDto, [] as const) {}
