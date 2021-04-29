import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
//import { AuthService } from '../services/auth.service';
import { ListService } from '../services/list.service';
import { List } from '../shared/list';
import { User } from '../shared/user';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit { //отображать меню через сервисы то есть сделать типа массива функций как пункты меню при клилу

  show: boolean[] = [];
  user: User;
  lists: List[];

  constructor(
   // private authService: AuthService,
    private listService: ListService,
    private header: HeaderService,
    private router: Router

    ) { }

  ngOnInit(): void {
    //обработка шапки
    this.header.setTitle("Доступные списки покупок");
    this.header.setMenu(["Добавить"]);
    this.header.item$.subscribe(item => {
      if (item === "Добавить") {
        this.router.navigate(['/addlist']);
      }
    })
    //получение списков
    this.listService.getLists().subscribe(result => {
      this.lists = result;
      console.log(this.lists);
    });
    /* this.authService.currentUser.subscribe(user => {
      this.user = user;
      console.log(this.user);
    }); */
  }

  change(id: number) {
    this.show = [];
    console.log(id);
    this.show[id] = true;
  }

  delList(id: number) {
    this.listService.delList(id)
    .subscribe(() => this.ngOnInit() // после удаления перечитываем с базы
    );
  }

 /*  goToProducts(list: List) {
    this.listService.setCurrentList(list);
    this.router.navigate(['products',]);
  } */
}
