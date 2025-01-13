import { Component, inject, OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent implements OnInit {
  private usersService = inject(UsersService);
  private authService = inject(AuthService);

  user: User | null = null;

  dataSource = new DataSourceUser<User>();
  columns: string[] = ['id', 'avatar', 'name', 'email'];

  constructor() {}

  ngOnInit() {
    this.usersService.getUsers().subscribe((users) => {
      this.dataSource.init(users);
    });

    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
