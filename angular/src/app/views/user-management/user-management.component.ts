import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User } from '@models';
import { UserService } from '@services';

import { content } from '@app/app.content';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  pageContent = content.views.userManagement;
  updateForm: FormGroup;
  loading = false;
  submitted = false;
  newPasswordChecked = false;
  private user: User;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    
    this.updateForm = this.formBuilder.group({
      email: [this.user.email, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get form() { return this.updateForm.controls; }

  onSubmit() {
    console.log('Usermanagement submitting!!!');
    this.submitted = true;

    // stop here if form is invalid
    if (this.updateForm.invalid) {
        return;
    }

    this.loading = true;

    this.userService.update2({
      email: <string> this.form.email.value,
      password: this.form.password.value,
      newPasswordChecked: this.newPasswordChecked
    }, this.user.id).subscribe(
      res => {
        this.snackBar.open(this.pageContent.submitSuccess, 'Dismiss', { duration: 3000 });
        this.user.email = this.form.email.value;
        localStorage.setItem('currentUser', JSON.stringify(this.user));
        this.router.navigate(['/dashboard']);
      }, 
      error => {
        this.snackBar.open(error, 'Dismiss', { duration: 3000 });
        this.loading = false;
    });
  }
}
