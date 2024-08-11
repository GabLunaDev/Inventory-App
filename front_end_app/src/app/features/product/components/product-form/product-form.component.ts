import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product.model';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

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
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<ProductFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
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
        .subscribe((product: Product) => {
          this.productForm.patchValue(product);
        });
    }
  }

  saveProduct(): void {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;

      if (this.isEdit && this.productId) {
        this.dialogRef.close(true);
      } else {
        this.productService.createProduct(product).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }
}
