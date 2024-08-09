export class CreateBatchDto {
    readonly batch_code: string;
    readonly expiry_date: string;
    readonly quantity: number;
    readonly product_id: string;
}