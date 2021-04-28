import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  constructor(
    private authService: AuthService,
    private router: Router,
    private header: HeaderService) { }

  ngOnInit(): void {
    this.header.setTitle("Логин");
    this.header.setMenu([]);
  }
  onSubmit() {
    this.authService.login(this.user)
    .subscribe(res => {
      console.log(res);
      this.router.navigate(['/']);
    },
    err => alert(err.error.message),
    )}

   reset() {
     this.user = new User();
   }
}
