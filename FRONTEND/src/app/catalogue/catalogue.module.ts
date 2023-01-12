import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { CatalogueComponent } from "./catalogue/catalogue.component";
import { SearchComponent } from "./search/search.component";
import { FormsModule } from "@angular/forms";
import { ProductDetailComponent } from "./product-detail/product-detail.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiHttpInterceptor } from "../shared/api-http-interceptor";
import { CatalogueService } from "./services/catalogue.service";
import { NgxSpinnerModule } from "ngx-spinner";

const routes: Routes = [
  { path: '', component: CatalogueComponent },
  { path: 'product/:id', component: ProductDetailComponent }
];

@NgModule({
  declarations: [
    CatalogueComponent,
    SearchComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgxSpinnerModule,
  ],
  providers: [
    CatalogueService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    }
  ]
})
export class CatalogueModule { }
