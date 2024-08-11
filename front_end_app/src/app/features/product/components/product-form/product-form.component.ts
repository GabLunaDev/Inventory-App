import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { DialogMessageComponent } from '../../../../shared/components/dialog-message.component';
import { ApiResponse } from '../../../../shared/models/api-response.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  isEdit = false;
  productId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { isEdit: boolean; productId?: string }
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
    });

    if (this.data && this.data.isEdit && this.data.productId) {
      this.isEdit = this.data.isEdit;
      this.productId = this.data.productId;
      this.productService
        .getProductById(this.data.productId)
        .subscribe((result: ApiResponse<Product>) => {
          this.productForm.patchValue({
            name: result?.data?.name,
          });
        });
    }
  }

  saveProduct(): void {
    if (!this.productForm.get('name')?.value) {
      this.dialog.open(DialogMessageComponent, {
        data: { message: 'The name field is required.' },
        panelClass: 'no-padding-dialog',
      });
      return;
    }

    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      if (this.isEdit && this.productId) {
        this.productService.updateProduct(this.productId, product).subscribe(
          (response: ApiResponse<Product>) => {
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
        this.productService.createProduct(product).subscribe(
          (response: ApiResponse<Product>) => {
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
