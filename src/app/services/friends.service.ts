import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseURL } from '../shared/baseurl';
import { User } from '../shared/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  private token: string;


/*


  //  В апи нет доступа к листу по ид. Будем его тут хранить
  //  и раздавать
  private listSubject = new BehaviorSubject<List>(null);
  public  currentList$ = this.listSubject.asObservable();
  setCurrentList(list: List) {
    this.listSubject.next(list);

  // Оказалось ущербно. При обновлении странички ломается
  // нужна функция получения листа по id
  } */

  constructor(private authService: AuthService,
    private http: HttpClient) {
    this.authService.token$.subscribe(token => {
      this.token = token;

    });
  }

  findUsers(search: string): Observable<User[]> {
    console.log("поиск новых друзе");
    return this.http.get<User[]>(baseURL + 'users' + '?' + 'search=' + search, {
      headers: {
        'Token': this.token
      }
    })
  }

  getFriends() : Observable<User[]> {
    console.log("поиск существующих друзей");
    return this.http.get<User[]>(baseURL + 'friends', {
      headers: {
        'Token': this.token
      }
    })
  }

  addFriend(id: number): Observable<User> {
    console.log("Добавление друга", id);
    return this.http.post<User>(baseURL + 'friends', {id_friend: id}, {
      headers: {
        'Token': this.token
      }
    })
  }

  delFriend(id: number) {
    return this.http.delete(baseURL + 'friends/' + id, {
      headers: {
        'Token': this.token
      }
    })
  }
}
