import { Component, OnInit } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HeaderService } from '../services/header.service';
import { ListService } from '../services/list.service';
import { List } from '../shared/list';
import { Product } from '../shared/product';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  list: List = new List;
  products: Product[]; //пока undefined или нул сделать спинер?
  show: boolean[] = [];

  constructor(private router: Router,
    private listService: ListService,
    private route: ActivatedRoute,
    private header: HeaderService) { }

  ngOnInit(): void {
    console.log("Come to products list")
    this.header.setMenu(["Добавить пункт"]);
    this.header.item$.subscribe(item => {
      if (item === "Добавить пункт") {
        console.log("перед переходом в добавление продукта")
        this.router.navigate(['/addProduct', this.list.id]);
      }
    })
    this.route.params
      .pipe(switchMap((params: Params) => {
        return this.listService.getList(params['id'])
      }))
      .pipe(switchMap((list: List) => {
        this.list = list;
        this.header.setTitle(this.list.title);
        return this.listService.getListItems(this.list.id)
      }))
      .subscribe(itemsArray => {
            this.products = itemsArray
            console.log(itemsArray);
      })
  }

  change(id: number) {
    this.show = [];
    console.log(id);
    this.show[id] = true;
  }

  delProduct(product: Product) {
    this.listService.delProduct(product)
    .subscribe(() => this.ngOnInit() // после удаления перечитываем с базы. Как по правильному пока не знаю
    );
  }

  setProduct(product: Product) {
    product.checked = !product.checked;
    this.listService.updateProduct(product)
    .subscribe();
  }

}
