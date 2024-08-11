import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { heroPencil, heroTrash } from '@ng-icons/heroicons/outline';
import { BatchFormComponent } from './components/batch-form/batch-form.component';
import { BatchListComponent } from './components/batch-list/batch-list.component';
import { BatchService } from './services/batch.service';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    BatchFormComponent,
    BatchListComponent
  ],
  providers:[BatchService],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    NgIconsModule.withIcons({ heroPencil, heroTrash })
  ]
})
export class BatchModule { }
