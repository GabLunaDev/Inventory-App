import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { BatchService } from '../../services/batch.service';
import { Batch } from '../../models/batch.model';
import { Product } from '../../../product/models/product.model';
import { ProductService } from '../../../product/services/product.service';
import { ApiResponse } from '../../../../shared/models/api-response.model';
import { DialogMessageComponent } from '../../../../shared/components/dialog-message.component';

@Component({
  selector: 'app-batch-form',
  templateUrl: './batch-form.component.html',
  styleUrls: ['./batch-form.component.scss'],
})
export class BatchFormComponent implements OnInit {
  batchForm!: FormGroup;
  isEdit = false;
  products: Product[] = [];
  batchId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private batchService: BatchService,
    private productService: ProductService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<BatchFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; batchId?: string }
  ) {}

  ngOnInit(): void {
    this.batchForm = this.fb.group({
      batch_code: ['', Validators.required],
      expiry_date: ['', Validators.required],
      quantity: ['', Validators.required],
      product_id: ['', Validators.required],
    });

    this.productService.getProducts().subscribe(
      (response: ApiResponse<Product[]>) => {
        this.products = response.data || [];
      },
      (error) => {
        this.dialog.open(DialogMessageComponent, {
          data: { message: 'Error fetching products' },
          panelClass: 'no-padding-dialog',
        });
      }
    );

    if (this.data.isEdit && this.data.batchId) {
      this.isEdit = this.data.isEdit;
      this.batchId = this.data.batchId;
      this.batchService
        .getBatchById(this.data.batchId)
        .subscribe((response: ApiResponse<Batch>) => {
          this.batchForm.patchValue({
            batch_code: response.data?.batch_code,
            expiry_date: response.data?.expiry_date,
            quantity: response.data?.quantity,
          });
        });
    }
  }

  saveBatch(): void {
    if (this.batchForm.valid) {
      const batch: Batch = this.batchForm.value;

      if (this.isEdit && this.batchId) {
        this.batchService.updateBatch(this.batchId, batch).subscribe(
          (response: ApiResponse<Batch>) => {
            this.dialogRef.close({ closed: true, message: response.message });
          },
          (error) => {
            this.dialog.open(DialogMessageComponent, {
              data: { message: error.error.message },
              panelClass: 'no-padding-dialog',
            });
          }
        );
      } else {
        this.batchService.createBatch(batch).subscribe(
          (response: ApiResponse<Batch>) => {
            this.dialogRef.close({ closed: true, message: response.message });
          },
          (error) => {
            this.dialog.open(DialogMessageComponent, {
              data: { message: error.error.message },
              panelClass: 'no-padding-dialog',
            });
          }
        );
      }
    }
  }
}
