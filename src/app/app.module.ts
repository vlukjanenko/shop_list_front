import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from './shared/baseurl';
import { UserInfoComponent } from './user-info/user-info.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { PurchasesComponent } from './purchases/purchases.component';
import { AuthGuard } from './app-routing/auth.guard';
import { AddListComponent } from './add-list/add-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { EditListComponent } from './edit-list/edit-list.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { FriendsComponent } from './friends/friends.component';
import { ListShareComponent } from './list-share/list-share.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    MenuComponent,
    LoginComponent,
    RegisterComponent,
    UserInfoComponent,
    PurchasesComponent,
    AddListComponent,
    ProductsListComponent,
    EditListComponent,
    EditProductComponent,
    AddProductComponent,
    FriendsComponent,
    ListShareComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatSelectModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
