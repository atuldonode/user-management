import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../user_service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>();
  displayedColumns = ['id', 'name', 'email', 'role', 'acton'];

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    const getUserData = this.userService.getUsers()
    this.dataSource.data = [...this.dataSource.data, ...getUserData];
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id);
    this.dataSource.data = this.userService.getUsers();
  }

  editUser(id: number): void {
    let queryParams = {
      id,
    };
    this.router.navigate(['users/add-user'], {
      state: { data: queryParams }
    });
  }
}
