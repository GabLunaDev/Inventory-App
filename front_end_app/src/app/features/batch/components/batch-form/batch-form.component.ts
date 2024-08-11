import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { BatchService } from '../../services/batch.service';
import { Batch } from '../../models/batch.model';
import { Product } from '../../../product/models/product.model';
import { ProductService } from '../../../product/services/product.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.batchForm = this.fb.group({
      batch_code: ['', Validators.required],
      expiry_date: ['', Validators.required],
      quantity: ['', Validators.required],
      product_id: ['', Validators.required],
    });

    this.productService.getProducts().subscribe(
      (response: any) => {
        this.products = response.data;
      },
      (error) => {
        console.error('Erro na requisição:', error);
      }
    );

    if (this.data && this.data.isEdit && this.data.batchId) {
      this.isEdit = this.data.isEdit;
      this.batchId = this.data.batchId;
      this.batchService
        .getBatchById(this.data.batchId)
        .subscribe((batch: Batch) => {
          this.batchForm.patchValue(batch);
        });
    }
  }

  saveBatch(): void {
    if (this.batchForm.valid) {
      const batch: Batch = this.batchForm.value;

      if (this.isEdit && this.batchId) {
        this.dialogRef.close(true);
      } else {
        this.batchService.createBatch(batch).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
