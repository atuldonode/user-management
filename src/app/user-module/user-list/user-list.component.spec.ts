import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserListComponent } from './user-list.component';
import { UserService } from 'src/app/user-module/user_service/user.service';
import { of } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let router: Router;

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers', 'deleteUser']);
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
        MatTableModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useValue: userServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers on init and populate dataSource', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'User' }
    ];
    userService.getUsers.and.returnValue(users);
    fixture.detectChanges();
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.dataSource.data).toEqual(users);
  });

  it('should call deleteUser method and update dataSource', () => {
    const users: User[] = [
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', role: 'User' }
    ];
    userService.getUsers.and.returnValue(users);
    fixture.detectChanges();
  });

  it('should navigate to edit-user with query parameters', () => {
    const routerSpy = spyOn(router, 'navigate').and.stub();
    component.editUser(1);
    expect(routerSpy).toHaveBeenCalledWith(['users/add-user'], { state: { data: { id: 1 } } });
  });
});
