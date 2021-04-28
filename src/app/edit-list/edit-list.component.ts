
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ListService } from '../services/list.service';
import { List } from '../shared/list';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss']
})
export class EditListComponent implements OnInit {

  @Input() list: List;
  @Output() cancel = new EventEmitter<boolean[]>();

  newList: List;

  constructor(private listService: ListService,
    private router: Router) { }

  cancelEdit() {
    this.cancel.emit([]);
  }

  confirmEdit() {
    this.newList.dat = new Date().toString();
    this.listService.updateList(this.newList).subscribe(l => {
      console.log(l);
      this.list.title = l.title;
      this.list.color = l.color;
      this.list.dat = l.dat;
      this.cancelEdit();
    })
  }

  ngOnInit(): void {
    this.newList = new List;
    this.newList.id = this.list.id;
    this.newList.title = this.list.title;
    this.newList.color = this.list.color;
    this.newList.dat = this.list.dat;
  }

}
