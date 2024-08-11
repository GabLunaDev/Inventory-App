import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { QueryProduct } from '../../models/query-product.model';
import { DialogMessageComponent } from '../../../../shared/components/dialog-message.component';
import { ApiResponse } from '../../../../shared/models/api-response.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filter: QueryProduct = new QueryProduct();

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadProducts(true);
  }

  loadProducts(showMessage: boolean): void {
    this.productService.getProducts(this.filter).subscribe(
      (response: ApiResponse<Product[]>) => {
        this.products = response.data || [];
        this.showDialogMessage(showMessage, response.message);
      },
      (error) => {
        this.showDialogMessage(true, error.error.message);
      }
    );
  }

  applyFilters(): void {
    this.loadProducts(true);
  }

  clearFilters(): void {
    this.filter = new QueryProduct();
    this.loadProducts(true);
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.closed) {
        this.showDialogMessage(true, result.message);
        this.loadProducts(false);
      }
    });
  }

  openUpdateProductDialog(id: string): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: { isEdit: true, productId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.closed) {
        this.showDialogMessage(true, result.message);
        this.loadProducts(false);
      }
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(
        (product) => product.product_id !== id
      );
      this.loadProducts(false);
    });
  }

  private showDialogMessage(showMessage: boolean, message?: string): void {
    if (showMessage) {
      this.dialog.open(DialogMessageComponent, {
        data: { message },
        panelClass: 'no-padding-dialog',
      });
    }
  }
}
