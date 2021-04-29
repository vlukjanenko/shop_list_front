import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { List } from '../shared/list';
import { baseURL } from '../shared/baseurl';
import { Product } from '../shared/product';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ListService {

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




  getLists(): Observable<List[]> {
    return this.http.get<List[]>(baseURL + 'lists', {
      headers: {
        'Token': this.token
      }
    })
  }

  getList(id: number): Observable<List>{
    return this.getLists()
    .pipe(map((res: List[]) => {
      console.log("Пришли в гет лист по ид")
      console.log(res);
      let list = res.find(list => list.id == id)
      console.log(list);
      return list;
    }))
  }


  getListItems(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(baseURL + 'lists/' + id, {
      headers: {
        'Token': this.token
      }
    })
  }

  addList(list: List): Observable<List> {
    return this.http.post<List>(baseURL + 'lists', list, {
      headers: {
        'Token': this.token
      }
    })
  }

  delList(id: number) {
    return this.http.delete<List>(baseURL + 'lists/' + id, {
      headers: {
        'Token': this.token
      }
    })
  }

  updateList(list: List): Observable<List>  {
    return this.http.put<List>(baseURL + 'lists/' + list.id, list, {
      headers: {
        'Token': this.token
      }
    })
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(baseURL + 'lists/' + product.id_list + '/' + product.id, product, {
      headers: {
        'Token': this.token
      }
    })
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(baseURL + 'lists/' + product.id_list, product, {
      headers: {
        'Token': this.token
      }
    })
  }

  delProduct(product: Product) {
    return this.http.delete<List>(baseURL + 'lists/' + product.id_list + '/' + product.id, {
      headers: {
        'Token': this.token
      }
    })
  }


}
