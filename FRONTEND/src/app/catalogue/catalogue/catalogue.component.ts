import { Component, OnInit } from '@angular/core';
import { CatalogueService } from "../services/catalogue.service";
import { Product } from "../../shared/entities/product";
import { map } from "rxjs";
import { Store } from "@ngxs/store";
import { AddProduct } from "../../shared/actions/cart-action";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];
  query: string = '';
  category: string = '';

  constructor(
    private catalogueService: CatalogueService,
    private spinner: NgxSpinnerService,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.resetSearch();
  }

  addProductToCart(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

  onSearch(query: string) {
    this.query = query;
    this.handleSearch();
  }

  onCategoryChange(category: string) {
    this.category = category;
    this.handleSearch();
  }

  handleSearch() {
    this.spinner.show();
    this.catalogueService.getProducts().pipe(
      map(products  => products.filter(product => product.name.toLowerCase().includes(this.query.toLowerCase()))),
      map(products => products.filter(product => this.category ? product.category === this.category : true))
    )
    .subscribe(
      products => {
        this.products = products;
        this.spinner.hide();
      }
    );
  }

  OnReset() {
    this.resetSearch();
  }

  private resetSearch() {
    this.spinner.show();
    this.category = '';
    this.query = '';
    this.catalogueService.getProducts().subscribe(
      products => {
        this.products = products;
        this.spinner.hide();
      }
    );
  }

}
