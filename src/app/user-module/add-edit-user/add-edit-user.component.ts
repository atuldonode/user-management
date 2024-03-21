import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user_service/user.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.scss']
})
export class AddEditUserComponent {
  userForm: any;
  user: User = { id: 0, name: '', email: '', role: 'User' };
  state: any = this.location.getState();
  userId: any;
  selected = 'Choose user type'
  userType = [
    { userType: 'Choose Schemes type', isNotSelect: false },
    { userType: 'Admin', isNotSelect: true },
    { userType: 'User', isNotSelect: true }
  ]
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private location: Location,

  ) { }
  ngOnInit() {
    this.initForm();
    let queryParams = this.state?.data;
    this.userId = queryParams?.id;
    if (this.userId) {
      const user:any = this.userService.getUserById(this.userId);
      if (user) {
        this.userForm.patchValue(user);
        this.selected = user.role;
      }
    }
  }

  initForm(): void {
    this.userForm = this.fb.group({
      id: [this.generateDynamicId()], // Assuming you want to handle ID as well
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required]
    })
  }

  generateDynamicId(): string {
    return this.generateRandomId(100000, 999999).toString(); // Generate 6-digit random ID
  }

  generateRandomId(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  selectUserType(userType: any) {
    this.userForm.controls['role'].setValue(userType);
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return
    }
    if (this.userId) {
      // Update user
      this.userService.updateUser(this.userForm.value);
      alert("User Data Update successfully");
    } else {
      // Add user
      this.userService.addUser(this.userForm.value);
      alert("Data insert successfully");
    }
    this.router.navigate(['/user-list']);
  }
}
