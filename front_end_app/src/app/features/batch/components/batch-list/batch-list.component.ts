import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../../../../shared/components/dialog-message.component';
import { Batch } from '../../models/batch.model';
import { QueryBatch } from '../../models/query-batch.model';
import { BatchService } from '../../services/batch.service';
import { BatchFormComponent } from '../batch-form/batch-form.component';
import { ApiResponse } from '../../../../shared/models/api-response.model';

@Component({
  selector: 'app-batch-list',
  templateUrl: './batch-list.component.html',
  styleUrls: ['./batch-list.component.scss'],
})
export class BatchListComponent implements OnInit {
  batches: Batch[] = [];
  filter: QueryBatch = new QueryBatch();

  constructor(
    private batchService: BatchService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBatches();
  }

  loadBatches(): void {
    this.batchService.getBatches(this.filter).subscribe(
      (response: ApiResponse<Batch[]>) => {
        this.batches = response.data || [];
        this.dialog.open(DialogMessageComponent, {
          data: { message: response.message },
          panelClass: 'no-padding-dialog'
        });
      },
      (error) => {
        this.dialog.open(DialogMessageComponent, {
          data: { message: 'Error fetching batches' },
          panelClass: 'no-padding-dialog'
        });
      }
    );
  }

  applyFilters(): void {
    this.loadBatches();
  }

  clearFilters(): void {
    this.filter = new QueryBatch();
    this.loadBatches();
  }

  openCreateBatchDialog(): void {
    const dialogRef = this.dialog.open(BatchFormComponent, {
      width: '500px',
      data: { isEdit: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.closed) {
        this.dialog.open(DialogMessageComponent, {
          data: { message: result.message },
          panelClass: 'no-padding-dialog'
        });
        this.loadBatches();
      }
    });
  }

  openUpdateBatchDialog(id: string): void {
    const dialogRef = this.dialog.open(BatchFormComponent, {
      width: '500px',
      data: { isEdit: true, batchId: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.closed) {
        this.dialog.open(DialogMessageComponent, {
          data: { message: result.message },
          panelClass: 'no-padding-dialog'
        });
        this.loadBatches();
      }
    });
  }

  deleteBatch(id: string): void {
    this.batchService.deleteBatch(id).subscribe(() => {
      this.batches = this.batches.filter(
        (batch) => batch.batch_id !== id
      );
      this.applyFilters();
    });
  }
}
