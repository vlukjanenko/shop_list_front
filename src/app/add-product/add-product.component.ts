import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { ListService } from '../services/list.service';
import { Product } from '../shared/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  product: Product = new Product;

  constructor(private listService: ListService,
    private router: Router,
    private header: HeaderService) {
  }

  abortAdd() {
    this.router.navigate(['products']);
  }
  ngOnInit(): void {
    console.log("Пришли в добавление продукта")
    this.header.setTitle("Создание нового продукта");
    this.header.setMenu([]);
    this.listService.currentList$.subscribe(list => this.product.id_list = list.id);
    this.product.checked = false;
  }
  onSubmit() {
    //this.product.dat = new Date().toString();
    console.log(this.product)
    this.listService.addProduct(this.product)
    .subscribe(product => this.router.navigate(['products']),
    error => this.router.navigate['products']);
  }
}
