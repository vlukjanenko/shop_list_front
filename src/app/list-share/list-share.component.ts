import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { FriendsService } from '../services/friends.service';
import { HeaderService } from '../services/header.service';
import { ListService } from '../services/list.service';
import { List } from '../shared/list';
import { User } from '../shared/user';

@Component({
  selector: 'app-list-share',
  templateUrl: './list-share.component.html',
  styleUrls: ['./list-share.component.scss']
})
export class ListShareComponent implements OnInit {

 list: List;
 friends: User[];
 owners: User[];
 currentUser: User;


  constructor(private head: HeaderService,
    private friendService: FriendsService,
    private listService: ListService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) { }

  shareList(id_list: number, user: User) {
    this.listService.shareList(id_list, user.id)
    .subscribe(() => {
      this.friends = this.friends.filter(friend => friend.id !== user.id);
      this.owners.push(user);
    });
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => this.currentUser = user);
    this.route.params
    .pipe(switchMap((params) => this.listService.getList(params['id']))) //поиск списка
    .pipe(switchMap(list => {
      this.list = list;
      this.head.setMenu(["Отобрать"]);
      this.head.setTitle("Доступ к списку: " + this.list.title);
      return this.listService.getOwners(this.list.id) // поиск владельцев списка
    }))
    .pipe(switchMap((owners) => {
      this.owners = owners.filter(user => user.id !== this.currentUser.id); // исключаем себя из списка
      return this.friendService.getFriends(); // ищем друзей
    }))
    .subscribe((friends) => this.friends = friends.filter(friend =>
      !this.owners.find(element => element.id === friend.id) //фильтруем тех с кем еще не поделились
      ));
      this.head.item$.subscribe(item => {
        if (item === "Отобрать") {
          this.listService.unshare(this.list.id)
          .subscribe(() => this.ngOnInit())
        }
      })
}
}
