import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';
import { QueryProduct } from '../../models/query-product.model';
import { DialogMessageComponent } from '../../../../shared/components/dialog-message.component';

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
    this.loadProducts();
    this.dialog.open(DialogMessageComponent, {
      data: { message: "Products listed successfully" },
      panelClass: 'no-padding-dialog',
      disableClose: true
    });
  }

  loadProducts(): void {
    this.productService.getProducts(this.filter).subscribe(
      (response: any) => {
        this.products = response.data;
      },
      (error) => {
        console.error('Erro na requisição:', error);
      }
    );
  }

  applyFilters(): void {
    this.loadProducts();
  }

  clearFilters(): void {
    this.filter = new QueryProduct();
    this.loadProducts();
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  openUpdateProductDialog(id: string): void {
    const dialogRef = this.dialog.open(ProductFormComponent, {
      width: '500px',
      data: { isEdit: true, productId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts();
      }
    });
  }

  deleteProduct(id: string): void {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(
        (product) => product.product_id !== id
      );
      this.applyFilters();
    });
  }
}
