import { Injectable } from '@angular/core';
import { User } from '../shared/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, switchMap, map, mapTo } from 'rxjs/operators';
import { baseURL } from '../shared/baseurl';
import { BehaviorSubject } from 'rxjs'; // хранит и отдаёт последнее значение новым подписчикам

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //работа с токеном.
  private token: string;
  private tokenSubject = new BehaviorSubject<string>(null); //можно считываеть из локал стореджа
  public  token$ = this.tokenSubject.asObservable();
  private subscription = this.token$.subscribe(newtoken => {
    this.token = newtoken;
  });

  //работа с текущим юзером.
  private userSubject = new BehaviorSubject<User>(null); //можно считываеть из локал стореджа
  public currentUser = this.userSubject.asObservable();

  //при регистрации или логине обновляем токен и юзера
  private updateCurrentUser(newUser: User, newToken: string) {
   console.log('come to update')
    this.userSubject.next(newUser);
    this.tokenSubject.next(newToken);
  }

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    return this.http.post(baseURL + 'auth/login', user).pipe(map(res => {
      let user: User = <User>res['user'];
      let token: string = <string>res['token'];
      if (user && token) {
        /* localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token)); */
        this.updateCurrentUser(user, token);
        console.log(this.token);
        return user;
      }
    }));
  }

  check() {
    console.log(this.token);
  }

  register(user: User): Observable<User> {
    return this.http.post(baseURL + 'auth/register', user).pipe(map(res => {
      let user: User = <User>res['user'];
      let token: string = <string>res['token'];
      if (user && token) {
        /* localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', JSON.stringify(token)); */
        this.updateCurrentUser(user, token);

        return user;
      }
    }));
  }

  logout() {
    if (localStorage.getItem('token')) {
      this.http.post(baseURL + 'auth/logout', null, {
        headers: {
          'Token': localStorage.getItem('token')
        }
      }).subscribe();
    }
    this.updateCurrentUser(null, null);
   /*  localStorage.removeItem('currentUser');
    localStorage.removeItem('token'); */
  }

  getCurrentUser(): Observable<number> {
    return new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });
  }
}
