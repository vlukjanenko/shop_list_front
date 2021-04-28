/*
**  Для взаимодействия заголовка и других компонетов
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  private titleSubject = new Subject<string>();
  public  title$ = this.titleSubject.asObservable();

  private menuSubject = new Subject<string[]>();
  public  menu$ = this.menuSubject.asObservable();

  private selectedItemSubject = new Subject<string>();
  public item$ = this.selectedItemSubject.asObservable();

  public setTitle(newTitle: string) {
    this.titleSubject.next(newTitle);
  }

  public setMenu(newMenu: string[]) {
    this.menuSubject.next(newMenu);
  }

  public selectItem(newItem: string) {
    this.selectedItemSubject.next(newItem);
  }

  constructor() { }
}
