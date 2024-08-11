import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgIconsModule } from '@ng-icons/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductModule } from './features/product/product.module';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { HeaderModule } from './core/layout/header/header.module';
import { FooterModule } from './core/layout/footer/footer.module';
import { BatchModule } from './features/batch/batch.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    FooterModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule,
    ReactiveFormsModule,
    BatchModule,
    ProductModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true 
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
