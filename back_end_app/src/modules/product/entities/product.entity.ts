import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Batch } from 'src/modules/batch/entities/batch.entity';

@Table({ tableName: 'product', timestamps: true, freezeTableName: true, underscored: true })
export class Product extends Model {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.UUID(),
    defaultValue: DataType.UUIDV4(),
  })
  product_id: string;

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
