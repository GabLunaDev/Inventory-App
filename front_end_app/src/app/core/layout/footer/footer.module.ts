import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './components/footer.component';

@NgModule({
  declarations: [FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [FooterComponent]
})
export class FooterModule {}
