import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { AddEditUserComponent } from './add-edit-user.component';
import { UserService } from '../user_service/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('AddEditUserComponent', () => {
  let component: AddEditUserComponent;
  let fixture: ComponentFixture<AddEditUserComponent>;
  let userService: UserService;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    const userServiceSpy:any = jasmine.createSpyObj('UserService',  ['getUserById', 'addUser', 'updateUser']);
    await TestBed.configureTestingModule({
      declarations: [AddEditUserComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [{ provide: UserService, useValue: userServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEditUserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load user data for editing if userId is provided', () => {
    const user:any = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' };
    const state:any = { data: { id: 1 } };
    spyOn(location, 'getState').and.returnValue(state);
    // userService.getUserById.and.returnValue(user);
    
    fixture.detectChanges();

    expect(component.userId).toEqual(1);
    expect(component.selected).toEqual(user.role);
    expect(component.userForm.value).toEqual(user);
  });

  it('should initialize form with default values if userId is not provided', () => {
    const state = { data: null };
    spyOn(location, 'getState').and.returnValue(state);
    
    fixture.detectChanges();

    expect(component.userId).toBeUndefined();
    expect(component.selected).toEqual('Choose user type');
    expect(component.userForm.value).toEqual({ id: jasmine.any(String), name: '', email: '', role: '' });
  });

  it('should set user role when selectUserType is called', () => {
    component.selectUserType('Admin');
    expect(component.userForm.controls['role'].value).toEqual('Admin');
  });

  it('should call updateUser method when form is submitted with userId', () => {
    const user:any = { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' };
    spyOn(location, 'getState').and.returnValue({ data: { id: 1 } });
    component.userForm.patchValue(user);
    // userService.updateUser.and.returnValue(of(user));
    const navigateSpy = spyOn(router, 'navigate');
    
    component.onSubmit();

    expect(userService.updateUser).toHaveBeenCalledWith(user);
    expect(navigateSpy).toHaveBeenCalledWith(['/user-list']);
  });

  it('should call addUser method when form is submitted without userId', () => {
    const user:any = { id: '123456', name: 'John Doe', email: 'john@example.com', role: 'Admin' };
    spyOn(location, 'getState').and.returnValue({ data: null });
    component.userForm.patchValue(user);
    // userService.addUser.and.returnValue(of(null));
    const navigateSpy = spyOn(router, 'navigate');
    
    component.onSubmit();

    expect(userService.addUser).toHaveBeenCalledWith(user);
    expect(navigateSpy).toHaveBeenCalledWith(['/user-list']);
  });

  it('should not submit form if form is invalid', () => {
    spyOn(location, 'getState').and.returnValue({ data: null });
    // const addUserSpy = userService.addUser.and.returnValue(of(null));
    const navigateSpy = spyOn(router, 'navigate');
    component.userForm.controls['name'].setValue('');
    
    component.onSubmit();

    // expect(addUserSpy).not.toHaveBeenCalled();
    expect(navigateSpy).not.toHaveBeenCalled();
  });
});
