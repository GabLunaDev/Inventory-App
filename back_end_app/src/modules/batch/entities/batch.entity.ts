import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Product } from 'src/modules/product/entities/product.entity';

@Table({
  tableName: 'batch',
  timestamps: true,
  freezeTableName: true,
  underscored: true,
})
export class Batch extends Model {
  @PrimaryKey
  @Column({
    allowNull: false,
    type: DataType.UUID(),
    defaultValue: DataType.UUIDV4(),
  })
  batch_id: string;

  @Column({
    type: DataType.STRING(15),
    allowNull: false,
    unique: true,
  })
  batch_code: string;

  @Column({
    type: DataType.DATEONLY(),
    allowNull: false,
  })
  expiry_date: string;

  @Column({
    type: DataType.INTEGER(),
    allowNull: false,
  })
  quantity: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.UUID(),
    allowNull: false,
  })
  product_id: string;

  @BelongsTo(() => Product)
  product?: Product;
}
