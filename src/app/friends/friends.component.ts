import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { FriendsService } from '../services/friends.service';
import { HeaderService } from '../services/header.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent implements OnInit {

  panelOpenState: boolean = false;
  search: string;
  searchResult: User[];
  myFriends: User[];

  constructor(private friendService: FriendsService,
    private head: HeaderService) {

  }

  ngOnInit(): void {
    this.head.setTitle("Друзья");
    this.head.setMenu([]);
      this.friendService.getFriends()
      .subscribe(result => this.myFriends = result);
  }

  onSubmit() {
    this.friendService.findUsers(this.search)
      .subscribe(result => {
        this.searchResult = result.filter(x => {
          return !this.myFriends.find((element) => element.id === x.id)
        });
      })
  }

  addF(id: number) {
    this.friendService.addFriend(id)
    .subscribe(friend=> {
        this.myFriends.push(friend)
        this.searchResult = this.searchResult.filter(element => element.id !== friend.id)
        });
    }

  delF(id: number) {
    // логично было бы отбирать все мои листы у него
    // но как это сделать?
    this.friendService.delFriend(id)
    .subscribe(() => this.myFriends = this.myFriends.filter(friend => friend.id !=  id));
      /* .pipe(switchMap(() => this.friendService.getFriends())).subscribe(result => this.myFriends = result); */
    }
}
