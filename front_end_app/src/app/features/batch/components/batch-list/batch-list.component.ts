import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../../../shared/components/dialog-message.component';
import { Batch } from '../../models/batch.model';
import { QueryBatch } from '../../models/query-batch.model';
import { BatchService } from '../../services/batch.service';
import { BatchFormComponent } from '../batch-form/batch-form.component';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss'],
})
export class BatchListComponent implements OnInit {
  batchs: Batch[] = [];
  filter: QueryBatch = new QueryBatch();

  constructor(
    private batchService: BatchService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBatchs();
    this.dialog.open(DialogMessageComponent, {
      data: { message: "Batchs listed successfully" },
      panelClass: 'no-padding-dialog',
      disableClose: true
    });
  }

  loadBatchs(): void {
    this.batchService.getBatchs(this.filter).subscribe(
      (response: any) => {
        this.batchs = response.data;
      },
      (error) => {
        console.error('Erro na requisição:', error);
      }
    );
  }

  applyFilters(): void {
    this.loadBatchs();
  }

  clearFilters(): void {
    this.filter = new QueryBatch();
    this.loadBatchs();
  }

  openCreateBatchDialog(): void {
    const dialogRef = this.dialog.open(BatchFormComponent, {
      width: '500px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBatchs();
      }
    });
  }

  openUpdateBatchDialog(id: string): void {
    const dialogRef = this.dialog.open(BatchFormComponent, {
      width: '500px',
      data: { isEdit: true, batchId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadBatchs();
      }
    });
  }

  deleteBatch(id: string): void {
    this.batchService.deleteBatch(id).subscribe(() => {
      this.batchs = this.batchs.filter(
        (batch) => batch.batch_id !== id
      );
      this.applyFilters();
    });
  }
}
