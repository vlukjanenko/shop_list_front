import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HeaderService } from '../services/header.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  user: User;
  newPassword: string;

  constructor(private authService: AuthService,
    private header: HeaderService) { }

  onSubmit() {

  }

  ngOnInit(): void {
    this.header.setTitle("Профиль пользователя (в разработке)");
    this.header.setMenu([]);
    this.authService.currentUser
      .subscribe(user => this.user = user);
  }
}
