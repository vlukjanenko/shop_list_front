import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';
import { ListService } from '../services/list.service';
import { List } from '../shared/list';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.scss']
})
export class AddListComponent implements OnInit {

  list: List = new List;

  constructor(private listService: ListService,
    private router: Router,
    private header: HeaderService) {
  }
  abortAdd() {
    this.router.navigate(['purchases']);
  }
  ngOnInit(): void {
    this.header.setTitle("Создание нового списка покупок");
    this.header.setMenu([]);
    this.list.color="white";
  }
  onSubmit() {
    this.list.dat = new Date().toString();
    this.listService.addList(this.list)
    .subscribe(list => this.router.navigate(['/products',  list.id, list.title, list.color, list.dat]),
    error => this.router.navigate['purchases']);
  }
}
