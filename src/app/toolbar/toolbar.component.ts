import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  title: string;
  contextMenuItems: string[];

  onClick(item: string){
    console.log(item);
    this.headerService.selectItem(item);
  }

  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
    this.headerService.menu$.subscribe(menu => this.contextMenuItems = menu);
    this.headerService.title$.subscribe(title => this.title = title);
  }
}
