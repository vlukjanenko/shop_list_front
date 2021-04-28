import { Component, OnInit } from '@angular/core';
import { User } from '../shared/user';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => this.user = user);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
