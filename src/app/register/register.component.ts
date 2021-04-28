import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../shared/user';
import { Router } from '@angular/router';
import { HeaderService } from '../services/header.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  users: User[];

  constructor(
    private authService: AuthService,
    private router: Router,
    private header: HeaderService) { }

  ngOnInit(): void {
    this.header.setTitle("Регистрация");
    this.header.setMenu([]);
  }

  onSubmit(){
    this.authService.register(this.user)
      .subscribe(result => {
        console.log(result);
        this.router.navigate(['/']);
      },
      e => alert (e.error.message))
  }
}
