import { Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { PurchasesComponent } from '../purchases/purchases.component';
import { AuthGuard } from './auth.guard';
import { AddListComponent } from '../add-list/add-list.component';
import { ProductsListComponent } from '../products-list/products-list.component';
import { AddProductComponent } from '../add-product/add-product.component';
export const routes: Routes = [

  { path: '', component: PurchasesComponent, canActivate: [AuthGuard]},
  { path: 'addlist', component: AddListComponent, canActivate: [AuthGuard]},
  { path: 'addProduct/:id', component: AddProductComponent, canActivate: [AuthGuard]},
  // в апи нет функции для получения списка по ид. В сервисе будем получать
  { path: 'products/:id', component: ProductsListComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
