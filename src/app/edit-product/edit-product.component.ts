import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';
import { List } from '../shared/list';
import { Product } from '../shared/product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @Input() product: Product;
  @Output() cancel = new EventEmitter<boolean[]>();

  newProduct: Product;

  constructor(private listService: ListService,
    private router: Router) { }

  cancelEdit() {
    this.cancel.emit([]);
  }

  confirmEdit() {
    //this.newProduct.dat = new Date().toString(); // нужно обновлять дату диста
    this.listService.updateProduct(this.newProduct).subscribe(p => {
      console.log(p);
      this.product.title = p.title;
      this.product.amount = p.amount;
      this.product.checked = p.checked;
      this.cancelEdit();
    })
  }

  ngOnInit(): void {
    this.newProduct = new Product;
    this.newProduct.id = this.product.id;
    this.newProduct.id_list = this.product.id_list;
    this.newProduct.title = this.product.title;
    this.newProduct.amount = this.product.amount;
    this.newProduct.checked = this.product.checked;
  }

}
