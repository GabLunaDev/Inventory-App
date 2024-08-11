import {
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Batch } from 'src/modules/batch/entities/batch.entity';

@Table({ tableName: 'product', timestamps: true, freezeTableName: true, underscored: true })
export class Product extends Model {
  @PrimaryKey
  @Index('idx_product_product_id')
  @Column({
    allowNull: false,
    type: DataType.UUID(),
    defaultValue: DataType.UUIDV4(),
  })
  product_id: string;

  @Column({
    type: DataType.BIGINT(),
    allowNull: false,
    autoIncrement: true,
    unique: true
  })
  code: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true
  })
  name: string;

  @HasMany(() => Batch,{
    onDelete: 'CASCADE', 
    foreignKey: 'product_id'
  })
  batches?: Batch[];
}
