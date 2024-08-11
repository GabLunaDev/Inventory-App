import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './features/product/components/product-list/product-list.component';
import { ProductFormComponent } from './features/product/components/product-form/product-form.component';
import { BatchListComponent } from './features/batch/components/batch-list/batch-list.component';
import { BatchFormComponent } from './features/batch/components/batch-form/batch-form.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'batches', component: BatchListComponent },
  { path: 'batches/new', component: BatchFormComponent },
  { path: 'batches/edit/:id', component: BatchFormComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
